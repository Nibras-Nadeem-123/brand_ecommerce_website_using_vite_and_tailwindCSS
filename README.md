# Brand E-commerce - Full Stack Application

A complete full-stack e-commerce application built with Next.js, TailwindCSS, MongoDB, and JWT authentication.

## 🚀 Features

### Authentication
- ✅ JWT-based authentication
- ✅ User registration and login
- ✅ Password hashing with bcrypt
- ✅ Token stored in localStorage
- ✅ Protected routes (admin, cart, checkout)
- ✅ Role-based access control (user/admin)

### User Schema
```typescript
{
  name: string;
  email: string;
  password: string;      // Hashed with bcrypt
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### API Endpoints

#### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | No |
| GET | `/api/auth/me` | Get current user | Yes |

#### Products
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/products` | Get all products | No |
| GET | `/api/products/:id` | Get single product | No |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |

#### Cart
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/cart` | Get user's cart | Yes |
| POST | `/api/cart` | Add to cart | Yes |
| PUT | `/api/cart` | Update cart | Yes |
| DELETE | `/api/cart` | Remove from cart | Yes |

#### Search
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/search?q=query` | Search products |

## 📦 Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create `.env.local` in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/brand-ecommerce
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXTAUTH_URL=http://localhost:3000
DEMO_MODE=false
```

### 3. Start MongoDB
Make sure MongoDB is running:
```bash
# Local MongoDB
mongod

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. Create Admin User
```bash
npm run create-admin
# Default: admin@brand.com / admin123
```

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication Flow

### Registration
1. User fills registration form (name, email, password)
2. Frontend sends POST to `/api/auth/register`
3. Backend hashes password with bcrypt
4. Backend creates user with role: 'user'
5. Backend generates JWT token
6. Token stored in localStorage via Zustand

### Login
1. User enters email and password
2. Frontend sends POST to `/api/auth/login`
3. Backend verifies credentials
4. Backend generates JWT token
5. Token stored in localStorage
6. User redirected to home page

### Token Storage
- JWT token stored in **localStorage** via Zustand persist middleware
- Token automatically included in API requests
- Token expires after 7 days

### Protected Routes
- `/admin` - Admin only
- `/cart` - Authenticated users
- `/checkout` - Authenticated users
- `/orders` - Authenticated users

## 🛡️ Security Features

### Password Hashing
- Uses bcrypt with salt rounds: 10
- Password never stored in plain text
- Password comparison using `comparePassword()` method

### JWT Token
- Signed with secret key
- Expires in 7 days
- Contains user ID for identification
- Verified on protected API routes

### Role-Based Access
- Default role: 'user'
- Admin role required for:
  - Creating products
  - Editing products
  - Deleting products
  - Accessing admin dashboard

## 📁 Project Structure

```
src/
├── app/
│   ├── (pages)/
│   │   ├── login/          # Login page
│   │   ├── register/       # Registration page
│   │   ├── admin/          # Admin dashboard (protected)
│   │   ├── cart/           # Shopping cart
│   │   └── products/       # Products listing
│   ├── api/
│   │   ├── auth/           # Authentication APIs
│   │   ├── products/       # Product APIs
│   │   ├── cart/           # Cart APIs
│   │   └── search/         # Search API
│   └── layout.tsx          # Root layout with providers
├── context/
│   └── CartContext.tsx     # Cart state management
├── middleware/
│   └── auth.ts             # Auth middleware for APIs
├── models/
│   ├── User.ts             # User schema with bcrypt
│   ├── Product.ts          # Product schema
│   ├── Cart.ts             # Cart schema
│   └── Order.ts            # Order schema
├── store/
│   ├── authStore.ts        # Auth state (localStorage)
│   └── cartStore.ts        # Cart state
└── middleware.ts           # Route protection middleware
```

## 🧪 Usage

### Register a New User
1. Go to `/register`
2. Fill in name, email, password
3. Click "Sign up"
4. Automatically logged in and redirected to home

### Login
1. Go to `/login`
2. Enter email and password
3. Click "Sign in"
4. Redirected to home page

### Create Admin User
```bash
# Using default credentials
npm run create-admin

# Custom credentials
npm run create-admin myemail@example.com mypassword
```

### Access Admin Dashboard
1. Login with admin credentials
2. Click "Admin" link in header
3. Access `/admin` dashboard
4. Manage products (CRUD operations)

## 🔒 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/brand-ecommerce` |
| `JWT_SECRET` | Secret key for JWT signing | `your-fallback-secret` |
| `NEXTAUTH_SECRET` | NextAuth secret | Required |
| `NEXTAUTH_URL` | App URL | `http://localhost:3000` |
| `DEMO_MODE` | Enable demo mode | `false` |

## 📝 Notes

- **Change default admin password** after first login
- **Use strong JWT_SECRET** in production
- **Enable HTTPS** in production for secure cookies
- **MongoDB required** for authentication to work
- **Token expires** after 7 days (re-login required)

## 🚨 Important Security Notes

1. **Never commit `.env.local`** to version control
2. **Change JWT_SECRET** to a strong random string in production
3. **Use HTTPS** in production
4. **Implement rate limiting** for auth endpoints
5. **Add email verification** for production
6. **Implement password reset** functionality

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TailwindCSS, Zustand
- **Backend**: Next.js API Routes
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **State Management**: Zustand with localStorage persistence
