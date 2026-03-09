"use client";

import { Inter } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { MdShoppingCart, MdDelete } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const inter = Inter({ subsets: ["latin"] });

export default function CartPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, getCartTotal, clearCart } = useCart();

  const handleCheckout = () => {
    alert("Checkout functionality coming soon!");
  };

  const handleContinueShopping = () => {
    router.push("/products");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="flex justify-center">
            <MdShoppingCart className="w-20 h-20 text-[#8B96A5]" />
          </div>
          <h1 className={`${inter.className} text-[28px] font-bold text-[#1C1C1C]`}>
            Your cart is empty
          </h1>
          <p className={`${inter.className} text-[16px] text-[#8B96A5]`}>
            Add some products to your cart and they will appear here.
          </p>
          <button
            onClick={handleContinueShopping}
            className={`${inter.className} w-full h-12 bg-[#0D6EFD] text-white rounded-md text-[16px] font-medium hover:bg-[#0056b3]`}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-[1200px] mx-auto">
        <h1 className={`${inter.className} text-[32px] font-bold text-[#1C1C1C] mb-8`}>
          Shopping Cart ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
        </h1>

        <div className="grid grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="col-span-2 space-y-4">
            {cartItems.map((item) => {
              const finalPrice = item.discountPrice || item.price;
              
              return (
                <div
                  key={item.productId}
                  className="flex gap-4 bg-white rounded-md border border-[#DEE2E7] p-4"
                >
                  {/* Product Image */}
                  <div className="w-28 h-28 bg-gray-50 rounded-md overflow-hidden shrink-0">
                    <Image
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className={`${inter.className} text-[16px] font-medium text-[#1C1C1C] line-clamp-2`}>
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className={`${inter.className} text-[13px] text-[#8B96A5] mt-1 line-clamp-2`}>
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`${inter.className} text-[20px] font-bold text-[#1C1C1C]`}>
                        ${finalPrice.toFixed(2)}
                      </span>
                      {item.discountPrice && item.discountPrice < item.price && (
                        <span className={`${inter.className} text-[14px] text-[#8B96A5] line-through`}>
                          ${item.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-[#8B96A5] hover:text-[#FA3434] transition-colors"
                    >
                      <MdDelete className="w-5 h-5" />
                    </button>
                    <div className="flex items-center border border-[#DEE2E7] rounded">
                      <button
                        onClick={() => decreaseQuantity(item.productId)}
                        className="w-8 h-8 flex items-center justify-center text-[#1C1C1C] hover:bg-gray-100"
                      >
                        <AiOutlineMinus className="w-4 h-4" />
                      </button>
                      <span className={`w-10 text-center ${inter.className} text-[14px]`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.productId)}
                        className="w-8 h-8 flex items-center justify-center text-[#1C1C1C] hover:bg-gray-100"
                      >
                        <AiOutlinePlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className={`${inter.className} text-[14px] text-[#FA3434] hover:underline mt-4`}
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="col-span-1">
            <div className="bg-white rounded-md border border-[#DEE2E7] p-6 sticky top-24">
              <h2 className={`${inter.className} text-[20px] font-bold text-[#1C1C1C] mb-6`}>
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className={`${inter.className} text-[14px] text-[#8B96A5]`}>
                    Subtotal
                  </span>
                  <span className={`${inter.className} text-[16px] font-medium text-[#1C1C1C]`}>
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`${inter.className} text-[14px] text-[#8B96A5]`}>
                    Shipping
                  </span>
                  <span className={`${inter.className} text-[16px] font-medium text-[#00B517]`}>
                    FREE
                  </span>
                </div>
                <div className="border-t border-[#DEE2E7] pt-4">
                  <div className="flex justify-between">
                    <span className={`${inter.className} text-[16px] font-semibold text-[#1C1C1C]`}>
                      Total
                    </span>
                    <span className={`${inter.className} text-[24px] font-bold text-[#1C1C1C]`}>
                      ${getCartTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className={`${inter.className} w-full h-12 mt-6 bg-[#0D6EFD] text-white rounded-md text-[16px] font-medium hover:bg-[#0056b3]`}
              >
                Proceed to Checkout
              </button>

              <button
                onClick={handleContinueShopping}
                className={`${inter.className} w-full h-12 mt-3 bg-white border border-[#DEE2E7] text-[#1C1C1C] rounded-md text-[16px] font-medium hover:bg-gray-50`}
              >
                Continue Shopping
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-[#DEE2E7]">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 text-[#00B517]">✓</div>
                    <span className={`${inter.className} text-[12px] text-[#8B96A5]`}>
                      Secure checkout
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 text-[#00B517]">✓</div>
                    <span className={`${inter.className} text-[12px] text-[#8B96A5]`}>
                      Free shipping on orders over $50
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 text-[#00B517]">✓</div>
                    <span className={`${inter.className} text-[12px] text-[#8B96A5]`}>
                      Easy returns
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
