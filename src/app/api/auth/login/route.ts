import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret';
const DEMO_MODE = process.env.DEMO_MODE === 'true';

const demoUser = {
  id: 'demo-admin',
  name: 'Admin User',
  email: 'admin@brand.com',
  role: 'admin' as const,
};

// POST /api/auth/login - Login user
export async function POST(request: NextRequest) {
  // Demo mode - accept any login
  if (DEMO_MODE) {
    const body = await request.json();
    const { email } = body;
    
    const token = jwt.sign({ userId: demoUser.id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    const response = NextResponse.json(
      {
        success: true,
        data: {
          user: demoUser,
          token,
        },
      },
      { status: 200 }
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

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide email and password' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

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
      { status: 200 }
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
    console.error('Error logging in user:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to login' },
      { status: 500 }
    );
  }
}
