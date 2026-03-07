import { Inter } from 'next/font/google'
import Image from 'next/image'
import React from 'react'
import { IoIosArrowDown, IoMdMenu } from 'react-icons/io'

const inter = Inter({ subsets: ['latin'], weight: '400' })

const Lower_part = () => {

    const menu = [
        { icon: <IoMdMenu className='w-6 h-6 mt-0.75' /> },
        { name: 'All category' },
        { name: 'Hot offers' },
        { name: 'Gift boxes' },
        { name: 'Products' },
        { name: 'Menu item' },
        { name: 'Help' },
        { icon: <IoIosArrowDown className='w-4 h-3.5 mt-0.75 text-[#8B96A5] hover:text-[#0D6EFD] focus:text-[#0D6EFD]' /> }
    ]

    const langugage = [
        { name: "English," },
        { name: "USD" },
        { icon: <IoIosArrowDown className='w-4 h-3.5 mt-0.75 text-[#8B96A5] hover:text-[#0D6EFD] focus:text-[#0D6EFD]' /> }
    ]

    const ship = [
        // { text: "Ship to"},
        { icon: <IoIosArrowDown className='w-4 h-3.5 mt-1.75 text-[#8B96A5] hover:text-[#0D6EFD] focus:text-[#0D6EFD]' /> }
    ]
    return (
        <div className='flex gap-4 justify-between h-14 w-full bg-white border px-30.5'>
            {/* Menu bar */}
            <section className='flex gap-4 items-center text-center  h-6 pt-6 p-4 text-[16px] font-medium text-[#1C1C1C]'>
                {menu.map((item, index) => (
                    <button key={index} className={`${inter.className} flex hover:text-[#0D6EFD] focus:text-[#0D6EFD] focus:underline cursor-pointer`}>
                        {item.name || item.icon}
                    </button>
                ))
                }
            </section>

            {/* language and ship */}
            <div className='flex gap-20 mr-5'>
                {/* Language */}
                <section className='flex gap-4 justify-center items-center text-center w-31 h-6 pt-6 p-4  text-[16px] font-medium text-[#1C1C1C]'>
                    {langugage.map((item, index) => (
                        <button key={index} className={`${inter.className} cursor-pointer`}>
                            {item.name || item.icon}
                        </button>
                    ))
                    }
                </section>

                {/* Ship to */}
                <section className='flex gap-4 justify-center items-center text-center w-31 h-6 pt-6 p-4 text-[16px] font-medium text-[#1C1C1C]'>
                    {ship.map((item, index) => (
                        <button key={index} className={`${inter.className} flex gap-2 cursor-pointer`}>
                            <p  className='w-24'>Ship to</p>
                            <Image src={"/flags/germany.png"} alt='United States' width={24} height={17} />
                            {item.icon}
                        </button>
                    ))
                    }
                </section>
            </div>
        </div>
    )
}

export default Lower_part