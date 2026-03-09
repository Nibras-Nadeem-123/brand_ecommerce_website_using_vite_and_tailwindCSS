"use client";

import { Inter } from "next/font/google"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

interface IProduct {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  images: string[];
}

const Recommended_section = () => {
  const router = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products?limit=10');
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error('Error fetching recommended products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  return (
      <div className='h-160 '>
          <h2 className={`${inter.className} text-[24px] font-semibold text-[#1C1C1C]`}>Recommended items</h2>
          <div>
              <div className='grid grid-cols-5 gap-3 mt-5 h-150 overflow-x-auto'>
                  {products.map((product) => (
                      <div key={product._id} className='w-51 h-72.5 shrink-0 bg-white border border-[#DEE2E7] rounded-md px-3 py-4' onClick={() => handleProductClick(product._id)}>
                          <Image src={product.images[0] || "/placeholder.png"} alt={product.name} width={160} height={120} className='w-[150.22222900390625px] h-[170.6666717529297px] object-cover rounded-md mx-auto' />
                          <h2 className={`${inter.className} text-[14px] text-[#1C1C1C] font-medium mt-5`}>${(product.discountPrice || product.price).toFixed(2)}</h2>
                          <p className={`${inter.className} text-[13px] text-[#8B96A5] font-normal mt-1`}>{product.name}</p>
                      </div>
                  ))}
              </div>

          </div>
    </div>
  )
}

export default Recommended_section