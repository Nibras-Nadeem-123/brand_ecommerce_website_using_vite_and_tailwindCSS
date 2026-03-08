import { NextRequest, NextResponse } from 'next/server';

// Demo mode - works without MongoDB
const DEMO_MODE = process.env.DEMO_MODE === 'true';

const demoUser = {
  id: 'demo-admin',
  name: 'Demo Admin',
  email: 'admin@brand.com',
  role: 'admin' as const,
  avatar: '',
};

const demoProducts = [
  {
    _id: 'demo-1',
    name: 'Canon Camera EOS 2000',
    description: 'Professional DSLR camera',
    price: 1128.00,
    discountPrice: 998.00,
    images: ['/home/canon_camreras.png'],
    category: 'Electronics',
    brand: 'Canon',
    stock: 50,
    rating: 4.5,
    numReviews: 124,
    isPublished: true,
  },
  {
    _id: 'demo-2',
    name: 'Wireless Headphones',
    description: 'Premium sound quality',
    price: 199.00,
    discountPrice: 149.00,
    images: ['/home/headphone2.png'],
    category: 'Electronics',
    brand: 'Sony',
    stock: 100,
    rating: 4.3,
    numReviews: 256,
    isPublished: true,
  },
];

// GET /api/auth/me - Get current user
export async function GET(request: NextRequest) {
  if (DEMO_MODE) {
    return NextResponse.json({
      success: true,
      data: { user: demoUser },
    });
  }

  try {
    const token = request.cookies.get('token')?.value ||
      request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // In production, verify token and fetch user from DB
    return NextResponse.json({
      success: true,
      data: { user: demoUser },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Authentication failed' },
      { status: 401 }
    );
  }
}
