# Amazon Clone - E-Commerce Application

A full-stack e-commerce web application built with React.js (Vite), Node.js (Express), and MySQL. This project replicates Amazon's design and core functionality while serving as a learning resource for modern web development.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Features](#features)
- [Assumptions](#assumptions)
- [Future Enhancements](#future-enhancements)

---

## 🎯 Project Overview

This e-commerce application provides:

- **Product Browsing**: Browse and search products with category filtering
- **Shopping Cart**: Add/remove items, manage quantities
- **Checkout System**: Secure order placement with shipping information
- **Order Management**: Order confirmation and tracking
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### Current Status
- ✅ Backend API fully implemented
- ✅ Frontend pages completed (Home, Products, Cart, Checkout, OrderSuccess)
- ✅ Database schema designed
- ✅ Context API for state management
- ✅ Session-based cart management

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React.js 19
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Material-UI (MUI)
- **HTTP Client**: Axios
- **Router**: React Router v7
- **Icons**: React Icons, MUI Icons

### Backend
- **Runtime**: Node.js
- **Server**: Express.js
- **Database**: MySQL 8.0+
- **Connection Pool**: mysql2/promise
- **Environment**: dotenv

### Database
- **DBMS**: MySQL
- **Tables**: 8 (Products, Cart, Orders, Images, Specifications, Users)
- **Relationships**: Foreign keys with cascading deletes

---

## 📁 Project Structure

```
amazon2/
│
├── frontend/ (root directory for simplicity)
│   ├── src/
│   │   ├── Components/                 # Reusable UI components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── NavBar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ...
│   │   │
│   │   ├── Pages/                      # Main pages
│   │   │   ├── Home.jsx               # Landing page
│   │   │   ├── ProductPage.jsx        # Product listing
│   │   │   ├── ProductPaga.jsx        # Product detail
│   │   │   ├── CartPage.jsx           # Shopping cart
│   │   │   ├── Checkout.jsx           # Checkout form
│   │   │   └── OrderSuccess.jsx       # Order confirmation
│   │   │
│   │   ├── Services/                   # API service layer
│   │   │   ├── apiClient.js           # Axios configuration
│   │   │   ├── productService.js      # Product APIs
│   │   │   ├── cartService.js         # Cart APIs
│   │   │   └── orderService.js        # Order APIs
│   │   │
│   │   ├── ContextApi/                 # State management
│   │   │   ├── Context.jsx            # Provider setup
│   │   │   └── CartContext.jsx        # Cart context
│   │   │
│   │   ├── Data/                       # Mock data (to be removed)
│   │   │   ├── data.js
│   │   │   ├── ProductDetail.js
│   │   │   └── ...
│   │   │
│   │   ├── assets/                     # Static files
│   │   │   ├── Banner/
│   │   │   ├── ProductImage/
│   │   │   └── ...
│   │   │
│   │   └── App.jsx                     # Root component
│   │
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── .env                            # Environment variables
│   └── tailwind.config.js
│
├── backend/
│   ├── config/
│   │   └── db.js                       # Database connection pool
│   │
│   ├── controllers/
│   │   ├── productController.js        # Product business logic
│   │   ├── cartController.js          # Cart business logic
│   │   └── orderController.js         # Order business logic
│   │
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   │
│   ├── middleware/
│   │   └── errorHandler.js            # Error handling & CORS
│   │
│   ├── utils/
│   │   └── helpers.js                 # Utility functions
│   │
│   ├── app.js                          # Express app configuration
│   ├── server.js                       # Server entry point
│   ├── package.json
│   ├── .env.example
│   └── node_modules/
│
├── database_schema.sql                 # Complete database schema
├── README.md                           # This file
└── .env                                # Frontend environment variables

```

---

## 🗄️ Database Schema

### Tables Overview

| Table | Purpose | Relationships |
|-------|---------|---------------|
| **products** | Core product information | 1-to-many with product_images, product_specifications |
| **product_images** | Multiple images per product | Many-to-one with products |
| **product_specifications** | Product specs (color, size) | Many-to-one with products |
| **carts** | Shopping cart headers | 1-to-many with cart_items |
| **cart_items** | Items in each cart | Many-to-one with carts & products |
| **orders** | Completed orders | 1-to-many with order_items |
| **order_items** | Line items in orders | Many-to-one with orders |
| **users** | User accounts (future use) | Ready for authentication |

See `database_schema.sql` for complete SQL definitions.

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server (v8.0 or higher)
- npm or yarn

### Step 1: Clone/Setup Project
```bash
cd d:\amazon2
```

### Step 2: Setup Database

1. **Open MySQL Client**:
   ```bash
   mysql -u root -p
   ```

2. **Run the schema file**:
   ```bash
   SOURCE database_schema.sql;
   ```

3. **Verify database creation**:
   ```sql
   SHOW DATABASES;
   USE amazon_clone;
   SHOW TABLES;
   ```

### Step 3: Setup Backend

1. **Navigate to backend folder**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create `.env` file** (copy from `.env.example`):
   ```
   PORT=5000
   NODE_ENV=development
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=root
   DB_NAME=amazon_clone
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start backend server**:
   ```bash
   npm run dev
   ```

   ✅ Backend running at: `http://localhost:5000`

### Step 4: Setup Frontend

1. **Navigate to frontend folder**:
   ```bash
   cd ../
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **.env is already configured** with:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

   ✅ Frontend running at: `http://localhost:5173`

### Step 5: Access Application

- **Website**: http://localhost:5173
- **API Docs**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

---

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api`

#### Product Endpoints

```
GET    /products                    # Get all products with pagination
GET    /products/:id               # Get product by ID
GET    /products/category/:name    # Get products by category
GET    /products/search?query=...  # Search products
```

#### Cart Endpoints

```
GET    /cart                       # Get cart items
POST   /cart                       # Add item to cart
PUT    /cart/:cartItemId          # Update cart item quantity
DELETE /cart/:cartItemId          # Remove item from cart
DELETE /cart                       # Clear entire cart
```

#### Order Endpoints

```
POST   /orders                     # Create order
GET    /orders                     # Get orders by session
GET    /orders/:orderId           # Get order by ID
GET    /orders/number/:orderNumber # Get order by number
```

See `backend/routes` for detailed request/response examples.

---

## ✨ Features

### Implemented ✅
- Product listing with pagination
- Product search & filtering
- Product detail page with gallery
- Add to cart functionality
- Shopping cart management
- Checkout form with validation
- Order placement & confirmation
- Session-based persistence
- Responsive design (mobile/tablet/desktop)
- Error handling & validation

### Ready for Future Development 🔄
- User authentication (Login/Signup)
- User accounts & profiles
- Order history
- Wishlist functionality
- Product reviews & ratings
- Payment gateway integration
- Email notifications
- Admin dashboard

---

## 📋 Assumptions

1. **Session-Based Cart**: `user_id` is stored in localStorage and used for cart identification
2. **No Real Payments**: Demo payment methods accepted without actual processing
3. **Free Shipping**: All orders have free shipping
4. **Stock Checking**: Stock validated during cart/order operations
5. **Connection Pooling**: Uses mysql2/promise for optimal database performance
6. **CORS Enabled**: Backend accepts requests from configured frontend URL

---

## 🧹 Cleanup: Removing Mock Data

### Files Using Mock Data

The following files contain hardcoded test data and can be removed after verifying backend integration:

```
src/Data/data.js
src/Data/ProductDetail.js
src/Data/ProductPageDetail.js
src/Data/SliderDetail.js
src/Details/OfferDetail.js
```

### Components That Need Migration

These components should be updated to use the Service layer instead of mock data:

1. **src/Pages/Home.jsx** → Use `productService.fetchProducts()`
2. **src/Pages/ProductPaga.jsx** → Use `productService.fetchProductById()`
3. **src/Components/ProductSlider.jsx** → Use API calls instead of imports

### Steps to Clean Up

```bash
# 1. Remove mock data files
rm src/Data/data.js
rm src/Data/ProductDetail.js
rm src/Data/ProductPageDetail.js
rm src/Data/SliderDetail.js
rm src/Details/OfferDetail.js

# 2. Update components to use Services
# Edit src/Pages/Home.jsx, ProductPaga.jsx, etc.
# Replace imports with useEffect hooks calling Services

# 3. Test thoroughly
npm run dev
```

---

## 📞 Troubleshooting

| Issue | Solution |
|-------|----------|
| Database connection error | Ensure MySQL is running. Check credentials in `.env` |
| CORS error | Verify `FRONTEND_URL` in backend `.env` matches frontend URL |
| Port already in use | Change `PORT` in `.env` or kill existing process |
| Module not found | Run `npm install` in the affected folder |
| Session not persisting | Check localStorage in browser settings |

---

## 🚀 Performance Optimizations

- ✅ Database connection pooling
- ✅ Pagination for large product lists
- ✅ Indexed database queries
- ✅ Reusable React components
- ✅ Lazy loading for images
- ✅ Efficient state management

---

## 🔒 Security Features

- ✅ Parameterized SQL queries (SQL injection prevention)
- ✅ Input validation on backend
- ✅ CORS configuration
- ✅ Error message sanitization
- ✅ Stock verification before orders

---

## 📚 Learning Resources

This project demonstrates:
- Full-stack web development with React & Node.js
- RESTful API design
- Database design & relationships
- State management with Context API
- Component-based architecture
- Error handling & validation
- Responsive web design

---

**Version**: 1.0.0 | **Last Updated**: January 2024

