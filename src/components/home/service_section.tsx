import { Inter } from 'next/font/google'
import Image from 'next/image'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdOutlineInventory2, MdOutlineSecurity, MdOutlineSend } from 'react-icons/md'

const inter = Inter({ subsets: ["latin"] })

const Service_section = () => {
    const services = [
        {
            name: "Source from Industry Hubs",
            image: "/service1.png",
            icon: <AiOutlineSearch className='w-4.37 h-4.37 text-[#1C1C1C]' />
        },
        {
            name: "Customize Your Products",
            image: "/service2.png",
            icon: <MdOutlineInventory2 className='w-4.37 h-4.37 text-[#1C1C1C]' />,
        },
        {
            name: "Fast, reliable shipping by ocean or air",
            image: "/service3.png",
            icon: <MdOutlineSend className='w-4.37 h-4.37 text-[#1C1C1C]' />,
        },
        {
            name: "Product monitoring and inspection",
            image: "/service4.png",
            icon: <MdOutlineSecurity className='w-4.37 h-4.37 text-[#1C1C1C]' />
        }
    ]
    return (
        <div className='h-64'>
            <h2 className={`${inter.className} text-[24px] font-semibold text-[#1C1C1C]`}>Our extra services</h2>
            <div className="flex justify-between gap-4">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="w-70 h-50 mt-5 bg-white hover:bg-[#E0E0E0] transition-colors duration-200 rounded-md"
                    >
                        {/* Image + Icon wrapper */}
                        <div className="relative w-full h-30">
                            <Image
                                src={`/home${service.image}`}
                                alt={service.name}
                                width={280}
                                height={120}
                                className="w-full h-full object-cover rounded-t-md"
                            />

                            {/* Icon overlay */}
                            <div className="absolute -bottom-6 right-4 w-13.75 h-13.75 bg-[#D1E7FF] border-2 border-white rounded-full flex items-center justify-center shadow-md ">
                                {service.icon}
                            </div>
                        </div>

                        {/* Text content */}
                        <div className="pt-5 px-4">
                            <p
                                className={`${inter.className} w-43.75 text-[16px] font-medium text-[#1C1C1C]`}
                            >
                                {service.name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Service_section