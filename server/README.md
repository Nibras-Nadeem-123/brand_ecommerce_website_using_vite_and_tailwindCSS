# E-commerce Backend API

Backend server for the brand e-commerce application built with Node.js, Express.js, and MongoDB.

## Directory Structure

```
server/
├── config/
│   └── db.ts          # MongoDB connection configuration
├── controllers/
│   └── productController.ts  # Product CRUD operations
├── models/
│   └── Product.ts     # Product schema definition
├── routes/
│   └── productRoutes.ts  # Product API routes
├── .env              # Environment variables
├── .env.example      # Example environment variables
├── package.json      # Dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── server.ts         # Main server entry point
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update MongoDB URI in `.env` if needed.

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (with pagination, filtering, sorting) |
| GET | `/api/products/:id` | Get single product by ID |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Query Parameters for GET /api/products

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `category` - Filter by category
- `search` - Search by name or description
- `sort` - Sort options: `price_asc`, `price_desc`, `name`, `newest`

### Example Requests

**Get all products:**
```bash
GET http://localhost:5000/api/products
```

**Get products with filters:**
```bash
GET http://localhost:5000/api/products?category=Electronics&page=1&limit=10
```

**Get single product:**
```bash
GET http://localhost:5000/api/products/507f1f77bcf86cd799439011
```

**Create product:**
```bash
POST http://localhost:5000/api/products
Content-Type: application/json

{
  "name": "Product Name",
  "price": 99.99,
  "image": "/path/to/image.jpg",
  "description": "Product description",
  "category": "Electronics",
  "stock": 100
}
```

**Update product:**
```bash
PUT http://localhost:5000/api/products/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 149.99
}
```

**Delete product:**
```bash
DELETE http://localhost:5000/api/products/:id
```

## Product Schema

```typescript
{
  _id: ObjectId,
  name: string,
  price: number,
  image: string,
  description: string,
  category: string,
  stock: number,
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/brand-ecommerce |
| NODE_ENV | Environment mode | development |

## Connecting Frontend

The frontend is already configured to use these API endpoints. Make sure the backend server is running before starting the frontend development server.

Frontend API calls will be proxied to this backend server.
