import { Inter } from 'next/font/google'
import React from 'react'
import { MdOutlineMail } from 'react-icons/md'

const inter = Inter({ subsets: ['latin'] })

const News_letter = () => {
  return (
    <div className="h-47.25 w-screen -ml-39.5 bg-[#EFF2F4]">
      <section className="flex flex-col justify-center items-center w-154.25 h-28.25 mx-auto pt-20">
        <p className={`${inter.className} text-[#1C1C1C] text-[20px] font-semibold`}>
          Subscribe on our newsletter
        </p>

        <p className={`${inter.className} text-[#606060] text-[16px] -mt-1`}>
          Get daily news on upcoming offers from many suppliers all over the world
        </p>

        <div className="flex gap-2 justify-center items-center w-98 h-10 mt-7.25">
          
          {/* Input with icon */}
          <div className="relative">
            <MdOutlineMail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B96A5] text-[20px]"
            />

            <input
              type="email"
              placeholder="Email"
              className={`${inter.className}
                w-68.5 h-9.75 bg-white rounded-md
                pl-10 pr-3 text-[#8B96A5] text-[16px]
                focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent`}
            />
          </div>

          <button
            className={`${inter.className}
              w-27.5 h-9.75 bg-[#127FFF] hover:bg-[#0067FF]
              rounded-sm text-white text-[16px] font-medium cursor-pointer`}
          >
            Subscribe
          </button>
        </div>
      </section>
    </div>
  )
}

export default News_letter
