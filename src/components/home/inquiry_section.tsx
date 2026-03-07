import { Inter } from 'next/font/google'
import Image from 'next/image'
import React from 'react'

const inter = Inter({ subsets: ["latin"] })

const Inquiry_section = () => {
  return (
      <div className='h-105 border border-[#E0E0E0] rounded-md'>
          <div className='relative w-full h-full rounded-md'>
              <Image src={"/home/inquiry.png"} alt='Inquiry Section' fill className='object-cover rounded-md' />
              <div className='absolute bg-linear-to-r from-[#2C7CF1] to-[#00D1FF80] top-0 left-0 w-full h-full flex justify-between p-8 rounded-md'>
                  <div className='w-110 h-34.75'>
                      <h2 className={`${inter.className} font-semibold text-[32px] text-white`}>An easy way to send requests to all suppliers</h2>
                      <p className={`${inter.className} text-white text-[16px] font-light`}>Lorem ipsum dolor sit amet, consectetur adipisicing <br/> elit, sed do eiusmod tempor incididunt.</p>
                  </div>
                  <div className='w-122.75 h-86.5 flex flex-col gap-4 bg-white shadow-md shadow-[#38383840] rounded-md p-6'>
                      <h2 className={`${inter.className} text-[20px] font-semibold text-[#1C1C1C]`}>Send quote to suppliers</h2>
                      <input placeholder='What item you need?' className={`${inter.className} w-110 h-10 border border-[#DEE2E7] text-[#1C1C1C] text-[16px] p-2 rounded-md`} />
                      <textarea placeholder='Type more details' className={`${inter.className} w-110 h-17.5 border border-[#DEE2E7] text-[#1C1C1C] text-[16px] rounded-md p-2`} />
                      <div className='flex gap-5'>
                      <input placeholder='Quantity' className={`${inter.className} w-52.5 h-10 border border-[#DEE2E7] text-[#1C1C1C] text-[16px] p-2 rounded-md`} />
                          <select className={`${inter.className} w-27.75 h-10 border border-[#DEE2E7] text-[#1C1C1C] text-[16px] pl-2 pr-2 rounded-md`}>
                                <option value="pcs">Pcs</option>
                          </select>
                      </div>
                          <button className='w-32 h-10 bg-[#127FFF] rounded-sm text-center hover:bg-[#0067FF]'>
                              <p className={`${inter.className} text-[16px] font-medium text-white`}>Send inquiry</p>
                          </button>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Inquiry_section