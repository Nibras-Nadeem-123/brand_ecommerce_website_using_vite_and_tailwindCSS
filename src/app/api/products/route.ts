import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Product from '@/models/Product';
import { authMiddleware, adminMiddleware } from '@/middleware/auth';

// Demo mode flag
const DEMO_MODE = process.env.DEMO_MODE === 'true';

const demoProducts = [
  {
    _id: 'demo-1',
    name: 'Canon Camera EOS 2000, Black 10x zoom',
    description: 'Professional DSLR camera with 10x optical zoom. Perfect for photography enthusiasts and professionals.',
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
    name: 'GoPro HERO6 4K Action Camera - Black',
    description: 'Ultra HD action camera with waterproof design. Capture your adventures in stunning 4K resolution.',
    price: 499.00,
    discountPrice: 399.00,
    images: ['/home/smart_watches.png'],
    category: 'Electronics',
    brand: 'GoPro',
    stock: 75,
    rating: 4.7,
    numReviews: 89,
    isPublished: true,
  },
  {
    _id: 'demo-3',
    name: 'Wireless Bluetooth Headphones - Premium Sound',
    description: 'High-quality wireless headphones with noise cancellation. Enjoy up to 30 hours of battery life.',
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
  {
    _id: 'demo-4',
    name: 'Smart Watch Pro - Fitness Tracker',
    description: 'Advanced smartwatch with health monitoring features. Track your fitness goals.',
    price: 299.00,
    discountPrice: 249.00,
    images: ['/home/smart_watches.png'],
    category: 'Electronics',
    brand: 'Apple',
    stock: 60,
    rating: 4.6,
    numReviews: 178,
    isPublished: true,
  },
  {
    _id: 'demo-5',
    name: 'Gaming Laptop - High Performance',
    description: 'Powerful gaming laptop with latest GPU and processor.',
    price: 1599.00,
    discountPrice: 1399.00,
    images: ['/home/laptops.png'],
    category: 'Electronics',
    brand: 'ASUS',
    stock: 25,
    rating: 4.8,
    numReviews: 67,
    isPublished: true,
  },
];

// GET /api/products - Get all products
export async function GET(request: NextRequest) {
  // Demo mode - return demo products
  if (DEMO_MODE) {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');
    
    return NextResponse.json({
      success: true,
      data: demoProducts.slice(0, limit),
      pagination: {
        page: 1,
        limit,
        total: demoProducts.length,
        pages: 1,
      },
    });
  }

  // Production mode - use database
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');

    const query: Record<string, unknown> = { isPublished: true };

    if (category) {
      query.category = new RegExp(category, 'i');
    }

    if (brand) {
      query.brand = new RegExp(brand, 'i');
    }

    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ];
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    // Fallback to demo products on error
    return NextResponse.json({
      success: true,
      data: demoProducts,
      pagination: {
        page: 1,
        limit: 10,
        total: demoProducts.length,
        pages: 1,
      },
    });
  }
}

// POST /api/products - Create a new product (Admin only)
export async function POST(request: NextRequest) {
  if (DEMO_MODE) {
    return NextResponse.json({
      success: false,
      message: 'Demo mode: Cannot create products',
    });
  }

  return adminMiddleware(request, async (req) => {
    try {
      await dbConnect();
      const body = await req.json();

      const product = await Product.create(body);

      return NextResponse.json(
        { success: true, data: product },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error creating product:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to create product' },
        { status: 500 }
      );
    }
  });
}
