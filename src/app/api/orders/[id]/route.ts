import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Order from '@/models/Order';
import { authMiddleware, adminMiddleware } from '@/middleware/auth';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/orders/[id] - Get a single order by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  return authMiddleware(request, async () => {
    try {
      await dbConnect();
      const { id } = await params;

      const order = await Order.findById(id)
        .populate('user', 'name email')
        .populate('orderItems.product');

      if (!order) {
        return NextResponse.json(
          { success: false, message: 'Order not found' },
          { status: 404 }
        );
      }

      // Check if user owns the order or is admin
      if (
        request.user?.role !== 'admin' &&
        order.user._id.toString() !== request.user?._id.toString()
      ) {
        return NextResponse.json(
          { success: false, message: 'Not authorized' },
          { status: 403 }
        );
      }

      return NextResponse.json({ success: true, data: order });
    } catch (error) {
      console.error('Error fetching order:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to fetch order' },
        { status: 500 }
      );
    }
  });
}

// PUT /api/orders/[id] - Update order (Admin only for status, user for payment)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  return authMiddleware(request, async () => {
    try {
      await dbConnect();
      const { id } = await params;
      const body = await request.json();

      const order = await Order.findById(id);

      if (!order) {
        return NextResponse.json(
          { success: false, message: 'Order not found' },
          { status: 404 }
        );
      }

      // Admin can update status
      if (request.user?.role === 'admin') {
        if (body.status) order.status = body.status;
        if (body.isDelivered !== undefined) {
          order.isDelivered = body.isDelivered;
          if (body.isDelivered) {
            order.deliveredAt = new Date();
          }
        }
      }

      // User can update payment info
      if (body.isPaid !== undefined) {
        order.isPaid = body.isPaid;
        if (body.isPaid) {
          order.paidAt = new Date();
        }
      }

      if (body.paymentResult) {
        order.paymentResult = body.paymentResult;
      }

      await order.save();

      return NextResponse.json({ success: true, data: order });
    } catch (error) {
      console.error('Error updating order:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to update order' },
        { status: 500 }
      );
    }
  });
}

// DELETE /api/orders/[id] - Cancel order (Admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  return adminMiddleware(request, async (req) => {
    try {
      await dbConnect();
      const { id } = await params;

      const order = await Order.findByIdAndDelete(id);

      if (!order) {
        return NextResponse.json(
          { success: false, message: 'Order not found' },
          { status: 404 }
        );
      }

      // Restore product stock
      for (const item of order.orderItems) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity },
        });
      }

      return NextResponse.json({
        success: true,
        message: 'Order cancelled successfully',
      });
    } catch (error) {
      console.error('Error cancelling order:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to cancel order' },
        { status: 500 }
      );
    }
  });
}
