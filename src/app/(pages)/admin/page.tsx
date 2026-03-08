"use client";

import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Image from 'next/image';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

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
  isPublished: boolean;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, fetchUser } = useAuthStore();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    category: '',
    brand: '',
    stock: '',
    images: '',
    isPublished: true,
  });

  useEffect(() => {
    const checkAuth = async () => {
      await fetchUser();
    };
    checkAuth();
  }, []);

  useEffect(() => {
    console.log('Auth state:', { isAuthenticated, user, role: user?.role });
    if (isAuthenticated && user?.role !== 'admin') {
      console.log('Access denied: User is not admin');
      router.push('/');
    } else if (isAuthenticated && user?.role === 'admin') {
      console.log('Access granted: User is admin');
      fetchProducts();
    }
  }, [isAuthenticated, user]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products?limit=100');
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (product?: IProduct) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        discountPrice: product.discountPrice?.toString() || '',
        category: product.category,
        brand: product.brand || '',
        stock: product.stock.toString(),
        images: product.images.join(', '),
        isPublished: product.isPublished,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        discountPrice: '',
        category: '',
        brand: '',
        stock: '',
        images: '',
        isPublished: true,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : undefined,
      category: formData.category,
      brand: formData.brand,
      stock: parseInt(formData.stock),
      images: formData.images.split(',').map(img => img.trim()).filter(img => img),
      isPublished: formData.isPublished,
    };

    try {
      const url = editingProduct ? `/api/products/${editingProduct._id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert(editingProduct ? 'Product updated successfully' : 'Product created successfully');
        handleCloseModal();
        fetchProducts();
      } else {
        alert(data.message || 'Failed to save product');
      }
    } catch (error) {
      console.error('Failed to save product:', error);
      alert('Failed to save product');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await response.json();
      
      if (data.success) {
        alert('Product deleted successfully');
        fetchProducts();
      } else {
        alert(data.message || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product');
    }
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className={`${inter.className} text-[16px] text-[#8B96A5]`}>Access denied. Admin only.</p>
      </div>
    );
  }

  return (
    <div className='mt-10'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className={`${inter.className} text-[28px] font-bold text-[#1C1C1C]`}>Admin Dashboard</h1>
        <button
          onClick={() => handleOpenModal()}
          className={`${inter.className} flex items-center gap-2 px-4 py-2 bg-[#0D6EFD] text-white rounded-md hover:bg-[#0056b3]`}
        >
          <FaPlus className='w-4 h-4' />
          Add Product
        </button>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-4 gap-4 mb-6'>
        <div className='bg-white border border-[#DEE2E7] rounded-md p-4'>
          <p className={`${inter.className} text-[14px] text-[#8B96A5]`}>Total Products</p>
          <p className={`${inter.className} text-[24px] font-bold text-[#1C1C1C]`}>{products.length}</p>
        </div>
        <div className='bg-white border border-[#DEE2E7] rounded-md p-4'>
          <p className={`${inter.className} text-[14px] text-[#8B96A5]`}>In Stock</p>
          <p className={`${inter.className} text-[24px] font-bold text-[#00B517]`}>
            {products.filter(p => p.stock > 0).length}
          </p>
        </div>
        <div className='bg-white border border-[#DEE2E7] rounded-md p-4'>
          <p className={`${inter.className} text-[14px] text-[#8B96A5]`}>Out of Stock</p>
          <p className={`${inter.className} text-[24px] font-bold text-[#FA3434]`}>
            {products.filter(p => p.stock === 0).length}
          </p>
        </div>
        <div className='bg-white border border-[#DEE2E7] rounded-md p-4'>
          <p className={`${inter.className} text-[14px] text-[#8B96A5]`}>Published</p>
          <p className={`${inter.className} text-[24px] font-bold text-[#0D6EFD]`}>
            {products.filter(p => p.isPublished).length}
          </p>
        </div>
      </div>

      {/* Products Table */}
      <div className='bg-white border border-[#DEE2E7] rounded-md overflow-hidden'>
        <table className='w-full'>
          <thead className='bg-[#F8F9FA]'>
            <tr>
              <th className={`${inter.className} text-[14px] font-semibold text-[#1C1C1C] text-left p-4`}>Product</th>
              <th className={`${inter.className} text-[14px] font-semibold text-[#1C1C1C] text-left p-4`}>Category</th>
              <th className={`${inter.className} text-[14px] font-semibold text-[#1C1C1C] text-left p-4`}>Price</th>
              <th className={`${inter.className} text-[14px] font-semibold text-[#1C1C1C] text-left p-4`}>Stock</th>
              <th className={`${inter.className} text-[14px] font-semibold text-[#1C1C1C] text-left p-4`}>Status</th>
              <th className={`${inter.className} text-[14px] font-semibold text-[#1C1C1C] text-left p-4`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className='p-4 text-center'>
                  <p className={`${inter.className} text-[16px] text-[#8B96A5]`}>Loading...</p>
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={6} className='p-4 text-center'>
                  <p className={`${inter.className} text-[16px] text-[#8B96A5]`}>No products found</p>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} className='border-t border-[#DEE2E7]'>
                  <td className='p-4'>
                    <div className='flex items-center gap-3'>
                      {product.images[0] && (
                        <Image 
                          src={product.images[0]} 
                          alt={product.name} 
                          width={40} 
                          height={40} 
                          className='w-10 h-10 object-cover rounded'
                        />
                      )}
                      <div>
                        <p className={`${inter.className} text-[14px] font-medium text-[#1C1C1C]`}>{product.name}</p>
                        <p className={`${inter.className} text-[12px] text-[#8B96A5]`}>{product.brand || 'No brand'}</p>
                      </div>
                    </div>
                  </td>
                  <td className='p-4'>
                    <p className={`${inter.className} text-[14px] text-[#505050]`}>{product.category}</p>
                  </td>
                  <td className='p-4'>
                    <p className={`${inter.className} text-[14px] font-medium text-[#1C1C1C]`}>
                      ${(product.discountPrice || product.price).toFixed(2)}
                    </p>
                    {product.discountPrice && (
                      <p className={`${inter.className} text-[12px] text-[#8B96A5] line-through`}>
                        ${product.price.toFixed(2)}
                      </p>
                    )}
                  </td>
                  <td className='p-4'>
                    <p className={`${inter.className} text-[14px] ${product.stock > 0 ? 'text-[#00B517]' : 'text-[#FA3434]'}`}>
                      {product.stock}
                    </p>
                  </td>
                  <td className='p-4'>
                    <span className={`px-2 py-1 rounded text-[12px] font-medium ${
                      product.isPublished 
                        ? 'bg-[#00B517]/10 text-[#00B517]' 
                        : 'bg-[#8B96A5]/10 text-[#8B96A5]'
                    }`}>
                      {product.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className='p-4'>
                    <div className='flex gap-2'>
                      <button
                        onClick={() => handleOpenModal(product)}
                        className='p-2 text-[#0D6EFD] hover:bg-[#E5F1FF] rounded'
                      >
                        <FaEdit className='w-4 h-4' />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className='p-2 text-[#FA3434] hover:bg-[#FFE5E5] rounded'
                      >
                        <FaTrash className='w-4 h-4' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-md w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <div className='p-6 border-b border-[#DEE2E7]'>
              <h2 className={`${inter.className} text-[20px] font-bold text-[#1C1C1C]`}>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className='p-6 space-y-4'>
              <div>
                <label className={`${inter.className} text-[14px] font-medium text-[#1C1C1C] block mb-1`}>
                  Product Name
                </label>
                <input
                  type='text'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`${inter.className} w-full h-10 border border-[#DEE2E7] rounded-md pl-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]`}
                  required
                />
              </div>
              <div>
                <label className={`${inter.className} text-[14px] font-medium text-[#1C1C1C] block mb-1`}>
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`${inter.className} w-full border border-[#DEE2E7] rounded-md p-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]`}
                  rows={4}
                  required
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className={`${inter.className} text-[14px] font-medium text-[#1C1C1C] block mb-1`}>
                    Price ($)
                  </label>
                  <input
                    type='number'
                    step='0.01'
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className={`${inter.className} w-full h-10 border border-[#DEE2E7] rounded-md pl-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]`}
                    required
                  />
                </div>
                <div>
                  <label className={`${inter.className} text-[14px] font-medium text-[#1C1C1C] block mb-1`}>
                    Discount Price ($)
                  </label>
                  <input
                    type='number'
                    step='0.01'
                    value={formData.discountPrice}
                    onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                    className={`${inter.className} w-full h-10 border border-[#DEE2E7] rounded-md pl-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]`}
                  />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className={`${inter.className} text-[14px] font-medium text-[#1C1C1C] block mb-1`}>
                    Category
                  </label>
                  <input
                    type='text'
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={`${inter.className} w-full h-10 border border-[#DEE2E7] rounded-md pl-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]`}
                    required
                  />
                </div>
                <div>
                  <label className={`${inter.className} text-[14px] font-medium text-[#1C1C1C] block mb-1`}>
                    Brand
                  </label>
                  <input
                    type='text'
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className={`${inter.className} w-full h-10 border border-[#DEE2E7] rounded-md pl-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]`}
                  />
                </div>
              </div>
              <div>
                <label className={`${inter.className} text-[14px] font-medium text-[#1C1C1C] block mb-1`}>
                  Stock Quantity
                </label>
                <input
                  type='number'
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className={`${inter.className} w-full h-10 border border-[#DEE2E7] rounded-md pl-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]`}
                  required
                />
              </div>
              <div>
                <label className={`${inter.className} text-[14px] font-medium text-[#1C1C1C] block mb-1`}>
                  Image URLs (comma separated)
                </label>
                <input
                  type='text'
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  className={`${inter.className} w-full h-10 border border-[#DEE2E7] rounded-md pl-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]`}
                  placeholder='/images/product1.png, /images/product2.png'
                />
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='isPublished'
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className='w-4 h-4 text-[#0D6EFD]'
                />
                <label htmlFor='isPublished' className={`${inter.className} text-[14px] text-[#505050]`}>
                  Publish product
                </label>
              </div>
              <div className='flex gap-4 pt-4'>
                <button
                  type='button'
                  onClick={handleCloseModal}
                  className={`${inter.className} flex-1 h-10 border border-[#DEE2E7] text-[#505050] rounded-md hover:bg-[#F8F9FA]`}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className={`${inter.className} flex-1 h-10 bg-[#0D6EFD] text-white rounded-md hover:bg-[#0056b3]`}
                >
                  {editingProduct ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
