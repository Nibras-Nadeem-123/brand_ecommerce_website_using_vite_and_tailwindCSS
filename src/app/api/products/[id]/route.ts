import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Product from '@/models/Product';
import { adminMiddleware } from '@/middleware/auth';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/products/[id] - Get a single product by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();
    const { id } = await params;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - Update a product (Admin only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  return adminMiddleware(request, async (req) => {
    try {
      await dbConnect();
      const { id } = await params;
      const body = await req.json();

      const product = await Product.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });

      if (!product) {
        return NextResponse.json(
          { success: false, message: 'Product not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, data: product });
    } catch (error) {
      console.error('Error updating product:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to update product' },
        { status: 500 }
      );
    }
  });
}

// DELETE /api/products/[id] - Delete a product (Admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  return adminMiddleware(request, async (req) => {
    try {
      await dbConnect();
      const { id } = await params;

      const product = await Product.findByIdAndDelete(id);

      if (!product) {
        return NextResponse.json(
          { success: false, message: 'Product not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, message: 'Product deleted' });
    } catch (error) {
      console.error('Error deleting product:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to delete product' },
        { status: 500 }
      );
    }
  });
}
