"use client";

import { Inter } from 'next/font/google'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

interface IProduct {
    _id: string;
    name: string;
    price: number;
    discountPrice?: number;
    images: string[];
}

const Electronics_gadgets = () => {
    const router = useRouter();
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products?category=Electronics&limit=8');
                const data = await response.json();
                if (data.success) {
                    setProducts(data.data);
                }
            } catch (error) {
                console.error('Error fetching electronics products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (productId: string) => {
        router.push(`/product/${productId}`);
    };

    const getClassNames = (index: number): string => {
        const classNames = ["mb-1", "mt-21", "mt-15", "mt-15", "", "mt-13", "mb-2", "mt-2"];
        return classNames[index % classNames.length];
    };

    return (
        <div className='flex gap-0 h-64.5 bg-white border border-[#DEE2E7] rounded-md'>
            {/* Home_outdoor */}
            <main className="relative w-70 h-64.25 overflow-hidden">

                {/* Background Image */}
                <Image
                    src="/home/electronics_gadgets.png"
                    alt="Home & Outdoor"
                    width={280}
                    height={257}
                    className="w-full h-full"
                />

                {/* Overlay */}
                <div className="absolute inset-0 z-10 bg-[#FFFFFF4D]">
                    <h2 className={`${inter.className} text-[20px] text-[#1C1C1C] font-bold mt-5 ml-5`}>Consumer electronics and gadgets</h2>
                    <button className={`${inter.className} w-30.75 h-10 bg-[#FFFFFF] z-10 hover:shadow-sm hover:shadow-[#3838380c] rounded-md ml-5 mt-7 text-[#1C1C1C] text-[16px] font-medium cursor-pointer`}>
                        Source now
                    </button>
                </div>

            </main>

            <div className='grid grid-cols-4 w-full h-full'>
                {products.map((product, index) => (
                    <div key={product._id} className={`w-full pl-3 pr-3 border-[0.5px] border-[#DEE2E7]`} onClick={() => handleProductClick(product._id)}>
                        <div className='flex justify-between'>
                            <div className='mt-4'>
                                <p className={`${inter.className} absolute w-full text-[16px] text-[#1C1C1C] font-normal`}>{product.name}</p>
                                <p className={`${inter.className} text-[13px] mt-6 text-[#8B96A5] font-normal`}>From <br/> USD {(product.discountPrice || product.price).toFixed(0)}</p>
                            </div>
                            <Image src={product.images[0] || "/placeholder.png"} alt={product.name} height={75} width={70} className={`${getClassNames(index)} object-cover mt-11`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Electronics_gadgets