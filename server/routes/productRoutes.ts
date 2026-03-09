import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';

const router = express.Router();

// GET /api/products - Get all products
router.route('/').get(getProducts);

// POST /api/products - Create new product
router.route('/').post(createProduct);

// GET /api/products/:id - Get product by ID
router.route('/:id').get(getProductById);

// PUT /api/products/:id - Update product
router.route('/:id').put(updateProduct);

// DELETE /api/products/:id - Delete product
router.route('/:id').delete(deleteProduct);

export default router;
