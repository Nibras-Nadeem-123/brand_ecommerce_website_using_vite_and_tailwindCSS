import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Order from '@/models/Order';
import Cart from '@/models/Cart';
import Product from '@/models/Product';
import { authMiddleware, adminMiddleware } from '@/middleware/auth';

// GET /api/orders - Get user's orders (or all orders for admin)
export async function GET(request: NextRequest) {
  return authMiddleware(request, async () => {
    try {
      await dbConnect();

      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '10');

      let query: Record<string, unknown> = {};

      // Admin can see all orders, regular users only their own
      if (request.user?.role !== 'admin') {
        query.user = request.user?._id;
      }

      const skip = (page - 1) * limit;

      const orders = await Order.find(query)
        .populate('user', 'name email')
        .populate('orderItems.product')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Order.countDocuments(query);

      return NextResponse.json({
        success: true,
        data: orders,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to fetch orders' },
        { status: 500 }
      );
    }
  });
}

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
  return authMiddleware(request, async () => {
    try {
      await dbConnect();
      const body = await request.json();

      const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = body;

      if (!orderItems || orderItems.length === 0) {
        return NextResponse.json(
          { success: false, message: 'No order items' },
          { status: 400 }
        );
      }

      // Create order
      const order = await Order.create({
        user: request.user?._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid: false,
        isDelivered: false,
        status: 'pending',
      });

      // Clear user's cart after order
      await Cart.findOneAndUpdate(
        { user: request.user?._id },
        { items: [], totalPrice: 0 }
      );

      // Update product stock
      for (const item of orderItems) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity },
        });
      }

      await order.populate('orderItems.product');

      return NextResponse.json(
        { success: true, data: order },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error creating order:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to create order' },
        { status: 500 }
      );
    }
  });
}
