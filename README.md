# 🏪 MarketHub - Premium Supermarket Web App

A production-ready, full-stack e-commerce supermarket application built with modern technologies and enterprise-grade UI/UX.

## ✨ **Key Highlights**

🎨 **Professional UI/UX** - Beautiful, responsive design with gradients, shadows, and smooth animations  
⚡ **Real-time Updates** - Live cart count, instant stock updates, and reactive interface  
🔐 **Secure Authentication** - JWT-based auth with role-based access (User/Admin)  
📱 **Mobile-First** - Fully responsive across all devices  
🛒 **Complete E-commerce** - From browsing to checkout with order tracking  
📊 **Admin Analytics** - Comprehensive dashboard with sales metrics and inventory management

## 📋 **Features**

### 🛒 **Customer Features**
- ✅ **User Registration & Login** - Secure authentication with JWT tokens
- ✅ **Product Catalog** - Beautifully organized product showcase with images
- ✅ **Advanced Product Search** - Filter and find products instantly
- ✅ **Product Details** - Detailed product pages with specifications
- ✅ **Intelligent Shopping Cart** - Add/remove/update quantities with real-time count badge
- ✅ **Real-time Cart Updates** - Live synchronization across components
- ✅ **Multi-step Checkout** - Professional checkout flow with order summary
- ✅ **Order History** - Complete purchase history with detailed item lists
- ✅ **Stock Management** - Real-time inventory tracking and "Out of Stock" indicators
- ✅ **Responsive Design** - Perfect experience on desktop, tablet, and mobile

### 👨‍💼 **Admin Features**
- ✅ **Dashboard Analytics** - Sales metrics, revenue charts, and performance insights
- ✅ **Product Management** - Full CRUD operations for inventory management
- ✅ **Stock Control** - Automatic stock reduction and low-stock alerts
- ✅ **Order Tracking** - View all customer orders and processing status
- ✅ **Revenue Analytics** - Monthly sales totals and trend analysis
- ✅ **User Management** - Monitor user registrations and activity

### 🔧 **Technical Features**
- ✅ **RESTful API** - Comprehensive FastAPI backend with OpenAPI documentation
- ✅ **Database Relationships** - Optimized MySQL schema with foreign keys
- ✅ **JWT Authentication** - Secure token-based authentication system
- ✅ **Context State Management** - Global cart count and user state
- ✅ **Error Handling** - Comprehensive error boundaries and fallbacks
- ✅ **Performance Optimized** - Efficient queries and responsive components

## 🛠️ **Tech Stack**

### **Frontend**
- ⚛️ **React 18** - Component-based UI with Hooks
- 🎨 **TailwindCSS** - Utility-first styling with custom gradients
- 🚀 **Vite** - Fast build tool and development server
- 🧩 **React Router** - Client-side routing with protected routes
- 📡 **Axios** - HTTP client with request/response interceptors
- 🏗️ **Context API** - State management for authentication and cart

### **Backend**
- ⚡ **FastAPI** - High-performance async API framework (Python)
- 🗄️ **SQLAlchemy** - ORM with MySQL integration
- 🔒 **FastAPI-JWT-Auth** - JWT token authentication
- 🐬 **MySQL** - Reliable relational database
- 📊 **Pandas** - Data processing for analytics

### **Development & DevOps**
- 📦 **npm** - Frontend dependency management
- 🐍 **pip** - Backend dependency management
- 🐳 **XAMPP** - Local development environment
- 🔨 **ESLint** - JavaScript/TypeScript linting
- 📝 **Prettier** - Code formatting

## Setup Instructions

### Prerequisites
- Node.js and npm
- Python 3.8+
- XAMPP (for MySQL server)
- Git

### 1. Clone the repository
```bash
git clone <repository-url>
cd supermarket
```

## 📁 **Project Structure**

```
supermarket/
├── 📁 backend/                      # FastAPI Backend
│   ├── main.py                     # FastAPI application entry point
│   ├── database.py                 # Database connection & configuration
│   ├── models.py                   # SQLAlchemy models (User, Product, Cart, Order)
│   ├── requirements.txt            # Python dependencies
│   └── 📁 routers/                 # API route handlers
│       ├── auth.py                # Authentication endpoints
│       ├── products.py            # Product CRUD operations
│       ├── cart.py                # Shopping cart management
│       ├── orders.py              # Order processing & history
│       └── admin.py               # Admin dashboard & analytics
├── 📁 frontend/                    # React Frontend
│   ├── 📁 public/                  # Static assets
│   ├── 📁 src/                     # Source code
│   │   ├── App.jsx                # Main application component
│   │   ├── main.jsx               # React entry point
│   │   ├── index.css              # Global styles & TailwindCSS
│   │   ├── 📁 components/          # React components
│   │   │   ├── Navbar.jsx         # Navigation bar with cart
│   │   │   ├── ProductList.jsx    # Product catalog
│   │   │   ├── ProductDetail.jsx  # Individual product page
│   │   │   ├── Cart.jsx           # Shopping cart
│   │   │   ├── Checkout.jsx       # Checkout process
│   │   │   ├── OrderHistory.jsx   # Order tracking
│   │   │   ├── Login.jsx          # Authentication login
│   │   │   ├── Register.jsx       # User registration
│   │   │   ├── Profile.jsx        # User profile management
│   │   │   ├── AdminDashboard.jsx # Admin panel
│   │   │   └── Footer.jsx         # Site footer
│   │   └── 📁 context/            # React Context providers
│   │       └── AuthContext.jsx    # Authentication & cart state
│   ├── package.json               # Node dependencies
│   ├── vite.config.js            # Vite configuration
│   └── index.html                # HTML template
├── database_schema.sql            # MySQL database schema
├── insert_sample_data.sql         # Sample data for testing
└── README.md                     # Project documentation
```

---

## 🛠️ **Installation & Setup**

### 🔧 **Prerequisites**
- ✅ Node.js 16+ and npm
- ✅ Python 3.8+ and pip
- ✅ MySQL (via XAMPP or standalone)
- ✅ Git for version control

### 📦 **1. Clone Repository**
```bash
git clone https://github.com/mrithip/supermarket.git
cd supermarket
```

### 🗄️ **2. Database Setup**
1. **Start XAMPP Services:**
   ```bash
   # Open XAMPP control panel and start:
   # ✓ Apache (for phpMyAdmin web interface)
   # ✓ MySQL (database server)
   ```

2. **Create Database:**
   - Open **phpMyAdmin** at `http://localhost/phpmyadmin`
   - Create new database: `supermarket_db`
   - Select the database and go to **Import** tab
   - Upload and import `database_schema.sql`
   - Upload and import `insert_sample_data.sql`

3. **Verify Database:**
   ```sql
   -- Check tables created
   SHOW TABLES;
   -- Expected tables: users, products, cart, orders, order_items, categories
   ```

### 🔧 **3. Backend Setup**

1. **Install Dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Configure Database:**
   Update `backend/database.py` with your MySQL credentials:
   ```python
   DATABASE_URL = "mysql+pymysql://root:@localhost/supermarket_db"
   ```

3. **Start Backend Server:**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

4. **API Documentation:**
   - 🌐 **Interactive API Docs**: `http://localhost:8000/docs`
   - 📖 **Alternative Docs**: `http://localhost:8000/redoc`
   - 🔗 **OpenAPI JSON**: `http://localhost:8000/openapi.json`

### 🎨 **4. Frontend Setup**

1. **Install Dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```

3. **Access Application:**
   - 🌐 **MarketHub**: `http://localhost:5173`
   - 📚 **API Docs**: `http://localhost:8000/docs`

### 👑 **5. Admin Setup**

Create an admin user by updating the database:
```sql
-- In phpMyAdmin, run this query:
UPDATE users SET is_admin = TRUE WHERE email = 'your-admin-email@example.com';
```

**Sample Admin Credentials:**
- **Email**: `admin@markethub.com`
- **Password**: `admin123`

---

## 📚 **API Documentation**

### 🔐 **Authentication Endpoints**

| Method | Endpoint | Description | Headers |
|--------|----------|-------------|---------|
| POST | `/auth/register` | User registration | Content-Type: application/json |
| POST | `/auth/login` | User login (JWT) | Content-Type: application/json |

### 📦 **Product Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/products` | List all products | No |
| GET | `/products/{id}` | Get product details | No |
| POST | `/products` | Create product | Admin only |
| PUT | `/products/{id}` | Update product | Admin only |
| DELETE | `/products/{id}` | Delete product | Admin only |

### 🛒 **Cart Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/cart` | Get cart items | Yes |
| POST | `/cart` | Add to cart | Yes |
| PUT | `/cart/{item_id}` | Update quantity | Yes |
| DELETE | `/cart/{item_id}` | Remove from cart | Yes |

### 📋 **Order Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/orders` | Get user orders | Yes |
| POST | `/orders/checkout` | Process checkout | Yes |
| POST | `/orders/simulate-payment` | Simulate payment | Yes |

### 👨‍💼 **Admin Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/admin/dashboard` | Admin dashboard | Admin only |
| GET | `/admin/products` | Product analytics | Admin only |
| GET | `/admin/orders` | Order analytics | Admin only |

### 📋 **Example API Usage**

#### Register User
```bash
curl -X POST "http://localhost:8000/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

#### Add Product to Cart
```bash
curl -X POST "http://localhost:8000/cart" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"product_id": 1, "quantity": 2}'
```

#### Checkout Cart
```bash
curl -X POST "http://localhost:8000/orders/checkout" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"items": [{"product_id": 1, "quantity": 2, "price": 29.99}]}'
```

**API Endpoints Example:**

- `POST /auth/register` - Register user
- `POST /auth/login` - Login user
- `GET /products` - Get all products
- `POST /products` (admin) - Add product
- `GET /cart` - Get cart items
- `POST /cart` - Add to cart
- `POST /orders/checkout` - Checkout cart
- `GET /orders` - Get order history
- `GET /admin/dashboard` - Admin dashboard (admin only)

**Example API Responses:**

- Products: `[{"id": 1, "name": "Apple", "price": 2.5, "stock_count": 100, "category_id": 1}]`
- Cart: `[{"id": 1, "product_id": 1, "quantity": 2, "product_name": "Apple", "product_price": 2.5}]`
- Orders: `[{"id": 1, "total_amount": 25.0, "status": "paid", "created_at": "2025-01-01T10:00:00", "order_items": [...]}]`

---

## 🚀 **Deployment Guide**

### **Production Deployment Options**

#### **Option 1: Vercel + Railway (Recommended)**
1. **Frontend (Vercel):**
   ```bash
   # Deploy frontend
   vercel --prod
   ```

2. **Backend (Railway):**
   - Connect GitHub to Railway
   - Auto-deploy from main branch
   - Set environment variables

#### **Option 2: Docker + Cloud**
```dockerfile
# Dockerfile for production
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### **Environment Variables**
```bash
# Backend (.env)
DATABASE_URL=mysql+pymysql://user:pass@host:port/db
JWT_SECRET_KEY=your-secret-key
FRONTEND_URL=https://yourdomain.com

# Frontend (.env.production)
VITE_API_URL=https://your-api-domain.com
```

---

## 🐛 **Troubleshooting**

### **Common Issues**

#### **Database Connection Issues**
```bash
# Check MySQL service
sudo systemctl status mysql

# Test database connection
python3 -c "import mysql.connector; print('Connection successful')"
```

#### **Frontend Not Loading**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### **CORS Issues**
```bash
# Check backend CORS settings in main.py
# Ensure frontend URL is allowed
```

### **Debug Commands**

#### **Backend Logs**
```bash
cd backend
python3 -m uvicorn main:app --reload --log-level debug
```

#### **Frontend Logs**
```bash
cd frontend
npm run dev
# Check browser developer tools console
```

#### **Database Logs**
```bash
# Check MySQL logs
tail -f /var/log/mysql/error.log
```

---

## 🤝 **Contributing**

We welcome contributions! Please follow these steps:

### **Development Workflow**
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Code Standards**
- 🔍 **ESLint** for JavaScript/React
- 🔍 **Black** for Python formatting
- 📝 **Descriptive commit messages**
- 🧪 **Test your changes** before submitting

### **Commit Message Guidelines**
```
✨ feat: Add new payment method
🐛 fix: Resolve cart update bug
📚 docs: Update API documentation
🎨 style: Improve UI components
♻️ refactor: Optimize database queries
```

---

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Credits & Acknowledgments**

- ⚛️ **React** - For the amazing frontend framework
- ⚡ **FastAPI** - For the blazing-fast backend API
- 🎨 **TailwindCSS** - For the beautiful utility-first styling
- 🗄️ **SQLAlchemy** - For the excellent ORM
- 🔒 **JWT** - For secure authentication
