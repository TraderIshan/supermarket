# Supermarket Full-Stack Web App

A full-stack e-commerce application built with React, TailwindCSS, FastAPI, and MySQL.

## Features

### Backend (FastAPI)
- User authentication with JWT
- Product management (CRUD)
- Shopping cart
- Order processing and payment simulation
- Admin dashboard with sales analytics
- Automatic stock reduction on purchase
- MySQL database with SQLAlchemy

### Frontend (React)
- User registration and login
- Product browsing and search
- Shopping cart management
- Checkout process
- Order history
- Responsive design with TailwindCSS

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS, React Router, Axios
- **Backend**: FastAPI, SQLAlchemy, MySQL (via pymysql), JWT
- **Database**: MySQL (via XAMPP)

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

### 2. Set up MySQL Database
1. Start XAMPP control panel
2. Start MySQL server
3. Open phpMyAdmin (http://localhost/phpmyadmin)
4. Create database: Run the contents of `database_schema.sql`

### 3. Backend Setup
```bash
cd backend
pip install -r requirements.txt
```

**Note**: Update `backend/database.py` with your MySQL credentials if needed.

```python
DATABASE_URL = "mysql+pymysql://username:password@localhost/supermarket_db"
```

Run the backend:
```bash
uvicorn main:app --reload
```

Visit http://127.0.0.1:8000/docs for API documentation.

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:5173 for the React app.

### 5. Create Admin User
In phpMyAdmin, manually set a user as admin:
```sql
UPDATE users SET is_admin = TRUE WHERE email = 'admin@example.com';
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

The app supports real-time stock updates after checkout, automatic cart clearance, and modular backend with well-commented code.
