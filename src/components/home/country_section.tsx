import { Inter } from 'next/font/google'
import Image from 'next/image'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

const Country_section = () => {

  const countries = [
    {
      name: "Arabic Emirates",
      image: "/arabic_emirates.png",
      domain: "shopname.ae",
    },
    {
      name: "Australia",
      image: "/australia.png",
      domain: "shopname.ae",
    },
    {
      name: "United States",
      image: "/united-states.png",
      domain: "shopname.ae",
    },
    {
      name: "Russia",
      image: "/russia.png",
      domain: "shopname.ru",
    },
    {
      name: "Italy",
      image: "/italy.png",
      domain: "shopname.it",
    },
    {
      name: "Denmark",
      image: "/denmark.png",
      domain: "shopname.com.dk",
    },
    {
      name: "France",
      image: "/france.png",
      domain: "shopname.com.fr",
    },
    {
      name: "Germany",
      image: "/germany.png",
      domain: "shopname.ae",
    },
    {
      name: "China",
      image: "/china.png",
      domain: "shopname.cn",
    },
    {
      name: "Great Britain",
      image: "/great_britain.png",
      domain: "shopname.co.uk",
    },
  ]
  return (
    <div className='h-34.5'>
      <h2 className={`${inter.className} text-[24px] font-semibold text-[#1C1C1C]`}>Suppliers by region</h2>
      <div className='grid grid-cols-5'>
        {countries.map((country, index) => (
          <div key={index} className='flex items-center gap-2 mt-1'>
            <div className='w-7 h-5  overflow-hidden'>
              <Image src={`/flags${country.image}`} alt={country.name} className='w-full h-full object-cover' width={28} height={20} />
            </div>
            <div className='flex flex-col gap-0 mb-1'>
              <h2 className={`${inter.className} text-[16px] text-[#1C1C1C] font-normal`}>{country.name}</h2>
              <p className={`${inter.className} text-[13px] text-[#8B96A5] font-normal`}>{country.domain}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Country_section