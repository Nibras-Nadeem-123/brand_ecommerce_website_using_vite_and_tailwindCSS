import { Inter } from 'next/font/google'
import Image from 'next/image'
import React from 'react'

class Product {
    name: string
    image: string
    discount: string
    style: string
    constructor(name: string, image: string, discount: string, style: string) {
        this.name = name
        this.image = image
        this.discount = discount
        this.style = style
    }
}

const inter = Inter({ subsets: ['latin'] })

const Sale_section = () => {

    const items: Product[] = [
        {
            name: "Smart watches",
            image: "/smart_watches.png",
            discount: "-25%",
            style: 'w-[101.42px] h-[121.33px] mt-[9.33px]',
        },
        {
            name: "Laptops",
            image: "/laptops.png",
            discount: "-15%",
            style: 'w-[126.31px] h-[99.56px] mt-[20.53px]',
        },
        {
            name: "GoPro cameras",
            image: "/camera.png",
            discount: "-40%",
            style: 'w-[129.42px] h-[91.47px] mt-[24.27px]',
        },
        {
            name: "Headphones",
            image: "/headphones.png",
            discount: "-25%",
            style: 'w-[112.62px] h-[128.18px] mt-[6.22px]',
        },
        {
            name: "Canon camreras",
            image: "/canon_camreras.png",
            discount: "-25%",
            style: 'w-[125.07px] h-[125.07px] mt-[7.47px]',
        },
    ]
    return (
        <div className='flex h-60 border border-[#DEE2E7] rounded-md bg-white'>
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
                {/* Item */}
                {items.map((product, index) => (
                    <div key={index} className='pt-2 px-3.5 border-l border-[#DEE2E7]'>
                        <div className='w-35 h-35 flex justify-center items-center mb-3.75'>
                            <Image src={`/home${product.image}`} alt={product.name} height={200} width={200} className={product.style} />
                        </div>
                        <h2 className={`${inter.className} text-[16px] text-[#1C1C1C] text-center font-normal`}>{product.name}</h2>
                        <p className={`${inter.className} w-15.25 h-7 bg-[#FFE3E3] rounded-[29px] px-3.25 py-1 mt-2 text-[14px] text-[#EB001B] ml-9.25 text-center font-medium`}>{product.discount}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sale_section