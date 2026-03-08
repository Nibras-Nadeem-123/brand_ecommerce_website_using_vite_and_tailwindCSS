import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import User, { IUser } from '@/models/User';
import { dbConnect } from '@/lib/mongodb';

export interface AuthRequest extends NextRequest {
  user?: IUser;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret';

export async function authMiddleware(
  request: NextRequest,
  handler: (req: AuthRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    const token = request.cookies.get('token')?.value ||
      request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    await dbConnect();
    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 401 }
      );
    }

    const authRequest = request as AuthRequest;
    authRequest.user = user;

    return handler(authRequest);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Authentication failed' },
      { status: 401 }
    );
  }
}

export async function adminMiddleware(
  request: NextRequest,
  handler: (req: AuthRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  return authMiddleware(request, async (req: AuthRequest) => {
    if (req.user?.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }
    return handler(req);
  });
}
