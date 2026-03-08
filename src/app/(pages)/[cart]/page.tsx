"use client";

import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { FaArrowLeft, FaTruckMoving } from 'react-icons/fa6';
import { BsChatLeftTextFill } from 'react-icons/bs';
import { MdLock } from 'react-icons/md';

const inter = Inter({ subsets: ['latin'] });

interface ICartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    images: string[];
    price: number;
    discountPrice?: number;
  };
  quantity: number;
  price: number;
}

interface ICart {
  _id: string;
  items: ICartItem[];
  totalPrice: number;
}

const Cart = () => {
  const router = useRouter();
  const { cart, fetchCart, updateQuantity, removeFromCart, isLoading } = useCartStore();
  const [localCart, setLocalCart] = useState<ICart | null>(null);

  useEffect(() => {
    const loadCart = async () => {
      await fetchCart();
    };
    loadCart();
  }, []);

  useEffect(() => {
    if (cart) {
      setLocalCart(cart);
    }
  }, [cart]);

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(productId, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const handleRemove = async (productId: string) => {
    try {
      await removeFromCart(productId);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const handleSaveForLater = (productId: string) => {
    // Implement save for later functionality
    alert('Save for later feature coming soon!');
  };

  const features = [
    {
      name: "Secure payment",
      description: "Your payments are secure",
      icon: <MdLock className="w-5 h-5.25 text-[#8B96A5]" />,
    },
    {
      name: "Customer support",
      description: "24/7 customer support",
      icon: <BsChatLeftTextFill className="w-5 h-5.25 text-[#8B96A5]" />,
    },
    {
      name: "Free delivery",
      description: "Free shipping on orders over $50",
      icon: <FaTruckMoving className="w-5 h-5.25 text-[#8B96A5]" />,
    },
  ];

  const payments = [
    { name: "American Express", image: "/american_express.png" },
    { name: "Master Card", image: "/master_card.webp" },
    { name: "PayPal", image: "/paypal.jpg" },
    { name: "Visa", image: "/visa.jfif" },
    { name: "Apple Pay", image: "/apple_pay.png" },
  ];

  if (isLoading || !localCart) {
    return (
      <div className="flex justify-center items-center h-64 mt-10">
        <p className={`${inter.className} text-[16px] text-[#8B96A5]`}>Loading cart...</p>
      </div>
    );
  }

  const subtotal = localCart.totalPrice;
  const discount = 0; // Could implement coupon logic
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax - discount;

  return (
    <div className='mt-10'>
      <div className='flex gap-5'>
        <div className='w-190'>
          <h1 className={`${inter.className} text-[#1C1C1C] text-[24px]`}>
            My cart ({localCart.items.length})
          </h1>
          
          {localCart.items.length === 0 ? (
            <div className='w-190 h-60 border border-[#DEE2E7] mt-10 flex flex-col justify-center items-center'>
              <p className={`${inter.className} text-[16px] text-[#8B96A5]`}>Your cart is empty</p>
              <button
                onClick={() => router.push('/products')}
                className={`${inter.className} mt-4 px-6 py-2 bg-[#0D6EFD] text-white rounded-md hover:bg-[#0056b3]`}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className='w-190 border border-[#DEE2E7] mt-10 rounded-md overflow-hidden'>
              <div>
                {localCart.items.map((item, index) => (
                  <div 
                    key={item._id || index} 
                    className='flex w-full py-5 px-5 border-b border-[#DEE2E7] last:border-b-0'
                  >
                    <div className='w-20 h-20 border border-[#E0E0E0] rounded-md bg-[#F7F7F7] p-1'>
                      <Image 
                        src={item.product.images[0] || '/home/product_placeholder.png'} 
                        alt={item.product.name} 
                        width={80} 
                        height={80} 
                        className='w-full h-full object-cover' 
                      />
                    </div>
                    <div className='flex justify-between w-full ml-5'>
                      <div className='flex flex-col'>
                        <h2 className={`${inter.className} w-115.5 text-[#1C1C1C] font-medium text-[16px]`}>
                          {item.product.name}
                        </h2>
                        <p className={`${inter.className} w-74.75 text-[#6C757D] text-[14px] font-normal`}>
                          Price: ${item.price.toFixed(2)}
                        </p>
                        <div className='flex gap-5 mt-2'>
                          <button 
                            onClick={() => handleRemove(item.product._id)}
                            className='w-17.5 h-7.5 rounded-md border border-[#DEE2E7] hover:shadow-sm hover:shadow-[#38383814] cursor-pointer text-[13px] font-medium text-[#FA3434]'
                          >
                            Remove
                          </button>
                          <button 
                            onClick={() => handleSaveForLater(item.product._id)}
                            className='w-25.75 h-7.5 rounded-md border border-[#DEE2E7] hover:shadow-sm hover:shadow-[#38383814] cursor-pointer text-[13px] font-medium text-[#0D6EFD]'
                          >
                            Save for later
                          </button>
                        </div>
                      </div>
                      <div className='flex flex-col gap-3 mt-2'>
                        <span className={`${inter.className} text-[#1C1C1C] text-[14px]`}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <select 
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                          className={`${inter.className} w-30.75 h-10 px-3 border border-[#DEE2E7] rounded-md text-[#1C1C1C] text-[16px]`}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(qty => (
                            <option key={qty} value={qty}>Qty: {qty}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex justify-between p-5 bg-[#F8F9FA]'>
                <button 
                  onClick={() => router.push('/products')}
                  className='w-38.25 h-10 flex gap-2 p-2 bg-[#127FFF] hover:bg-[#0067FF] rounded-md mt-3 text-white cursor-pointer'
                >
                  <FaArrowLeft size={15} className='w-[14.67px] h-[14.67px] mt-1' />
                  <p className={`${inter.className} text-[16px] font-medium`}>Back to shop</p>
                </button>
                <button 
                  onClick={() => {
                    localCart.items.forEach(item => handleRemove(item.product._id));
                  }}
                  className='w-28.75 h-10 flex gap-2 p-2 bg-[#FFFFFF] border border-[#DEE2E7] hover:bg-[#dce8fa] rounded-md mt-3 text-[#0D6EFD] cursor-pointer'
                >
                  <p className={`${inter.className} text-[16px] text-center mx-auto font-medium`}>Remove all</p>
                </button>
              </div>
            </div>
          )}
          
          <div className='flex w-full justify-between mt-5'>
            {features.map((fea, item) => (
              <div key={item} className='flex gap-3'>
                <div className='h-12 w-12 flex justify-center items-center text-center rounded-full bg-[#DEE2E7]'>
                  {fea.icon}
                </div>
                <div>
                  <h1 className={`${inter.className} text-[16px] font-normal text-[#1C1C1C]`}>{fea.name}</h1>
                  <p className={`${inter.className} text-[16px] w-50 text-[#A9ACB0] font-normal`}>{fea.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {localCart.items.length > 0 && (
          <div>
            <div className='w-70 h-27.25 border border-[#DEE2E7] bg-white p-3 mt-19 rounded-md'>
              <h3 className={`${inter.className} text-[16px] text-[#505050] font-normal`}>Have a coupon?</h3>
              <div className='flex w-61.75 h-10 border border-[#E0E0E0]'>
                <input 
                  placeholder='Add coupon' 
                  className={`${inter.className} w-41 text-[16px] text-[#8B96A5] font-normal p-2 focus:outline-none`} 
                />
                <button className={`${inter.className} w-21.25 border-l border-[#E0E0E0] text-[16px] text-[#0D6EFD] font-medium p-2 hover:bg-[#F8F9FA]`}>
                  Apply
                </button>
              </div>
            </div>
            <div className='w-70 h-75.5 space-y-2 border border-[#DEE2E7] p-3 mt-3 rounded-md bg-white'>
              <div className='flex justify-between w-full'>
                <p className={`${inter.className} text-[16px] text-[#505050] font-normal`}>Subtotal:</p>
                <p className={`${inter.className} text-[16px] text-[#505050] font-normal`}>${subtotal.toFixed(2)}</p>
              </div>
              <div className='flex justify-between w-full'>
                <p className={`${inter.className} text-[16px] text-[#505050] font-normal`}>Discount:</p>
                <p className={`${inter.className} text-[16px] text-[#FA3434] font-normal`}>- ${discount.toFixed(2)}</p>
              </div>
              <div className='flex justify-between w-full mb-5'>
                <p className={`${inter.className} text-[16px] text-[#505050] font-normal`}>Tax:</p>
                <p className={`${inter.className} text-[16px] text-[#00B517] font-normal`}>+ ${tax.toFixed(2)}</p>
              </div>
              <div className='flex justify-between w-full border-t border-[#E4E4E4] pt-5'>
                <p className={`${inter.className} text-[16px] text-[#1C1C1C] font-semibold`}>Total:</p>
                <p className={`${inter.className} text-[16px] text-[#1C1C1C] font-semibold`}>${total.toFixed(2)}</p>
              </div>
              <button 
                onClick={() => router.push('/checkout')}
                className='w-62 h-13.5 bg-[#00B517] hover:bg-[#009914] rounded-lg text-center items-center text-white text-[18px] font-medium cursor-pointer'
              >
                Checkout
              </button>
              <div className='flex gap-3 mt-3'>
                {payments.map((pay, item) => (
                  <div 
                    key={item} 
                    className='w-8 h-6 bg-[#F8F9FA] border border-[#DEE2E7] rounded flex items-center justify-center'
                  >
                    <span className={`${inter.className} text-[8px] text-[#8B96A5]`}>{pay.name.substring(0, 4)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
