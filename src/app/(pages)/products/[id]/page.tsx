"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ProductDetails() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Mock API call to fetch product details
        if (id) {
            const fetchProduct = async () => {
                const mockProduct = {
                    id,
                    name: `Product ${id}`,
                    description: `This is a detailed description of product ${id}.`,
                    price: `$${(Math.random() * 100).toFixed(2)}`,
                };
                setProduct(mockProduct);
            };
            fetchProduct();
        }
    }, [id]);

    if (!id) {
        return <p className="text-red-500">Product ID is missing!</p>;
    }

    return (
        <div className="p-5 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4">Product Details</h1>
            {product ? (
                <div>
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                    <p className="text-gray-700 mt-2">{product.description}</p>
                    <p className="text-green-600 font-bold mt-4">Price: {product.price}</p>
                </div>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
}