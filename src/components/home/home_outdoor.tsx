import { Inter } from 'next/font/google'
import Image from 'next/image'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

const Home_outdoor = () => {

    const products = [
        {
            name: "Soft chairs",
            image: "/soft_chairs.png",
            prics: "19",
            className: "",
        },
        {
            name: "Kitchen mixer",
            image: "/kitchen_mixer.png",
            prics: "100",
            className: "",
        },
        {
            name: "Sofa & chair",
            image: "/lamp.png",
            prics: "19",
            className: "",
        },
        {
            name: "Kitchen dishes",
            image: "/kitchen_dishes.png",
            prics: "19",
            className: "",
        },
        {
            name: "Blenders",
            image: "/blenders.png",
            prics: "39",
            className: "",
        },
        {
            name: "Home appliance",
            image: "/home_appliances.jpg",
            prics: "19",
            className: "",
        },
        {
            name: "Coffee maker",
            image: "/plant_pot.png",
            prics: "10",
            className: "",
        },
        {
            name: "Smart watches",
            image: "/soil_pot.png",
            prics: "19",
            className: "",
        },
    ]
    return (
        <div className='flex gap-0 h-64.5 bg-white border border-[#DEE2E7] rounded-md'>
            {/* Home_outdoor */}
            <main className="relative w-70 h-64.25 overflow-hidden">

                {/* Background Image */}
                <Image
                    src="/home/home_outdoor.png"
                    alt="Home & Outdoor"
                    width={280}
                    height={257}
                    className="w-full h-full"
                />

                {/* Overlay */}
                <div className="absolute inset-0 z-10 bg-[#FFE8BA]/60">
                    <h2 className={`${inter.className} text-[20px] text-[#1C1C1C] font-bold mt-5 ml-5`}>Home and <br /> outdoor</h2>
                    <button className={`${inter.className} w-30.75 h-10 bg-[#FFFFFF] z-10 hover:shadow-sm hover:shadow-[#3838380c] rounded-md ml-5 mt-7 text-[#1C1C1C] text-[16px] font-medium cursor-pointer`}>
                        Source now
                    </button>
                </div>

            </main>

            <div className='grid grid-cols-4 w-full h-full'>
                {products.map((product, index) => (
                    <div key={index} className={`w-full pl-3 pr-3 border-[0.5px] border-[#DEE2E7]`}>
                        <div className='flex justify-between'>
                            <div className='mt-4'>
                                <p className={`${inter.className} absolute w-full text-[16px] text-[#1C1C1C] font-normal`}>{product.name}</p>
                                <p className={`${inter.className} text-[13px] mt-6 text-[#8B96A5] font-normal`}>From <br/> USD {product.prics}</p>
                            </div>
                            <Image src={`/home${product.image}`} alt={product.name} height={69.24} width={66.69} className='w-20 h-20 object-cover mt-11' />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home_outdoor