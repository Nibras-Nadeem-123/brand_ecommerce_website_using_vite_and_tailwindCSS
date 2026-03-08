"use client";

import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useEffect, memo } from 'react'
import { FaStar } from 'react-icons/fa6'
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowUp, IoIosHeartEmpty } from 'react-icons/io'
import { IoGridSharp } from 'react-icons/io5'
import { VscThreeBars } from 'react-icons/vsc'
import { useCart } from '@/context/CartContext';
import { useAuthStore } from '@/store/authStore';

const inter = Inter({ subsets: ['latin'], weight: '400' })

interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    images: string[];
    category: string;
    brand?: string;
    stock: number;
    rating?: number;
    numReviews?: number;
}

const Page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { addToCart: contextAddToCart } = useCart();
    const { isAuthenticated } = useAuthStore();

    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 999999 })
    const [selectedCondition, setSelectedCondition] = useState<string>('Any')
    const [brandSearch, setBrandSearch] = useState<string>("");
    const [featureSearch, setFeatureSearch] = useState<string>("");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortOption, setSortOption] = useState<string>('name');
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);
    const [error, setError] = useState<string | null>(null);

    // Search functionality
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchCategory, setSearchCategory] = useState<string>("all");

    // Load search params from URL on mount
    useEffect(() => {
        const search = searchParams.get('search');
        const category = searchParams.get('category');

        if (search) {
            setSearchQuery(decodeURIComponent(search));
        }
        if (category) {
            setSearchCategory(decodeURIComponent(category));
        }
    }, [searchParams]);

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

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const params = new URLSearchParams();
                params.set('page', page.toString());
                params.set('limit', '100');
                if (sortOption) params.set('sort', sortOption);
                if (priceRange.min > 0) params.set('minPrice', priceRange.min.toString());
                if (priceRange.max < 999999) params.set('maxPrice', priceRange.max.toString());
                if (selectedCategories.length > 0) params.set('category', selectedCategories.join(','));
                if (selectedBrands.length > 0) params.set('brand', selectedBrands.join(','));

                const response = await fetch(`/api/products?${params.toString()}`);
                const data = await response.json();
                if (data.success) {
                    let filteredProducts = data.data;

                    // Filter by search query (product name)
                    if (searchQuery.trim()) {
                        filteredProducts = filteredProducts.filter(product =>
                            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.brand?.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                    }

                    // Filter by search category
                    if (searchCategory !== 'all') {
                        filteredProducts = filteredProducts.filter(product =>
                            product.category.toLowerCase() === searchCategory.toLowerCase()
                        );
                    }

                    setProducts(filteredProducts);
                    setTotalItems(filteredProducts.length);
                } else {
                    setError('Failed to fetch products');
                }
            } catch (err) {
                setError('Failed to fetch products');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [sortOption, priceRange, selectedCategories, selectedBrands, page, searchQuery, searchCategory]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
        );
        setPage(1);
    }

    const handleBrandChange = (brand: string) => {
        setSelectedBrands((prev) =>
            prev.includes(brand)
                ? prev.filter((item) => item !== brand)
                : [...prev, brand]
        );
        setPage(1);
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

    const handleAddToCart = (product: IProduct) => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        contextAddToCart({
            productId: product._id,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            image: product.images[0] || '/home/product_placeholder.png',
            description: product.description,
        });
        alert('Added to cart!');
    };

    const handleViewDetails = (productId: string) => {
        router.push(`/products/${productId}`);
    };

    const filteredBrands = brands.filter((brand) =>
        brand.name.toLowerCase().includes(brandSearch.toLowerCase())
    );

    const filteredFeatures = features.filter((feature) =>
        feature.name.toLowerCase().includes(featureSearch.toLowerCase())
    );

    const MemoizedProductCard = memo(({ product }: { product: IProduct }) => {
        const displayPrice = product.discountPrice || product.price;
        const originalPrice = product.discountPrice ? product.price : null;
        
        return (
            <div className='w-full flex gap-4 bg-white border border-[#DEE2E7] p-4'>
                <div className='w-52.5 h-42.5 my-auto'>
                    <Image
                        src={product.images[0] || `/home/product_placeholder.png`}
                        alt={product.name}
                        height={185}
                        width={185}
                        className='w-full h-full object-cover'
                    />
                </div>
                <div className='flex flex-col justify-between'>
                    <div>
                        <p className={`${inter.className} text-[16px] font-medium text-[#1C1C1C]`}>{product.name}</p>
                        <div className='flex gap-4 items-center'>
                            <p className={`${inter.className} text-[20px] font-semibold text-[#1C1C1C]`}>${displayPrice.toFixed(2)}</p>
                            {originalPrice && (
                                <p className={`${inter.className} text-[16px] font-semibold text-[#8B96A5] line-through`}>${originalPrice.toFixed(2)}</p>
                            )}
                        </div>
                        <div className='flex gap-4 items-center'>
                            <div className='flex justify-center text-center items-center'>
                                <FaStar className='w-4 h-4 mt-1 text-[#FF9017]' />
                                <FaStar className='w-4 h-4 mt-1 text-[#FF9017]' />
                                <FaStar className='w-4 h-4 mt-1 text-[#FF9017]' />
                                <FaStar className='w-4 h-4 mt-1 text-[#FF9017]' />
                                <FaStar className='w-4 h-4 mt-1 text-[#D4CDC5]' />
                                <p className={`${inter.className} text-[16px] font-normal ml-1 mt-1 text-[#FF9017]`}>{product.rating?.toFixed(1) || '0.0'} </p>
                            </div>
                            <div className='flex justify-center text-center items-center gap-1.5'>
                                <span className='w-1.5 h-1.5 rounded-full bg-[#DEE2E7]'></span>
                                <p className={`${inter.className} text-[16px] font-normal text-[#8B96A5]`}>{product.numReviews || 0} reviews</p>
                            </div>
                            <div className='flex justify-center text-center items-center gap-1.5'>
                                <span className='w-1.5 h-1.5 rounded-full bg-[#DEE2E7]'></span>
                                <p className={`${inter.className} text-[16px] font-normal text-[#00B517]`}>Free Shipping</p>
                            </div>
                        </div>
                        <p className={`${inter.className} text-[16px] font-normal text-[#505050]`}>{product.description}</p>
                        <p 
                            className={`${inter.className} text-[16px] font-medium text-[#0D6EFD] mt-1 cursor-pointer hover:underline`}
                            onClick={() => handleViewDetails(product._id)}
                        >
                            View details
                        </p>
                    </div>
                    <button
                        onClick={() => handleAddToCart(product)}
                        className={`${inter.className} w-32 h-10 mt-3 bg-[#0D6EFD] hover:bg-[#0056b3] text-white text-[14px] font-medium rounded-md cursor-pointer`}
                    >
                        Add to cart
                    </button>
                </div>
                <div className='absolute left-10/12 ml-5 w-10 h-10 border border-[#DEE2E7] hover:shadow-sm hover:shadow-[#38383814] rounded-md'>
                    <IoIosHeartEmpty className='w-10 h-[18.35px] mx-auto mt-2 text-[#0D6EFD] cursor-pointer' />
                </div>
            </div>
        );
    });

    MemoizedProductCard.displayName = "MemoizedProductCard";

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
                            <input 
                                type="number" 
                                className={`${inter.className} w-27.25 h-10 border border-[#DEE2E7] rounded-md pl-2 text-[14px] font-normal text-[#BDC4CD] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent`} 
                                placeholder='0'
                                onChange={(e) => handlePriceChange('min', parseFloat(e.target.value) || 0)}
                            />
                        </div>
                        <div className='mt-2'>
                            <p className={`${inter.className} text-[16px] font-normal text-[#1C1C1C]`}>Max</p>
                            <input 
                                type="number" 
                                className={`${inter.className} w-27.25 h-10 border border-[#DEE2E7] rounded-md pl-2 text-[14px] font-normal text-[#BDC4CD] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent`} 
                                placeholder='999999'
                                onChange={(e) => handlePriceChange('max', parseFloat(e.target.value) || 999999)}
                            />
                        </div>
                    </div>

                    <button 
                        onClick={() => setPage(1)}
                        className={`${inter.className} w-full h-10 mt-5 rounded-md border border-[#DEE2E7] hover:shadow-sm hover:shadow-[#38383814] text-[16px] font-normal cursor-pointer`}
                    >
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
                {/* search bar */}
                <section className='w-full h-20 flex items-center gap-4 bg-white border border-[#DEE2E7] rounded-md px-4'>
                    <div className='flex items-center gap-3 w-full'>
                        <input
                            type='text'
                            placeholder='Search products by name, brand, or description...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`${inter.className} flex-1 h-10 border border-[#DEE2E7] rounded-md pl-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent`}
                        />
                        <select
                            value={searchCategory}
                            onChange={(e) => setSearchCategory(e.target.value)}
                            className={`${inter.className} w-40 h-10 px-3 border border-[#DEE2E7] rounded-md text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] cursor-pointer`}
                        >
                            <option value="all">All Categories</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                        <button
                            onClick={() => setPage(1)}
                            className={`${inter.className} h-10 px-6 bg-[#0D6EFD] text-white rounded-md hover:bg-[#0056b3] font-medium`}
                        >
                            Search
                        </button>
                        {searchQuery && (
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSearchCategory("all");
                                    setPage(1);
                                }}
                                className={`${inter.className} h-10 px-4 border border-[#DEE2E7] text-[#8B96A5] rounded-md hover:bg-[#F8F9FA]`}
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </section>

                {/* top */}
                <section className='w-full h-15.5 flex justify-between bg-white border border-[#DEE2E7]'>
                    <p className={`${inter.className} text-[16px] font-normal text-[#1C1C1C] ml-4 my-auto`}>
                        {searchQuery ? (
                            <span>
                                Search results for "<span className='font-semibold'>{searchQuery}</span>": {totalItems} items found
                            </span>
                        ) : (
                            <span>{totalItems} items found</span>
                        )}
                    </p>
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
                
                {/* loading state */}
                {isLoading && (
                    <div className='flex justify-center items-center h-64'>
                        <p className={`${inter.className} text-[16px] text-[#8B96A5]`}>Loading products...</p>
                    </div>
                )}
                
                {/* error state */}
                {error && (
                    <div className='flex justify-center items-center h-64'>
                        <p className={`${inter.className} text-[16px] text-red-500`}>{error}</p>
                    </div>
                )}
                
                {/* products list */}
                {!isLoading && !error && (
                    <div className={`space-y-3 ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : ''}`}>
                        {products.map((product, index) => (
                            <MemoizedProductCard key={index} product={product} />
                        ))}
                    </div>
                )}
                
                {/* content bottom */}
                <div className='flex gap-3 w-87.5 float-right mr-2'>
                    <select className={`${inter.className} w-36 h-10 p-2 pr-4 text-[#1C1C1C] text-[16px] border border-[#DEE2E7] bg-[#FFFFFF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent focus:h-9.25 focus:w-36 ml-4 cursor-pointer `}>
                        <option >Show 10</option>
                    </select>
                    <div className='h-10 flex justify-center items-center float-right rounded-md '>
                        <button 
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className='w-11 h-10 text-[16px] font-medium focus:text-[#8B96A5] focus:bg-[#EFF2F4] bg-[#FFFFFF] border border-[#DEE2E7] rounded-l-md flex justify-center items-center text-[#1C1C1C] cursor-pointer disabled:opacity-50'
                        >
                            <IoIosArrowBack className='w-5 h-5' />
                        </button>
                        <button className='w-11 h-10 text-[16px] font-medium focus:text-[#8B96A5] focus:bg-[#EFF2F4] bg-[#FFFFFF] border border-[#DEE2E7]  flex justify-center items-center text-[#1C1C1C] cursor-pointer'>
                            {page}
                        </button>
                        <button 
                            onClick={() => setPage(p => p + 1)}
                            className='w-11 h-10 text-[16px] font-medium focus:text-[#8B96A5] focus:bg-[#EFF2F4] bg-[#FFFFFF] border border-[#DEE2E7]  flex justify-center items-center text-[#1C1C1C] cursor-pointer'
                        >
                            {page + 1}
                        </button>
                        <button 
                            onClick={() => setPage(p => p + 2)}
                            className='w-11 h-10 text-[16px] font-medium focus:text-[#8B96A5] focus:bg-[#EFF2F4] bg-[#FFFFFF] border border-[#DEE2E7]  flex justify-center items-center text-[#1C1C1C] cursor-pointer'
                        >
                            {page + 2}
                        </button>
                        <button 
                            onClick={() => setPage(p => p + 1)}
                            className='w-11 h-10 text-[16px] font-medium focus:text-[#8B96A5] focus:bg-[#EFF2F4] bg-[#FFFFFF] border border-[#DEE2E7] rounded-r-md flex justify-center items-center text-[#1C1C1C] cursor-pointer'
                        >
                            <IoIosArrowForward className='w-5 h-5' />
                        </button>
                    </div>
                </div>
            </main>

        </div>
    )
}

export default Page
