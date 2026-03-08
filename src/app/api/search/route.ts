import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Product from '@/models/Product';

// GET /api/search - Search products
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!query && !category) {
      return NextResponse.json({
        success: true,
        data: [],
        message: 'Please provide a search query or category',
      });
    }

    const searchQuery: Record<string, unknown> = { isPublished: true };

    if (query) {
      searchQuery.$text = { $search: query };
    }

    if (category) {
      searchQuery.category = new RegExp(category, 'i');
    }

    const products = await Product.find(searchQuery)
      .limit(limit)
      .sort({ score: { $meta: 'textScore' } });

    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to search products' },
      { status: 500 }
    );
  }
}
