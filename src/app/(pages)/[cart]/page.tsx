"use client";

import { Inter } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { BsChatLeftTextFill } from 'react-icons/bs';
import { FaArrowLeft, FaTruckMoving } from 'react-icons/fa6';
import { MdLock, MdShoppingCart } from 'react-icons/md';

const inter = Inter({ subsets: ['latin'] });

const Cart = () => {
  const router = useRouter();
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, getCartTotal } = useCart();

  const savedForLater = [
    {
      name: "GoPro HERO6 4K Action Camera - Black",
      image: "/smartphones.png",
      price: "99.50",
    },
    {
      name: "GoPro HERO6 4K Action Camera - Black",
      image: "/smartphone3.png",
      price: "99.50",
    },
    {
      name: "GoPro HERO6 4K Action Camera - Black",
      image: "/smart_watches.png",
      price: "99.50",
    },
    {
      name: "GoPro HERO6 4K Action Camera - Black",
      image: "/laptops.png",
      price: "99.50",
    },
  ];

  const features = [
    {
      name: "Secure payment",
      description: "Have you ever finally just ",
      icon: <MdLock className="w-5 h-5.25 text-[#8B96A5]" />,
    },
    {
      name: "Customer support",
      description: "Have you ever finally just ",
      icon: <BsChatLeftTextFill className="w-5 h-5.25 text-[#8B96A5]" />,
    },
    {
      name: "Free delivery",
      description: "Have you ever finally just ",
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

  const subtotal = getCartTotal();
  const discount = 0;
  const tax = subtotal * 0.01;
  const total = subtotal + tax - discount;

  return (
    <div className='mt-10'>
      <div className='flex gap-5'>
        <div className='w-190'>
          <h1 className={`${inter.className} text-[#1C1C1C] text-[24px]`}>My cart ({cartItems.length})</h1>
          
          {cartItems.length === 0 ? (
            <div className='w-190 h-60 border border-[#DEE2E7] mt-10 flex flex-col justify-center items-center bg-white rounded-md'>
              <p className={`${inter.className} text-[16px] text-[#8B96A5]`}>Your cart is empty</p>
              <button
                onClick={() => router.push('/products')}
                className={`${inter.className} mt-4 px-6 py-2 bg-[#0D6EFD] text-white rounded-md hover:bg-[#0056b3]`}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className='w-190 h-auto border border-[#DEE2E7] mt-10 bg-white rounded-md'>
              <div>
                {cartItems.map((product, index) => (
                  <div key={index} className='flex w-179 h-auto mx-auto my-auto py-5 px-5 border-b border-[#DEE2E7] last:border-b-0'>
                    <div className='w-20 h-20 border border-[#E0E0E0] rounded-md bg-[#F7F7F7] p-1'>
                      <Image 
                        src={product.image || '/home/product_placeholder.png'} 
                        alt={product.name} 
                        width={80} 
                        height={80} 
                        className='w-full h-full object-cover' 
                      />
                    </div>
                    <div className='flex justify-between w-full ml-5'>
                      <div className='flex flex-col'>
                        <h2 className={`${inter.className} w-115.5 text-[#1C1C1C] font-medium text-[16px]`}>
                          {product.name}
                        </h2>
                        {product.description && (
                          <p className={`${inter.className} w-74.75 text-[#6C757D] text-[14px] font-normal`}>
                            {product.description}
                          </p>
                        )}
                        <div className='flex gap-5 mt-2'>
                          <button 
                            onClick={() => removeFromCart(product.productId)}
                            className='w-17.5 h-7.5 rounded-md border border-[#DEE2E7] hover:shadow-sm hover:shadow-[#38383814] cursor-pointer text-[13px] font-medium text-[#FA3434]'
                          >
                            Remove
                          </button>
                          <button 
                            onClick={() => router.push(`/products/${product.productId}`)}
                            className='w-25.75 h-7.5 rounded-md border border-[#DEE2E7] hover:shadow-sm hover:shadow-[#38383814] cursor-pointer text-[13px] font-medium text-[#0D6EFD]'
                          >
                            View details
                          </button>
                        </div>
                      </div>
                      <div className='flex flex-col gap-3 mt-2 items-end'>
                        <span className={`${inter.className} text-[#1C1C1C] text-[14px] font-semibold`}>
                          ${(product.discountPrice || product.price).toFixed(2)}
                        </span>
                        <div className='flex items-center gap-2 border border-[#DEE2E7] rounded-md'>
                          <button
                            onClick={() => decreaseQuantity(product.productId)}
                            className={`${inter.className} w-8 h-8 text-[16px] text-[#1C1C1C] hover:bg-[#F8F9FA] rounded-l-md flex items-center justify-center`}
                          >
                            -
                          </button>
                          <span className={`${inter.className} text-[14px] text-[#1C1C1C] w-8 text-center`}>
                            {product.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(product.productId)}
                            className={`${inter.className} w-8 h-8 text-[16px] text-[#1C1C1C] hover:bg-[#F8F9FA] rounded-r-md flex items-center justify-center`}
                          >
                            +
                          </button>
                        </div>
                        <span className={`${inter.className} text-[#1C1C1C] text-[14px] font-semibold`}>
                          Total: ${((product.discountPrice || product.price) * product.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex justify-between p-5 bg-[#F8F9FA]'>
                <button 
                  onClick={() => router.push('/products')}
                  className='w-38.25 h-10 flex gap-2 p-2 bg-[#127FFF] hover:bg-[#0067FF] rounded-md text-white cursor-pointer'
                >
                  <FaArrowLeft size={15} className='w-[14.67px] h-[14.67px] mt-1' />
                  <p className={`${inter.className} text-[16px] font-medium`}>Back to shop</p>
                </button>
                <button 
                  onClick={clearCart}
                  className='w-28.75 h-10 flex gap-2 p-2 bg-[#FFFFFF] border border-[#DEE2E7] hover:bg-[#dce8fa] rounded-md text-[#0D6EFD] cursor-pointer'
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
        
        {cartItems.length > 0 && (
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
            <div className='w-70 h-auto space-y-2 border border-[#DEE2E7] p-3 mt-3 rounded-md bg-white'>
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

      {/* save for later */}
      <section className='h-auto w-full rounded-md border border-[#DEE2E7] bg-white mt-10 px-4 py-6'>
        <h1 className={`${inter.className} text-[20px] text-[#1C1C1C] font-semibold`}>Saved for later</h1>
        <main className='mt-3 flex gap-5 overflow-x-auto'>
          {savedForLater.map((product, index) => (
            <div key={index} className='min-w-[240px]'>
              <Image src={`/home${product.image}`} alt={product.name} width={250} height={240} className='w-60.75 h-60 bg-[#EEEEEE] rounded-md object-cover' />
              <p className={`${inter.className} text-[16px] text-[#1C1C1C] font-medium mt-5`}>${product.price}</p>
              <p className={`${inter.className} text-[18px] font-normal text-[#606060]`}>{product.name}</p>
              <button className='flex items-center justify-center gap-3 w-[156.58px] h-10 rounded-md border border-[#DEE2E7] text-[#0D6EFD] cursor-pointer mt-3 hover:bg-[#E5F1FF]'>
                <MdShoppingCart size={18} />
                <p className={`${inter.className} text-[16px] font-medium`}>Move to cart</p>
              </button>
            </div>
          ))}
        </main>
      </section>

      {/* discount */}
      <section className='h-30 w-full flex justify-between rounded-md bg-[#005ADE] mt-10'>
        <div className='bg-[#237CFF] w-186.25 h-full px-4 py-6'>
          <h2 className={`${inter.className} text-[24px] ml-8 text-white font-semibold`}>Super discount on more than 100 USD</h2>
          <p className={`${inter.className} text-white text-[16px] font-normal ml-8`}>Have you ever finally just write dummy info</p>
        </div>
        <button 
          onClick={() => router.push('/products')}
          className='w-38.25 h-10 flex justify-center gap-2 text-center mr-10 mt-10 p-2 bg-[#FF9017] hover:bg-[#E68116] rounded-md text-white cursor-pointer'
        >
          <p className={`${inter.className} text-[16px] font-medium`}>Shop now</p>
        </button>
      </section>
    </div>
  );
};

export default Cart;
