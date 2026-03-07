import { Inter } from "next/font/google"
import Image from "next/image"

const inter = Inter({ subsets: ["latin"] })

const Recommended_section = () => {

    const products = [
        {
            name: "T-shirts with multiple colors, for men",
            image: "/recom_item_1.png",
            price: "10.30",
        },
        {
            name: "Jeans shorts for men blue color",
            image: "/recom_item_2.jpg",
            price: "10.30",
        },
        {
            name: "Brown winter coat medium size",
            image: "/recom_item_3.png",
            price: "12.50",
        },
        {
            name: "Jeans bag for travel for men",
            image: "/recom_item_4.png",
            price: "34.00",
        },
        {
            name: "Leather wallet",
            image: "/recom_item_5.png",
            price: "99.00",
        },
        {
            name: "Canon camera black, 100x zoom",
            image: "/recom_item_6.png",
            price: "9.99",
        },
        {
            name: "Headset for gaming with mic",
            image: "/headphone2.png",
            price: "8.99",
        },
        {
            name: "Smartwatch silver color modern",
            image: "/recom_item_5.png",
            price: "10.30",
        },
        {
            name: "Blue wallet for men leather metarfial",
            image: "/soil_pot.png",
            price: "10.30",
        },
        {
            name: "Jeans bag for travel for men",
            image: "/electric_catle.png",
            price: "80.95",
        },
    ]
  return (
      <div className='h-160 '>
          <h2 className={`${inter.className} text-[24px] font-semibold text-[#1C1C1C]`}>Recommended items</h2>
          <div>
              <div className='grid grid-cols-5 gap-3 mt-5 h-150 overflow-x-auto'>
                  {products.map((product, index) => (
                      <div key={index} className='w-51 h-72.5 shrink-0 bg-white border border-[#DEE2E7] rounded-md px-3 py-4'>
                          <Image src={`/home${product.image}`} alt={product.name} width={160} height={120} className='w-[150.22222900390625px] h-[170.6666717529297px] object-cover rounded-md mx-auto' />
                          <h2 className={`${inter.className} text-[14px] text-[#1C1C1C] font-medium mt-5`}>${product.price}</h2>
                          <p className={`${inter.className} text-[13px] text-[#8B96A5] font-normal mt-1`}>{product.name}</p>
                      </div>
                  ))}
              </div>
              
          </div>
    </div>
  )
}

export default Recommended_section