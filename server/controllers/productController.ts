import { Request, Response } from 'express';
import Product from '../models/Product';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search, sort, page = 1, limit = 10 } = req.query;
    
    const query: Record<string, unknown> = {};
    
    // Filter by category
    if (category) {
      query.category = new RegExp(category as string, 'i');
    }
    
    // Search by name or description
    if (search) {
      query.$or = [
        { name: new RegExp(search as string, 'i') },
        { description: new RegExp(search as string, 'i') },
      ];
    }
    
    const skip = (Number(page) - 1) * Number(limit);
    
    let productsQuery = Product.find(query).skip(skip).limit(Number(limit));
    
    // Sort options
    if (sort) {
      switch (sort) {
        case 'price_asc':
          productsQuery = productsQuery.sort({ price: 1 });
          break;
        case 'price_desc':
          productsQuery = productsQuery.sort({ price: -1 });
          break;
        case 'name':
          productsQuery = productsQuery.sort({ name: 1 });
          break;
        case 'newest':
          productsQuery = productsQuery.sort({ createdAt: -1 });
          break;
      }
    }
    
    const products = await productsQuery;
    const total = await Product.countDocuments(query);
    
    res.json({
      success: true,
      data: products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }
    
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin)
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price, image, description, category, stock } = req.body;
    
    const product = await Product.create({
      name,
      price,
      image,
      description,
      category,
      stock,
    });
    
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid data', error });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin)
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }
    
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid data', error });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }
    
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};
