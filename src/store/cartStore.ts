import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
  brand?: string;
  stock: number;
  rating?: number;
  numReviews?: number;
}

interface ICartItem {
  product: IProduct;
  quantity: number;
  price: number;
}

interface ICart {
  _id: string;
  user: string;
  items: ICartItem[];
  totalPrice: number;
}

interface CartState {
  cart: ICart | null;
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      isLoading: false,

      fetchCart: async () => {
        try {
          set({ isLoading: true });
          const response = await fetch('/api/cart');
          const data = await response.json();
          if (data.success) {
            set({ cart: data.data });
          }
        } catch (error) {
          console.error('Error fetching cart:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      addToCart: async (productId: string, quantity: number) => {
        try {
          const response = await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity }),
          });
          const data = await response.json();
          if (data.success) {
            set({ cart: data.data });
          }
        } catch (error) {
          console.error('Error adding to cart:', error);
          throw error;
        }
      },

      updateQuantity: async (productId: string, quantity: number) => {
        try {
          const response = await fetch('/api/cart', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity }),
          });
          const data = await response.json();
          if (data.success) {
            set({ cart: data.data });
          }
        } catch (error) {
          console.error('Error updating cart:', error);
          throw error;
        }
      },

      removeFromCart: async (productId: string) => {
        try {
          const response = await fetch(`/api/cart?productId=${productId}`, {
            method: 'DELETE',
          });
          const data = await response.json();
          if (data.success) {
            set({ cart: data.data });
          }
        } catch (error) {
          console.error('Error removing from cart:', error);
          throw error;
        }
      },

      clearCart: () => {
        set({ cart: null });
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
