import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Cart from '@/models/Cart';
import Product from '@/models/Product';
import { authMiddleware } from '@/middleware/auth';

// GET /api/cart - Get user's cart
export async function GET(request: NextRequest) {
  return authMiddleware(request, async () => {
    try {
      await dbConnect();

      let cart = await Cart.findOne({ user: request.user?._id }).populate(
        'items.product'
      );

      if (!cart) {
        cart = await Cart.create({
          user: request.user?._id,
          items: [],
          totalPrice: 0,
        });
      }

      return NextResponse.json({
        success: true,
        data: cart,
      });
    } catch (error) {
      console.error('Error fetching cart:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to fetch cart' },
        { status: 500 }
      );
    }
  });
}

// POST /api/cart - Add item to cart
export async function POST(request: NextRequest) {
  return authMiddleware(request, async () => {
    try {
      await dbConnect();
      const body = await request.json();
      const { productId, quantity = 1 } = body;

      if (!productId) {
        return NextResponse.json(
          { success: false, message: 'Product ID is required' },
          { status: 400 }
        );
      }

      // Find product
      const product = await Product.findById(productId);
      if (!product) {
        return NextResponse.json(
          { success: false, message: 'Product not found' },
          { status: 404 }
        );
      }

      // Find or create cart
      let cart = await Cart.findOne({ user: request.user?._id });
      if (!cart) {
        cart = await Cart.create({
          user: request.user?._id,
          items: [],
          totalPrice: 0,
        });
      }

      // Check if product already in cart
      const existingItemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (existingItemIndex > -1) {
        // Update quantity
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        cart.items.push({
          product: productId,
          quantity,
          price: product.discountPrice || product.price,
        });
      }

      await cart.save();

      // Populate items before returning
      await cart.populate('items.product');

      return NextResponse.json({
        success: true,
        data: cart,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to add item to cart' },
        { status: 500 }
      );
    }
  });
}

// PUT /api/cart - Update cart item quantity
export async function PUT(request: NextRequest) {
  return authMiddleware(request, async () => {
    try {
      await dbConnect();
      const body = await request.json();
      const { productId, quantity } = body;

      if (!productId || quantity === undefined) {
        return NextResponse.json(
          { success: false, message: 'Product ID and quantity are required' },
          { status: 400 }
        );
      }

      let cart = await Cart.findOne({ user: request.user?._id });
      if (!cart) {
        return NextResponse.json(
          { success: false, message: 'Cart not found' },
          { status: 404 }
        );
      }

      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex === -1) {
        return NextResponse.json(
          { success: false, message: 'Item not found in cart' },
          { status: 404 }
        );
      }

      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }

      await cart.save();
      await cart.populate('items.product');

      return NextResponse.json({
        success: true,
        data: cart,
      });
    } catch (error) {
      console.error('Error updating cart:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to update cart' },
        { status: 500 }
      );
    }
  });
}

// DELETE /api/cart - Remove item from cart
export async function DELETE(request: NextRequest) {
  return authMiddleware(request, async () => {
    try {
      await dbConnect();
      const { searchParams } = new URL(request.url);
      const productId = searchParams.get('productId');

      if (!productId) {
        return NextResponse.json(
          { success: false, message: 'Product ID is required' },
          { status: 400 }
        );
      }

      let cart = await Cart.findOne({ user: request.user?._id });
      if (!cart) {
        return NextResponse.json(
          { success: false, message: 'Cart not found' },
          { status: 404 }
        );
      }

      cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
      );

      await cart.save();
      await cart.populate('items.product');

      return NextResponse.json({
        success: true,
        data: cart,
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to remove item from cart' },
        { status: 500 }
      );
    }
  });
}
