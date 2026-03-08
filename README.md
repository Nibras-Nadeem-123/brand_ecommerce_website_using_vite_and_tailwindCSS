# Brand E-commerce Website - Full Stack

A full-stack e-commerce application built with Next.js, TailwindCSS, and MongoDB.

## Tech Stack

### Frontend
- **Next.js** - React framework with App Router
- **TailwindCSS** - Utility-first CSS framework
- **Zustand** - State management
- **React Icons** - Icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Features

- ✅ Dynamic products with CRUD operations
- ✅ Product details page
- ✅ Shopping cart system
- ✅ Search functionality
- ✅ User authentication (login/register)
- ✅ Admin dashboard for product management
- ✅ MongoDB integration
- ✅ Responsive design (existing UI preserved)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas connection string

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/brand-ecommerce
   NEXTAUTH_SECRET=your-secret-key-change-this-in-production
   NEXTAUTH_URL=http://localhost:3000
   JWT_SECRET=your-jwt-secret-key-change-this-in-production
   ```

3. **Seed the database:**
   ```bash
   npm run seed
   ```
   
   This will create:
   - An admin user (email: `admin@brand.com`, password: `admin123`)
   - Sample products

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── (pages)/
│   │   ├── [cart]/          - Shopping cart page
│   │   ├── products/
│   │   │   ├── [id]/        - Product details page
│   │   │   └── page.tsx     - Products listing page
│   │   ├── login/           - Login page
│   │   ├── register/        - Registration page
│   │   └── admin/           - Admin dashboard
│   ├── api/
│   │   ├── products/        - Products API routes
│   │   ├── auth/            - Authentication API routes
│   │   ├── cart/            - Cart API routes
│   │   ├── orders/          - Orders API routes
│   │   └── search/          - Search API route
│   ├── layout.tsx           - Root layout
│   └── page.tsx             - Home page
├── components/
│   ├── header/              - Header components
│   ├── footer/              - Footer components
│   └── home/                - Home page components
├── lib/
│   └── mongodb.ts           - MongoDB connection utility
├── models/
│   ├── User.ts              - User model
│   ├── Product.ts           - Product model
│   ├── Cart.ts              - Cart model
│   └── Order.ts             - Order model
├── middleware/
│   └── auth.ts              - Authentication middleware
└── store/
    ├── authStore.ts         - Auth state management
    └── cartStore.ts         - Cart state management
```

## API Endpoints

### Products
- `GET /api/products` - Get all products (with filtering, sorting, pagination)
- `GET /api/products/[id]` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/[id]` - Update product (Admin only)
- `DELETE /api/products/[id]` - Delete product (Admin only)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart` - Update cart item quantity
- `DELETE /api/cart` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get single order
- `PUT /api/orders/[id]` - Update order

### Search
- `GET /api/search?q=query` - Search products

## Admin Access

After running the seed script:
- **Email:** admin@brand.com
- **Password:** admin123

⚠️ **Important:** Change the admin password after first login!

Access the admin dashboard at: `/admin`

## User Features

- Browse products by category
- Search products
- Filter by price, brand, features
- Add products to cart
- Update cart quantities
- User registration and login
- View product details

## Admin Features

- View all products
- Add new products
- Edit existing products
- Delete products
- View product statistics
- Manage product inventory

## Notes

- The existing UI design and TailwindCSS classes have been preserved
- Only functionality, routing, API integration, and backend logic have been added
- All components maintain their original TSX structure
