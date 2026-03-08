import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
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
  condition?: 'new' | 'refurbished' | 'used';
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: 0,
    },
    discountPrice: {
      type: Number,
      min: 0,
    },
    images: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, 'Please provide stock quantity'],
      min: 0,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    features: {
      type: [String],
      default: [],
    },
    condition: {
      type: String,
      enum: ['new', 'refurbished', 'used'],
      default: 'new',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
productSchema.index({ name: 'text', description: 'text', category: 'text' });

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default Product;
