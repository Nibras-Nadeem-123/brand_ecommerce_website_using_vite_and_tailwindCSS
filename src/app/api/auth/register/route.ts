import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret';
const DEMO_MODE = process.env.DEMO_MODE === 'true';

const demoUser = {
  id: 'demo-user',
  name: 'Demo User',
  email: 'user@brand.com',
  role: 'user' as const,
};

// POST /api/auth/register - Register a new user
export async function POST(request: NextRequest) {
  // Demo mode - accept any registration
  if (DEMO_MODE) {
    const body = await request.json();
    const { name, email } = body;
    
    const token = jwt.sign({ userId: demoUser.id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    const response = NextResponse.json(
      {
        success: true,
        data: {
          user: { ...demoUser, name: name || demoUser.name, email: email || demoUser.email },
          token,
        },
      },
      { status: 201 }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  }

  // Production mode - use database
  try {
    await dbConnect();
    const body = await request.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User already exists with this email' },
        { status: 400 }
      );
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    const response = NextResponse.json(
      {
        success: true,
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        },
      },
      { status: 201 }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to register user' },
      { status: 500 }
    );
  }
}
