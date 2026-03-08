"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa6';
import { IoIosHeartEmpty, IoIosArrowBack } from 'react-icons/io';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';

const inter = Inter({ subsets: ['latin'] });

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
    features?: string[];
    condition?: string;
}

export default function ProductDetails() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const { addToCart } = useCartStore();
    const { isAuthenticated } = useAuthStore();

    const [product, setProduct] = useState<IProduct | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const response = await fetch(`/api/products/${id}`);
                    const data = await response.json();
                    if (data.success) {
                        setProduct(data.data);
                    } else {
                        setError('Product not found');
                    }
                } catch (err) {
                    setError('Failed to fetch product');
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchProduct();
        }
    }, [id]);

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        try {
            await addToCart(id, quantity);
            alert('Added to cart!');
        } catch (err) {
            console.error('Failed to add to cart:', err);
        }
    };

    const handleBuyNow = async () => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        try {
            await addToCart(id, quantity);
            router.push('/cart');
        } catch (err) {
            console.error('Failed to add to cart:', err);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className={`${inter.className} text-[16px] text-[#8B96A5]`}>Loading product details...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex flex-col justify-center items-center h-screen gap-4">
                <p className={`${inter.className} text-[16px] text-red-500`}>{error || 'Product not found'}</p>
                <button
                    onClick={() => router.back()}
                    className={`${inter.className} flex items-center gap-2 px-4 py-2 bg-[#0D6EFD] text-white rounded-md hover:bg-[#0056b3]`}
                >
                    <IoIosArrowBack className='w-5 h-5' />
                    Go Back
                </button>
            </div>
        );
    }

    const displayPrice = product.discountPrice || product.price;
    const originalPrice = product.discountPrice ? product.price : null;

    return (
        <div className='mt-10'>
            <button
                onClick={() => router.back()}
                className={`${inter.className} flex items-center gap-2 px-4 py-2 text-[#0D6EFD] hover:underline mb-4`}
            >
                <IoIosArrowBack className='w-5 h-5' />
                Back
            </button>

            <div className='flex gap-10 bg-white border border-[#DEE2E7] rounded-md p-6'>
                {/* Product Images */}
                <div className='w-120'>
                    <div className='w-full h-120 border border-[#DEE2E7] rounded-md overflow-hidden'>
                        <Image
                            src={product.images[0] || '/home/product_placeholder.png'}
                            alt={product.name}
                            width={500}
                            height={500}
                            className='w-full h-full object-cover'
                        />
                    </div>
                    {product.images.length > 1 && (
                        <div className='flex gap-2 mt-4'>
                            {product.images.map((image, index) => (
                                <div key={index} className='w-20 h-20 border border-[#DEE2E7] rounded-md overflow-hidden cursor-pointer hover:border-[#0D6EFD]'>
                                    <Image
                                        src={image}
                                        alt={`${product.name} ${index + 1}`}
                                        width={80}
                                        height={80}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className='flex-1'>
                    <h1 className={`${inter.className} text-[28px] font-bold text-[#1C1C1C]`}>{product.name}</h1>
                    
                    <div className='flex gap-4 items-center mt-4'>
                        <div className='flex items-center'>
                            <FaStar className='w-5 h-5 text-[#FF9017]' />
                            <FaStar className='w-5 h-5 text-[#FF9017]' />
                            <FaStar className='w-5 h-5 text-[#FF9017]' />
                            <FaStar className='w-5 h-5 text-[#FF9017]' />
                            <FaStar className='w-5 h-5 text-[#D4CDC5]' />
                        </div>
                        <p className={`${inter.className} text-[16px] text-[#8B96A5]`}>{product.numReviews || 0} reviews</p>
                    </div>

                    <div className='flex gap-4 items-center mt-6'>
                        <p className={`${inter.className} text-[32px] font-bold text-[#1C1C1C]`}>${displayPrice.toFixed(2)}</p>
                        {originalPrice && (
                            <p className={`${inter.className} text-[20px] font-semibold text-[#8B96A5] line-through`}>${originalPrice.toFixed(2)}</p>
                        )}
                    </div>

                    <p className={`${inter.className} text-[16px] text-[#505050] mt-6`}>{product.description}</p>

                    {product.features && product.features.length > 0 && (
                        <div className='mt-6'>
                            <h3 className={`${inter.className} text-[18px] font-semibold text-[#1C1C1C]`}>Features:</h3>
                            <ul className='mt-2 space-y-1'>
                                {product.features.map((feature, index) => (
                                    <li key={index} className={`${inter.className} text-[14px] text-[#505050]`}>• {feature}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className='flex gap-4 mt-8'>
                        <div className='flex items-center gap-2 border border-[#DEE2E7] rounded-md'>
                            <button
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className={`${inter.className} w-10 h-10 text-[20px] text-[#1C1C1C] hover:bg-[#F8F9FA] rounded-l-md`}
                            >
                                -
                            </button>
                            <span className={`${inter.className} text-[16px] text-[#1C1C1C] w-12 text-center`}>{quantity}</span>
                            <button
                                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                                className={`${inter.className} w-10 h-10 text-[20px] text-[#1C1C1C] hover:bg-[#F8F9FA] rounded-r-md`}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className='flex gap-4 mt-6'>
                        <button
                            onClick={handleAddToCart}
                            className={`${inter.className} flex-1 h-12 bg-[#0D6EFD] hover:bg-[#0056b3] text-white text-[16px] font-medium rounded-md cursor-pointer`}
                        >
                            Add to cart
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className={`${inter.className} flex-1 h-12 bg-[#00B517] hover:bg-[#009914] text-white text-[16px] font-medium rounded-md cursor-pointer`}
                        >
                            Buy now
                        </button>
                        <button className={`${inter.className} w-12 h-12 border border-[#DEE2E7] hover:shadow-sm hover:shadow-[#38383814] rounded-md cursor-pointer`}>
                            <IoIosHeartEmpty className='w-6 h-6 mx-auto mt-1.5 text-[#0D6EFD]' />
                        </button>
                    </div>

                    <div className='mt-8 border-t border-[#DEE2E7] pt-6'>
                        <div className='flex gap-8'>
                            <div>
                                <p className={`${inter.className} text-[14px] text-[#8B96A5]`}>Category</p>
                                <p className={`${inter.className} text-[16px] text-[#1C1C1C] font-medium`}>{product.category}</p>
                            </div>
                            {product.brand && (
                                <div>
                                    <p className={`${inter.className} text-[14px] text-[#8B96A5]`}>Brand</p>
                                    <p className={`${inter.className} text-[16px] text-[#1C1C1C] font-medium`}>{product.brand}</p>
                                </div>
                            )}
                            <div>
                                <p className={`${inter.className} text-[14px] text-[#8B96A5]`}>Condition</p>
                                <p className={`${inter.className} text-[16px] text-[#1C1C1C] font-medium capitalize`}>{product.condition || 'New'}</p>
                            </div>
                            <div>
                                <p className={`${inter.className} text-[14px] text-[#8B96A5]`}>Stock</p>
                                <p className={`${inter.className} text-[16px] text-[#00B517] font-medium`}>{product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
