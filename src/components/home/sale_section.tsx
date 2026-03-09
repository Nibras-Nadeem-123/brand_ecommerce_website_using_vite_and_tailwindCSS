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

const Sale_section = () => {
    const router = useRouter();
    const [items, setItems] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products?limit=5');
                const data = await response.json();
                if (data.success) {
                    setItems(data.data);
                }
            } catch (error) {
                console.error('Error fetching sale products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (productId: string) => {
        router.push(`/product/${productId}`);
    };

    const getImageStyle = (index: number): string => {
        const styles = [
            'w-[101.42px] h-[121.33px] mt-[9.33px]',
            'w-[126.31px] h-[99.56px] mt-[20.53px]',
            'w-[129.42px] h-[91.47px] mt-[24.27px]',
            'w-[112.62px] h-[128.18px] mt-[6.22px]',
            'w-[125.07px] h-[125.07px] mt-[7.47px]',
        ];
        return styles[index % styles.length];
    };

    const getDiscount = (product: IProduct): string => {
        if (product.discountPrice && product.price > product.discountPrice) {
            const discount = Math.round(((product.price - product.discountPrice) / product.price) * 100);
            return `-${discount}%`;
        }
        return '-20%';
    };

    return (
        <div className='flex h-60 w-full border border-[#DEE2E7] rounded-md bg-white'>
            {/* Deals and offers */}
            <div className='w-71.25 h-58.75 px-4 py-5'>
                <main className='w-49.5 h-28.25 '>
                    <h2 className={`${inter.className} text-[20px] font-semibold text-[#1C1C1C]`}>Deals and offers</h2>
                    <p className={`${inter.className} text-[16px] font-normal text-[#8B96A5] `}>Hygiene equipments</p>
                    <div className='flex gap-2 w-49.5 h-10 mt-4'>
                        <div className='w-11.25 h-12.25 py-1 rounded-sm bg-[#606060]'>
                            <h2 className={`${inter.className} text-[16px] text-white font-bold text-center`}>04</h2>
                            <p className={`${inter.className} text-[12px] text-white font-normal text-center -mt-1`}>Days</p>
                        </div>
                        <div className='w-11.25 h-12.25 py-1 rounded-sm bg-[#606060]'>
                            <h2 className={`${inter.className} text-[16px] text-white font-bold text-center`}>13</h2>
                            <p className={`${inter.className} text-[12px] text-white font-normal text-center -mt-1`}>Hour</p>
                        </div>
                        <div className='w-11.25 h-12.25 py-1 rounded-sm bg-[#606060]'>
                            <h2 className={`${inter.className} text-[16px] text-white font-bold text-center`}>34</h2>
                            <p className={`${inter.className} text-[12px] text-white font-normal text-center -mt-1`}>Min</p>
                        </div>
                        <div className='w-11.25 h-12.25 py-1 rounded-sm bg-[#606060]'>
                            <h2 className={`${inter.className} text-[16px] text-white font-bold text-center`}>56</h2>
                            <p className={`${inter.className} text-[12px] text-white font-normal text-center -mt-1`}>Sec</p>
                        </div>
                    </div>
                </main>
            </div>

            {/* Products */}
            <div className='flex w-223.75 h-58.75'>
                {items.map((product, index) => (
                    <div key={product._id} className='pt-2 px-2.75 border-l border-[#DEE2E7]' onClick={() => handleProductClick(product._id)}>
                        <div className='w-35 h-35 flex justify-center items-center mb-3.75'>
                            <Image src={product.images[0] || "/placeholder.png"} alt={product.name} height={200} width={200} className={getImageStyle(index)} />
                        </div>
                        <h2 className={`${inter.className} text-[16px] text-[#1C1C1C] text-center font-normal`}>{product.name}</h2>
                        <p className={`${inter.className} w-15.25 h-7 bg-[#FFE3E3] rounded-[29px] px-3.25 py-1 mt-2 text-[14px] text-[#EB001B] ml-9.25 text-center font-medium`}>{getDiscount(product)}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sale_section