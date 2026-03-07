import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

const Main_section = () => {

    const categories = [
        { name: "Automobiles", link: "/automobiles" },
        { name: "Clothes and wear", link: "/cloths" },
        { name: "Home interiors", link: "/home_interiors" },
        { name: "Computer and tech", link: "/computer_tech" },
        { name: "Tools, equipments", link: "/tools_equipment" },
        { name: "Sports and outdoor", link: "/sports_outdoor" },
        { name: "Animal and pets", link: "/animal_pets" },
        { name: "Machinery tools", link: "/machinery_tools" },
        { name: "More category", link: "/more_category" },
    ]
    return (
        <div className='flex h-100 mt-5 bg-[#FFFFFF] border border-[#DEE2E7] rounded-md px-2 py-3'>
            {/* Categories */}
            <section className='grid grid-cols-1 w-48.5 h-90'>
                {categories.map((category, index) => (
                    <div key={index} className='bg-transparent hover:bg-[#E5F1FF] rounded-md w-48.5 h-10 m-auto p-2 text-[#505050] text-[16px] font-normal hover:font-medium hover:text-[#1C1C1C] focus:text-[#0D6EFD] focus:underline'>
                        <Link href={category.link} className={`${inter.className} w-42.5 h-10 `}>
                            {category.name}
                        </Link>
                    </div>
                ))}
            </section>

            {/* Banner */}
            <section className='mr-6.5'>
                {/* Image */}
                <div className='absolute w-156.25 h-90 border ml-5'>
                    <Image src={"/home/banner_board.png"} alt="banner" width={664} height={373} className='w-166 h-93.25 border rounded-md' />
                </div>
                {/* Text on Image */}
                <div className='relative w-64.25 h-18.25 text-[#1C1C1C] mt-9.75 ml-5 pl-8'>
                    <p className={`${inter.className} font-normal text-[28px] -mb-2`}>Latest trending</p>
                    <h2 className={`${inter.className} text-[32px] font-bold`}>Electronic items</h2>
                    <button className={`${inter.className} w-31 h-10 bg-white rounded-md border border-white px-4 mt-2.5 text-[16px] font-medium cursor-pointer hover:shadow-sm hover:shadow-[#38383814] hover:opacity-80`}>
                        Learn more
                    </button>
                </div>
            </section>

            {/* banners */}
            <section>
                {/* banner 1 */}
                <div className='w-54 h-37.5 rounded-md ml-88 mt-0.5 bg-[#E3F0FF] px-3 py-4'>
                    <div className='flex gap-2'>
                        <Image src={"/home/user.png"} alt='User' height={44} width={44} className='w-11 h-11' />
                        <p className={`${inter.className} text-[16px] text-[#1C1C1C] font-normal`}>Hi, user <br /> let’s get started</p>
                    </div>
                    <button className={`${inter.className} text-center mt-2 items-center w-full h-7.5 bg-[#127FFF] hover:bg-[#0067FF] rounded-sm text-white text-[13px] font-medium cursor-pointer ml-auto`}>
                        Join now
                    </button>
                    <button className={`${inter.className} text-center mt-2 items-center w-full h-7.5 bg-white hover:bg-[#DEE2E7] rounded-sm text-[13px] text-[#127FFF] font-medium cursor-pointer ml-auto`}>
                        Log in
                    </button>
                </div>

                {/* banner 2 */}
                <div className='w-54 h-25 rounded-md ml-88 mt-2.5 bg-[#F38332] px-3 py-4'>
                    <p className={`${inter.className} text-[16px] text-white`}>Get US $10 off <br/> with a new <br/> supplier</p>
                </div>

                {/* banner 3 */}
                <div className='w-54 h-25 rounded-md ml-88 mt-2.5 bg-[#55BDC3] px-3 py-4'>
                    <p className={`${inter.className} text-[16px] text-white`}>Send quotes with supplier <br/> preferences</p>
                </div>
            </section>
        </div>
    )
}

export default Main_section