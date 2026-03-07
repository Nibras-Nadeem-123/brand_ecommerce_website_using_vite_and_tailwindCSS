"use client"
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BsFillChatLeftTextFill, BsPersonFill } from 'react-icons/bs'
import { GoHeartFill } from 'react-icons/go'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import { MdShoppingCart } from 'react-icons/md'

const inter = Inter({ subsets: ['latin'], weight: '400' })

const UpperPart = () => {
    const router = useRouter()

    const handleSearch = () => {
        // Implement search functionality here
        alert('Search button clicked');
    }

    const handleCart = () => {
        router.push('/cart');
    } 
    return (
        <div className='flex bg-white h-21.5 text-white px-35.5'>
            {/* Brand Logo */}
            <section className='flex  w-37.5 h-11.5 pt-5'>
                <Link href="/" className={`${inter.className} flex  text-2xl font-bold text-[#0D6EFD]`}>
                    {/* logo */}
                    <div className='h-11 w-11 mt-1 -ml-1 opacity-80'>
                        <div className='absolute w-[38.27px] h-[40.17px] mt-[1.91px] ml-[0.96px] bg-[#0D6EFD] rounded-lg'>
                            <HiOutlineShoppingBag className='absolute w-[17.45px] h-[20.64px] mt-[11.48px] ml-[11.48px] text-white' />
                            <div className='bg-[#FFFFFF]/70 w-[11.5px] h-[10.79px] mt-[18.36px] ml-[14.36px]'>
                            </div>
                        </div>
                        <div className='w-[36.35px] h-[40.17px] mt-[1.91px] ml-[7.65px] bg-[#0D6EFD33]/80 rounded-lg'>

                        </div>
                    </div>
                    {/* Text */}
                    <div className='w-19.25 h-[21.10px] mt-2 ml-[9.21px] text-[#8CB7F5] text-3xl font-bold'>
                        <p>Brand</p>
                    </div>
                </Link>
            </section>

            {/* search bar */}
            <section className='flex justify-baseline w-166.25 h-10 mt-5.5 ml-5.5  border border-[#0D6EFD] rounded-md'>
                {/* input field */}
                <input
                    placeholder='Search'
                    className={`${inter.className} w-105.25 h-9.75 border-r border-[#0D6EFD] rounded-l-md pl-3 text-[#8B96A5] text-[16px]
                        focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent focus:h-9 focus:w-105 focus:mt-px
                        `}
                />
                {/* category field */}
                <select className={`${inter.className} w-36.25 h-10 p-2 text-[#1C1C1C] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent focus:h-9 focus:mt-px focus:w-36 cursor-pointer `}>
                    <option className='p-2 text-[#1C1C1C] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent focus:h-9.25 focus:w-36 cursor-pointer' value="option1">All Categories</option>
                    <option className='p-2 text-[#1C1C1C] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent focus:h-9.25 focus:w-36 cursor-pointer ' value="option2">Clothing</option>
                    <option className='p-2 text-[#1C1C1C] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent focus:h-9.25 focus:w-36 cursor-pointer ' value="option3">Footwear</option>
                    <option className='p-2 text-[#1C1C1C] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent focus:h-9.25 focus:w-36 cursor-pointer ' value="option4">Accessories</option>
                </select>
                {/* button */}
                <button onClick={handleSearch} className='w-25 h-9.75 bg-[#0D6EFD] rounded-r-sm text-white text-[16px] font-medium cursor-pointer'>
                    <p className={`${inter.className} font-bold mx-auto`}>Search</p>
                </button>
            </section>

            {/* icons */}
            <section className='flex text-center items-center w-60 h-10.25 mt-6.25 ml-4.5'>
                <button className='w-full h-10.25 cursor-pointer'>
                    <div className='text-[#8B96A5] hover:text-[#0D6EFD] focus:text-[#0D6EFD] focus:underline'>
                        <BsPersonFill className='w-5 h-4.75 mx-auto' />
                        <p className={`${inter.className} text-[12px] text-center items-center`}>Profile</p>
                    </div>
                </button>
                <button className='w-full h-10.25 cursor-pointer'>
                    <div className='text-[#8B96A5] hover:text-[#0D6EFD] focus:text-[#0D6EFD] focus:underline'>
                        <BsFillChatLeftTextFill className='w-5 h-4.75 mx-auto' />
                        <p className={`${inter.className} text-[12px] text-center items-center`}>Message</p>
                    </div>
                </button>
                <button className='w-full h-10.25 cursor-pointer'>
                    <div className='text-[#8B96A5] hover:text-[#0D6EFD] focus:text-[#0D6EFD] focus:underline'>
                        <GoHeartFill className='w-5 h-4.75 mx-auto' />
                        <p className={`${inter.className} text-[12px] text-center items-center`}>Orders</p>
                    </div>
                </button>
                <button onClick={handleCart} className='w-full h-10.25 cursor-pointer'>
                    <div className='text-[#8B96A5] hover:text-[#0D6EFD] focus:text-[#0D6EFD] focus:underline'>
                        <MdShoppingCart className='w-5 h-4.75 mx-auto' />
                        <p className={`${inter.className} text-[12px] text-center font-extralight items-center`}>My cart</p>
                    </div>
                </button>
            </section>
        </div>
    )
}

export default UpperPart