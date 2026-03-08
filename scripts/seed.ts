/**
 * Seed script to populate the database with initial data
 * Run with: npx tsx scripts/seed.ts
 */

import mongoose from 'mongoose';
import { dbConnect } from '../src/lib/mongodb';
import User from '../src/models/User';
import Product from '../src/models/Product';

const initialProducts = [
  {
    name: "Canon Camera EOS 2000, Black 10x zoom",
    description: "Professional DSLR camera with 10x optical zoom. Perfect for photography enthusiasts and professionals. Features advanced autofocus and image stabilization.",
    price: 1128.00,
    discountPrice: 998.00,
    images: ["/home/canon_camreras.png"],
    category: "Electronics",
    brand: "Canon",
    stock: 50,
    rating: 4.5,
    numReviews: 124,
    features: ["10x Optical Zoom", "24.1 MP Sensor", "4K Video Recording", "WiFi Enabled"],
    condition: "new" as const,
    isPublished: true,
  },
  {
    name: "GoPro HERO6 4K Action Camera - Black",
    description: "Ultra HD action camera with waterproof design. Capture your adventures in stunning 4K resolution. Voice control and touch screen included.",
    price: 499.00,
    discountPrice: 399.00,
    images: ["/home/smart_watches.png"],
    category: "Electronics",
    brand: "GoPro",
    stock: 75,
    rating: 4.7,
    numReviews: 89,
    features: ["4K Video", "Waterproof", "Voice Control", "Touch Screen"],
    condition: "new" as const,
    isPublished: true,
  },
  {
    name: "Wireless Bluetooth Headphones - Premium Sound",
    description: "High-quality wireless headphones with noise cancellation. Enjoy up to 30 hours of battery life and premium sound quality.",
    price: 199.00,
    discountPrice: 149.00,
    images: ["/home/headphone2.png"],
    category: "Electronics",
    brand: "Sony",
    stock: 100,
    rating: 4.3,
    numReviews: 256,
    features: ["Noise Cancellation", "30hr Battery", "Bluetooth 5.0", "Foldable Design"],
    condition: "new" as const,
    isPublished: true,
  },
  {
    name: "Smart Watch Pro - Fitness Tracker",
    description: "Advanced smartwatch with health monitoring features. Track your fitness goals, receive notifications, and more.",
    price: 299.00,
    discountPrice: 249.00,
    images: ["/home/smart_watches.png"],
    category: "Electronics",
    brand: "Apple",
    stock: 60,
    rating: 4.6,
    numReviews: 178,
    features: ["Heart Rate Monitor", "GPS", "Water Resistant", "7-day Battery"],
    condition: "new" as const,
    isPublished: true,
  },
  {
    name: "Gaming Laptop - High Performance",
    description: "Powerful gaming laptop with latest GPU and processor. Experience smooth gaming and multitasking.",
    price: 1599.00,
    discountPrice: 1399.00,
    images: ["/home/laptops.png"],
    category: "Electronics",
    brand: "ASUS",
    stock: 25,
    rating: 4.8,
    numReviews: 67,
    features: ["RTX 4060", "16GB RAM", "1TB SSD", "144Hz Display"],
    condition: "new" as const,
    isPublished: true,
  },
  {
    name: "Smartphone X - 5G Enabled",
    description: "Latest smartphone with 5G connectivity. Features stunning display, powerful camera, and all-day battery.",
    price: 899.00,
    discountPrice: 799.00,
    images: ["/home/smartphones.png"],
    category: "Electronics",
    brand: "Samsung",
    stock: 80,
    rating: 4.4,
    numReviews: 312,
    features: ["5G", "128GB Storage", "48MP Camera", "6.7 inch Display"],
    condition: "new" as const,
    isPublished: true,
  },
  {
    name: "T-shirt Cotton Blend - Multiple Colors",
    description: "Comfortable cotton blend t-shirt available in multiple colors. Perfect for casual wear.",
    price: 29.99,
    discountPrice: 19.99,
    images: ["/home/recom_item_1.png"],
    category: "Clothing",
    brand: "Generic",
    stock: 200,
    rating: 4.1,
    numReviews: 445,
    features: ["100% Cotton", "Machine Washable", "Multiple Colors", "Regular Fit"],
    condition: "new" as const,
    isPublished: true,
  },
  {
    name: "Denim Jeans - Classic Blue",
    description: "Classic blue denim jeans with comfortable fit. Durable and stylish for everyday wear.",
    price: 59.99,
    discountPrice: 44.99,
    images: ["/home/recom_item_2.jpg"],
    category: "Clothing",
    brand: "Levi's",
    stock: 150,
    rating: 4.3,
    numReviews: 289,
    features: ["Classic Fit", "100% Denim", "Machine Washable", "Multiple Sizes"],
    condition: "new" as const,
    isPublished: true,
  },
  {
    name: "Winter Jacket - Warm & Stylish",
    description: "Warm winter jacket with stylish design. Perfect for cold weather protection.",
    price: 149.99,
    discountPrice: 99.99,
    images: ["/home/recom_item_3.png"],
    category: "Clothing",
    brand: "North Face",
    stock: 45,
    rating: 4.5,
    numReviews: 156,
    features: ["Waterproof", "Insulated", "Multiple Pockets", "Wind Resistant"],
    condition: "new" as const,
    isPublished: true,
  },
  {
    name: "Leather Wallet - Genuine Leather",
    description: "Genuine leather wallet with multiple card slots. Elegant design for everyday use.",
    price: 79.99,
    discountPrice: 59.99,
    images: ["/home/recom_item_5.png"],
    category: "Accessories",
    brand: "Fossil",
    stock: 120,
    rating: 4.6,
    numReviews: 234,
    features: ["Genuine Leather", "8 Card Slots", "Bill Compartment", "Compact Design"],
    condition: "new" as const,
    isPublished: true,
  },
];

const adminUser = {
  name: "Admin User",
  email: "admin@brand.com",
  password: "admin123",
  role: "admin" as const,
};

async function seed() {
  try {
    console.log('Connecting to database...');
    console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Configured' : 'Not configured (using default)');
    await dbConnect();
    console.log('✅ Connected to database');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('✅ Existing data cleared');

    // Create admin user
    console.log('Creating admin user...');
    const user = await User.create(adminUser);
    console.log(`✅ Admin user created: ${user.email}`);

    // Create products
    console.log('Creating products...');
    const products = await Product.insertMany(initialProducts);
    console.log(`✅ ${products.length} products created`);

    console.log('\n🎉 Seed completed successfully!');
    console.log('\n📝 Admin credentials:');
    console.log('   Email: admin@brand.com');
    console.log('   Password: admin123');
    console.log('\n⚠️  Please change the admin password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seed failed!');
    console.error('\nError details:', error instanceof Error ? error.message : error);
    console.error('\n💡 Make sure MongoDB is running:');
    console.error('   - For local MongoDB: Check if MongoDB service is started');
    console.error('   - For MongoDB Atlas: Check your connection string in .env.local');
    console.error('\n📖 See README.md for setup instructions.');
    process.exit(1);
  }
}

seed();
