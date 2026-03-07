"use client";

import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa6'
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowUp, IoIosHeartEmpty } from 'react-icons/io'
import { IoGridSharp } from 'react-icons/io5'
import { VscThreeBars } from 'react-icons/vsc'
import { memo } from 'react';

const inter = Inter({ subsets: ['latin'], weight: '400' })

const Page = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 999999 })
    const [selectedCondition, setSelectedCondition] = useState<string>('Any')
    const [brandSearch, setBrandSearch] = useState<string>("");
    const [featureSearch, setFeatureSearch] = useState<string>("");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortOption, setSortOption] = useState<string>('name');

    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
        );
    }

    const handleBrandChange = (brand: string) => {
        setSelectedBrands((prev) =>
            prev.includes(brand)
                ? prev.filter((item) => item !== brand)
                : [...prev, brand]
        );
    }

    const handleFeatureChange = (feature: string) => {
        setSelectedFeatures((prev) =>
            prev.includes(feature)
                ? prev.filter((item) => item !== feature)
                : [...prev, feature]
        );
    }

    const handlePriceChange = (type: 'min' | 'max', value: number) => {
        setPriceRange((prev) => ({ ...prev, [type]: value }));
    }

    const handleConditionChange = (condition: string) => {
        setSelectedCondition(condition);
    }

    const categories = [
        { name: "Mobile accessory" },
        { name: "Electronics" },
        { name: "Smartphones " },
        { name: "Modern tech" },
    ]

    const brands = [
        { name: "Samsung" },
        { name: "Apple" },
        { name: "Huawei" },
        { name: "Pocco" },
        { name: "Lenovo" },
    ]

    const features = [
        { name: "Metallic" },
        { name: "Plastic cover" },
        { name: "8GB Ram" },
        { name: "Super power" },
        { name: "Large Memory" },
    ]

    const condition = [
        { name: "Any" },
        { name: "Refurbished" },
        { name: "Brand new" },
        { name: "Old items" },
    ]

    const products = [
        {
            name: "Canon Cmera EOS 2000, Black 10x zoom",
            price: "1128.00",
            disc_price: "998.00",
            image: "/smartphone3.png",
            rating: 7.5,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
            order: "154"
        },
        {
            name: "GoPro HERO6 4K Action Camera - Black",
            price: "1128.00",
            disc_price: "998.00",
            image: "/canon_camreras.png",
            rating: 7.5,
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit ",
            order: "154"
        },
        {
            name: "GoPro HERO6 4K Action Camera - Black",
            price: "1128.00",
            disc_price: "998.00",
            image: "/smartphones.png",
            rating: 7.5,
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit ",
            order: "154"
        },
        {
            name: "GoPro HERO6 4K Action Camera - Black",
            price: "1128.00",
            disc_price: "998.00",
            image: "/laptops.png",
            rating: 7.5,
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit ",
            order: "154"
        },
        {
            name: "GoPro HERO6 4K Action Camera - Black",
            price: "1128.00",
            disc_price: "998.00",
            image: "/smart_watches.png",
            rating: 7.5,
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit ",
            order: "154"
        },
        {
            name: "GoPro HERO6 4K Action Camera - Black",
            price: "1128.00",
            disc_price: "998.00",
            image: "/headphone2.png",
            rating: 7.5,
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit ",
            order: "154"
        },
    ]

    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.some((category) => product.name.includes(category));
        const matchesBrand =
            selectedBrands.length === 0 ||
            selectedBrands.some((brand) => product.name.includes(brand));
        const matchesFeature =
            selectedFeatures.length === 0 ||
            selectedFeatures.some((feature) => product.description.includes(feature));
        const matchesPrice =
            Number(product.disc_price) >= priceRange.min && Number(product.disc_price) <= priceRange.max;
        const matchesCondition =
            selectedCondition === 'Any' || product.description.includes(selectedCondition);

        return (
            matchesCategory &&
            matchesBrand &&
            matchesFeature &&
            matchesPrice &&
            matchesCondition
        );
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOption === "priceLowHigh") {
            return parseFloat(a.disc_price) - parseFloat(b.disc_price);
        } else if (sortOption === "priceHighLow") {
            return parseFloat(b.disc_price) - parseFloat(a.disc_price);
        } else if (sortOption === "rating") {
            return (b.rating || 0) - (a.rating || 0);
        } else if (sortOption === "name") {
            return a.name.localeCompare(b.name);
        }
        return 0;
    });

    const MemoizedProductCard = memo(({ product }: { product: typeof products[0] }) => (
        <div className='w-full flex gap-4 bg-white border border-[#DEE2E7] p-4'>
            <div className='w-52.5 h-42.5 my-auto'>
                <Image
                    src={`/home${product.image}`}
                    alt={product.name}
                    height={185}
                    width={185}
                    className='w-full h-full'
                />
            </div>
            <div className='flex flex-col justify-between'>
                <div>
                    <p className={`${inter.className} text-[16px] font-medium text-[#1C1C1C]`}>{product.name}</p>
                    <div className='flex gap-4 items-center'>
                        <p className={`${inter.className} text-[20px] font-semibold text-[#1C1C1C]`}>${product.disc_price}</p>
                        <p className={`${inter.className} text-[16px] font-semibold text-[#8B96A5] line-through`}>${product.price}</p>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <div className='flex justify-center text-center items-center'>
                            <FaStar className='w-4 h-4 mt-1 text-[#FF9017]' />
                            <FaStar className='w-4 h-4 mt-1 text-[#FF9017]' />
                            <FaStar className='w-4 h-4 mt-1 text-[#FF9017]' />
                            <FaStar className='w-4 h-4 mt-1 text-[#FF9017]' />
                            <FaStar className='w-4 h-4 mt-1 text-[#D4CDC5]' />
                            <p className={`${inter.className} text-[16px] font-normal ml-1 mt-1 text-[#FF9017]`}>{product.rating} </p>
                        </div>
                        <div className='flex justify-center text-center items-center gap-1.5'>
                            <span className='w-1.5 h-1.5 rounded-full bg-[#DEE2E7]'></span>
                            <p className={`${inter.className} text-[16px] font-normal text-[#8B96A5]`}>{product.order} orders</p>
                        </div>
                        <div className='flex justify-center text-center items-center gap-1.5'>
                            <span className='w-1.5 h-1.5 rounded-full bg-[#DEE2E7]'></span>
                            <p className={`${inter.className} text-[16px] font-normal text-[#00B517]`}>Free Shipping</p>
                        </div>
                    </div>
                    <p className={`${inter.className} text-[16px] font-normal text-[#505050]`}>{product.description}</p>
                    <p className={`${inter.className} text-[16px] font-medium text-[#0D6EFD] mt-1 cursor-pointer`}>View details</p>
                </div>
            </div>
            <div className='absolute left-10/12 ml-5 w-10 h-10 border border-[#DEE2E7] hover:shadow-sm hover:shadow-[#38383814] rounded-md'>
                <IoIosHeartEmpty className='w-10 h-[18.35px] mx-auto mt-2 text-[#0D6EFD] cursor-pointer' />
            </div>
        </div>

    ));

    MemoizedProductCard.displayName = "MemoizedProductCard";

    const filteredBrands = brands.filter((brand) =>
        brand.name.toLowerCase().includes(brandSearch.toLowerCase())
    );

    const filteredFeatures = features.filter((feature) =>
        feature.name.toLowerCase().includes(featureSearch.toLowerCase())
    );

    return (
        <div className='flex justify-between gap-4 pt-10'>
            {/* sidebar */}
            <main className='w-60 h-full border-t border-[#DEE2E7]'>
                {/* categories */}
                <section>
                    <div className='w-full h-14 border-t border-[#DEE2E7] text-center items-center flex justify-between text-[16px] font-medium text-[#1C1C1C]'>
                        <p className={`${inter.className} text-[16px] font-semibold text-[#1C1C1C]`}>Categories</p>
                        <IoIosArrowUp className='w-4 h-3.5 mt-0.75 text-[#8B96A5] hover:text-[#0D6EFD] focus:text-[#0D6EFD]' />
                    </div>
                    <div>
                        {categories.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => handleCategoryChange(item.name)}
                                className={`${inter.className} w-full h-10 text-left text-[16px] font-normal text-[#505050] hover:bg-[#F8F9FA] focus:bg-[#F8F9FA] cursor-pointer ${selectedCategories.includes(item.name) ? 'bg-[#F8F9FA]' : ''
                                    }`}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </section>

                {/* brands */}
                <section>
                    <div className='w-full h-14 border-t border-[#DEE2E7] text-center items-center flex justify-between text-[16px] font-medium text-[#1C1C1C]'>
                        <p className={`${inter.className} text-[16px] font-semibold text-[#1C1C1C]`}>Brands</p>
                        <IoIosArrowUp className='w-4 h-3.5 mt-0.75 text-[#8B96A5] hover:text-[#0D6EFD] focus:text-[#0D6EFD]' />
                    </div>
                    <div>
                        {filteredBrands.map((brand, index) => (
                            <div key={index} className='flex items-center gap-2'>
                                <input
                                    type='checkbox'
                                    checked={selectedBrands.includes(brand.name)}
                                    onChange={() => handleBrandChange(brand.name)}
                                    className='w-4 h-4 mt-1 ml-2'
                                />
                                <p className={`${inter.className} text-[16px] font-normal text-[#505050]`}>{brand.name}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* features */}
                <section>
                    <div className='w-full h-14 border-t border-[#DEE2E7] text-center items-center flex justify-between text-[16px] font-medium text-[#1C1C1C]'>
                        <p className={`${inter.className} text-[16px] font-semibold text-[#1C1C1C]`}>Features</p>
                        <IoIosArrowUp className='w-4 h-3.5 mt-0.75 text-[#8B96A5] hover:text-[#0D6EFD] focus:text-[#0D6EFD]' />
                    </div>
                    <div>
                        {filteredFeatures.map((fea, index) => (
                            <div key={index} className={`${inter.className} w-full h-10 flex justify-center gap-3 cursor-pointer`}>
                                <input
                                    type="checkbox"
                                    checked={selectedFeatures.includes(fea.name)}
                                    onChange={() => handleFeatureChange(fea.name)}
                                    className='w-4 h-4 mt-1 ml-2'
                                />
                                <p className={`${inter.className} w-full h-10 text-left text-[16px] font-normal text-[#505050] hover:bg-[#F8F9FA] focus:bg-[#F8F9FA] cursor-pointer`}>
                                    {fea.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* price range */}
                <section>
                    <div className='w-full h-14 border-t border-[#DEE2E7] text-center items-center flex justify-between text-[16px] font-medium text-[#1C1C1C]'>
                        <p className={`${inter.className} text-[16px] font-semibold text-[#1C1C1C]`}>Price range</p>
                        <IoIosArrowUp className='w-4 h-3.5 mt-0.75 text-[#8B96A5] hover:text-[#0D6EFD] focus:text-[#0D6EFD]' />
                    </div>
                    <div className='relative'>
                        <hr className='h-1 w-full bg-[#AFD0FF]' />
                        <span className='absolute w-4 h-4 bg-[#FFFFFF] rounded-full -top-1.25 border border-[#0D6EFD] left-[20%] cursor-pointer'></span>
                        <span className='absolute w-4 h-4 bg-[#FFFFFF] rounded-full -top-1.25 border border-[#0D6EFD] left-[80%] cursor-pointer'></span>
                    </div>
                    <div className='flex justify-between mt-2'>
                        <div className='mt-2'>
                            <p className={`${inter.className} text-[16px] font-normal text-[#1C1C1C]`}>Min</p>
                            <input type="number" className={`${inter.className} w-27.25 h-10 border border-[#DEE2E7] rounded-md pl-2 text-[14px] font-normal text-[#BDC4CD] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent`} placeholder='0' />
                        </div>
                        <div className='mt-2'>
                            <p className={`${inter.className} text-[16px] font-normal text-[#1C1C1C]`}>Max</p>
                            <input type="number" className={`${inter.className} w-27.25 h-10 border border-[#DEE2E7] rounded-md pl-2 text-[14px] font-normal text-[#BDC4CD] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent`} placeholder='999999' />
                        </div>
                    </div>

                    <button className={`${inter.className} w-full h-10 mt-5 rounded-md border border-[#DEE2E7] hover:shadow-sm hover:shadow-[#38383814] text-[16px] font-normal cursor-pointer`}>
                        <div className='w-full h-10 text-[16px] font-medium text-[#0D6EFD] text-center mt-1 cursor-pointer'>
                            Apply
                        </div>
                    </button>
                </section>

                {/* condition */}
                <section>
                    <div className='w-full h-14 mt-4 border-t border-[#DEE2E7] text-center items-center flex justify-between text-[16px] font-medium text-[#1C1C1C]'>
                        <p className={`${inter.className} text-[16px] font-semibold text-[#1C1C1C]`}>Condition</p>
                        <IoIosArrowUp className='w-4 h-3.5 mt-0.75 text-[#8B96A5] hover:text-[#0D6EFD] focus:text-[#0D6EFD]' />
                    </div>
                    <div className='mb-5'>
                        {condition.map((con, index) => (
                            <div key={index} className={`${inter.className} w-full h-8 flex text-center gap-3 cursor-pointer`}>
                                <input type="radio" className='w-4 h-4 ml-2 mt-1 text-[#0D6EFD]' />
                                <p key={index} className={`${inter.className} w-full h-10 text-left text-[16px] font-normal text-[#505050] hover:bg-[#F8F9FA] focus:bg-[#F8F9FA] cursor-pointer`}>
                                    {con.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ratings */}
                <section>
                    <div className='w-full h-14 border-t border-[#DEE2E7] text-center items-center flex justify-between text-[16px] font-medium text-[#1C1C1C]'>
                        <p className={`${inter.className} text-[16px] font-semibold text-[#1C1C1C]`}>Ratings</p>
                        <IoIosArrowUp className='w-4 h-3.5 mt-0.75 text-[#8B96A5] hover:text-[#0D6EFD] focus:text-[#0D6EFD]' />
                    </div>
                    <div>
                        {condition.map((con, index) => (
                            <div key={index} className={`${inter.className} w-full h-10 flex gap-2 cursor-pointer`}>
                                <input type="checkbox" className='w-4 h-4 ml-2 text-[#FF9017]' />
                                <div className='flex gap-1'>
                                    <FaStar className='w-4 h-4 text-[#FF9017]' />
                                    <FaStar className='w-4 h-4 text-[#FF9017]' />
                                    <FaStar className='w-4 h-4 text-[#FF9017]' />
                                    <FaStar className='w-4 h-4 text-[#FF9017]' />
                                    <FaStar className='w-4 h-4 text-[#FF9017]' />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            {/* main page product list */}
            <main className='w-full space-y-7'>
                {/* top */}
                <section className='w-full h-15.5 flex justify-between bg-white border border-[#DEE2E7]'>
                    <p className={`${inter.className} text-[16px] font-normal text-[#1C1C1C] ml-4 my-auto`}>12,911 items in <span className='font-semibold'>Mobile accessory</span></p>
                    <div className='flex justify-between items-center gap-4 mr-5'>
                        <div className='flex justify-center'>
                            <input type='checkbox' className='w-4 h-4 mt-1 ml-2 text-[#0D6EFD] cursor-pointer' />
                            <span className={`${inter.className} text-[16px] font-normal text-[#1C1C1C] ml-2 `}>Verified only</span>
                        </div>
                        <div className='flex'>
                            <div
                                className={`border border-[#DEE2E7] rounded-l-md p-2.25 gap-3 cursor-pointer ${viewMode === 'grid' ? 'bg-[#EFF2F4]' : ''}`}
                                onClick={() => setViewMode('grid')}
                            >
                                <IoGridSharp className='w-5 h-4.75 mx-auto text-[#1C1C1C] hover:text-[#0D6EFD] focus:text-[#0D6EFD]' />
                            </div>
                            <div
                                className={`border border-[#DEE2E7] rounded-r-md p-2.25 gap-3 cursor-pointer ${viewMode === 'list' ? 'bg-[#EFF2F4]' : ''}`}
                                onClick={() => setViewMode('list')}
                            >
                                <VscThreeBars className='w-5 h-4.75 mx-auto text-[#1C1C1C] hover:text-[#0D6EFD] focus:text-[#0D6EFD]' />
                            </div>
                        </div>
                    </div>
                </section>
                {/* products list */}
                <div className={`space-y-3 ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : ''}`}>
                    {sortedProducts.map((product, index) => (
                        <MemoizedProductCard key={index} product={product} />
                    ))}
                </div>
                {/* content bottom */}
                <div className='flex gap-3 w-87.5 float-right mr-2'>
                    <select className={`${inter.className} w-36 h-10 p-2 pr-4 text-[#1C1C1C] text-[16px] border border-[#DEE2E7] bg-[#FFFFFF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent focus:h-9.25 focus:w-36 ml-4 cursor-pointer `}>
                        <option >Show 10</option>
                    </select>
                    <div className='h-10 flex justify-center items-center float-right rounded-md '>
                        <button className='w-11 h-10 text-[16px] font-medium focus:text-[#8B96A5] focus:bg-[#EFF2F4] bg-[#FFFFFF] border border-[#DEE2E7] rounded-l-md flex justify-center items-center text-[#1C1C1C] cursor-pointer'>
                            <IoIosArrowBack className='w-5 h-5' />
                        </button>
                        <button className='w-11 h-10 text-[16px] font-medium focus:text-[#8B96A5] focus:bg-[#EFF2F4] bg-[#FFFFFF] border border-[#DEE2E7]  flex justify-center items-center text-[#1C1C1C] cursor-pointer'>
                            1
                        </button>
                        <button className='w-11 h-10 text-[16px] font-medium focus:text-[#8B96A5] focus:bg-[#EFF2F4] bg-[#FFFFFF] border border-[#DEE2E7]  flex justify-center items-center text-[#1C1C1C] cursor-pointer'>
                            2
                        </button>
                        <button className='w-11 h-10 text-[16px] font-medium focus:text-[#8B96A5] focus:bg-[#EFF2F4] bg-[#FFFFFF] border border-[#DEE2E7]  flex justify-center items-center text-[#1C1C1C] cursor-pointer'>
                            3
                        </button>
                        <button className='w-11 h-10 text-[16px] font-medium focus:text-[#8B96A5] focus:bg-[#EFF2F4] bg-[#FFFFFF] border border-[#DEE2E7] rounded-r-md flex justify-center items-center text-[#1C1C1C] cursor-pointer'>
                            <IoIosArrowForward className='w-5 h-5' />
                        </button>
                    </div>
                </div>
            </main>

        </div>
    )
}

export default Page