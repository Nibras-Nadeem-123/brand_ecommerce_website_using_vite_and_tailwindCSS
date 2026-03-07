import { Inter } from 'next/font/google'
import Image from 'next/image'
import React from 'react'
import { FaApple, FaFacebookF, FaGooglePlay, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa6'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import { ImInstagram } from 'react-icons/im'
import { IoIosArrowDown } from 'react-icons/io'

const inter = Inter({ subsets: ['latin'], weight: '400' })

const Footer = () => {

    const icons = [
        { name: <FaFacebookF /> },
        { name: <FaTwitter /> },
        { name: <FaLinkedinIn /> },
        { name: <ImInstagram /> },
        { name: <FaYoutube /> },
    ]

    const about_link = [
        { name: "About Us", link: "/about" },
        { name: "Find store", link: "/store" },
        { name: "Categories", link: "/categories" },
        { name: "Blogs", link: "/blogs " },
    ]

    const partnership_link = [
        { name: "About Us", link: "/about" },
        { name: "Find store", link: "/store" },
        { name: "Categories", link: "/categories" },
        { name: "Blogs", link: "/blogs " },
    ]

    const information_link = [
        { name: "Help Center", link: "/help" },
        { name: "Money Refund", link: "/refund" },
        { name: "Shipping", link: "/shipping" },
        { name: "Contact Us", link: "/contact" },
    ]

    const about_user_link = [
        { name: "Login", link: "/login" },
        { name: "Register", link: "/register" },
        { name: "Settings", link: "/settings" },
        { name: "My Orders", link: "/orders" },
    ]
    return (
        <div className='h-81 w-full bg-white'>
            {/* Upper  Section */}
            <main className='flex justify-between mx-36.25'>
                {/* 1st container */}
                <section className='w-69 h-39.25 pt-10'>
                    {/* brand logo */}
                    <div className='flex'>
                        {/* logo */}
                        <div className='h-11 w-11 opacity-80 mt-[1.91px]'>
                            <div className='absolute w-[38.26px] h-[40.17px] ml-[0.96px] mt-[1.91px] bg-[#0D6EFD] rounded-lg'>
                                <HiOutlineShoppingBag className=' w-[17.45px] h-[20.64px] mt-[12.48px] ml-[11.48px] text-white' />
                                <div className='bg-[#FFFFFF]/70 w-[11.5px] h-[10.79px] mt-[18.36px] ml-[14.36px]'>
                                </div>
                            </div>
                            <div className='w-[36.35px] h-[40.17px]  ml-[7.65px] bg-[#0D6EFD33]/80 rounded-lg'>

                            </div>
                        </div>
                        {/* text */}
                        <div className='w-19.25 h-[21.10px] mt-2 ml-[9.21px] text-[#8CB7F5] text-3xl font-bold'>
                            <p>Brand</p>
                        </div>
                    </div>

                    {/* lines */}
                    <div className={`${inter.className} text-[16px] text-[#505050] mt-3.25`}>
                        <p>Best information about the company gies here but now lorem ipsum is</p>
                    </div>

                    {/* icons */}
                    <div className='flex w-60 h-8 mt-3.25'>
                        {icons.map((item, index) => (
                            <div key={index} className='w-9 h-8 bg-[#BDC4CD] rounded-2xl mr-3.25 cursor-pointer hover:bg-blue-600'>
                                <div className='w-4 h-4 mx-auto mt-2 text-white'>
                                    {item.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 2nd container */}
                <section className='w-20.25 h-34.25 pt-10'>
                    <p className={`${inter.className} text-[16px] mb-3.25 text-[#1C1C1C]`}>About Us</p>
                    {about_link.map((item, index) => (
                        <a key={index} href={item.link} className={`${inter.className} text-[16px] text-[#8B96A5] block hover:text-[#0D6EFD]`}>
                            {item.name}
                        </a>
                    ))}
                </section>

                {/* 3rd container */}
                <section className='w-22.25 h-34.25 pt-10'>
                    <p className={`${inter.className} text-[16px] mb-3.25 text-[#1C1C1C]`}>Partnership</p>
                    {partnership_link.map((item, index) => (
                        <a key={index} href={item.link} className={`${inter.className} text-[16px] text-[#8B96A5] block hover:text-[#0D6EFD]`}>
                            {item.name}
                        </a>
                    ))}
                </section>

                {/* 4th container */}
                <section className='w-29 h-34.25 pt-10'>
                    <p className={`${inter.className} text-[16px] mb-3.25 text-[#1C1C1C]`}>Information</p>
                    {information_link.map((item, index) => (
                        <a key={index} href={item.link} className={`${inter.className} text-[16px] text-[#8B96A5] block hover:text-[#0D6EFD]`}>
                            {item.name}
                        </a>
                    ))}
                </section>

                {/* 5th container */}
                <section className='w-20 h-34.25 pt-10'>
                    <p className={`${inter.className} text-[16px] mb-3.25 text-[#1C1C1C]`}>For users</p>
                    {about_user_link.map((item, index) => (
                        <a key={index} href={item.link} className={`${inter.className} text-[16px] text-[#8B96A5] block hover:text-[#0D6EFD]`}>
                            {item.name}
                        </a>
                    ))}
                </section>

                {/* 6th container */}
                <section className='w-20 h-34.25 pt-10 mr-16'>
                    <p className={`${inter.className} text-[16px] text-[#1C1C1C]`}>Get app</p>
                    {/* download from app store */}
                    <div className='flex gap-1 w-34 h-10.5 mt-3.25 bg-[#1C1C1C] rounded-md p-1.5'>
                        <FaApple className='w-7 h-7' />
                        <div className={`${inter.className}`}>
                            <p className='text-[10px] font-light'>Download on the</p>
                            <h2 className='text-[16px] -mt-2 font-bold'>App Store</h2>
                        </div>
                    </div>

                    {/* download from play store */}
                    <div className='flex gap-1 w-34 h-10.5 mt-3.25 bg-[#1C1C1C] rounded-md p-1.5'>
                        <FaGooglePlay className='w-7 h-7' />
                        <div className={`${inter.className}`}>
                            <p className='text-[10px] font-light'>Get it on</p>
                            <h2 className='text-[16px] -mt-2 font-bold'>Google Play</h2>
                        </div>
                    </div>
                </section>
            </main>

            {/* Lower Section */}
            <section className='flex justify-between h-17 bg-[#DEE2E7] mt-23'>
                <div className='pt-6 mx-36.25'>
                    <p className={`${inter.className} text-[16px] text-[#606060]`}>© 2023 Ecommerce.</p>
                </div>
                <div className='flex h-7 w-26.5 mr-32 mt-6'>
                    <Image src={"/flags/united-states.png"} alt='United States' width={24} height={17} />
                    <p className={`${inter.className} text-[16px] text-[#606060] ml-2 mt-0.5`}>English</p>
                    <IoIosArrowDown className='w-4 h-3.5 mt-1.75 text-[#8B96A5] hover:text-[#0D6EFD] focus:text-[#0D6EFD]' />
                </div>
            </section>
        </div>
    )
}

export default Footer