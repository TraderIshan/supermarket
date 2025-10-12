-- Sample Data for Supermarket Web App
-- Run this after creating the database and tables using database_schema.sql

USE supermarket_db;

-- Insert Sample Categories
INSERT INTO categories (name, description) VALUES
('Electronics', 'Gadgets and electronic devices'),
('Groceries', 'Fresh produce and pantry staples'),
('Home & Kitchen', 'Appliances and home essentials'),
('Books', 'Fiction and non-fiction books'),
('Apparel', 'Clothing and accessories');

-- Insert Sample Products (10 products)
INSERT INTO products (name, price, description, image, stock_count, category_id) VALUES
('Laptop Pro', 1200.00, 'High-performance laptop for professionals', 'https://images.pexels.com/photos/18105/pexels-photo.jpg', 15, 1),
('Wireless Headphones', 75.50, 'Noise-cancelling over-ear headphones', 'https://images.pexels.com/photos/815494/pexels-photo-815494.jpeg', 50, 1),
('Organic Apples (1kg)', 3.99, 'Fresh, organic and juicy apples', 'https://images.pexels.com/photos/209439/pexels-photo-209439.jpeg', 100, 2),
('Whole Wheat Bread', 2.49, 'Healthy whole wheat bread', 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg', 70, 2),
('Coffee Maker', 45.00, 'Automatic drip coffee maker', 'https://images.pexels.com/photos/9743262/pexels-photo-9743262.jpeg', 20, 3),
('Blender Pro', 89.99, 'High-speed blender for smoothies', 'https://images.pexels.com/photos/1797103/pexels-photo-1797103.jpeg', 10, 3),
('The Great Novel', 15.99, 'A captivating fiction novel', 'https://images.pexels.com/photos/207636/pexels-photo-207636.jpeg', 30, 4),
('Python Programming Guide', 29.99, 'Comprehensive guide for Python developers', 'https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg', 25, 4),
('T-Shirt Casual', 19.99, 'Comfortable cotton t-shirt', 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg', 80, 5),
('Denim Jeans', 59.99, 'Classic blue denim jeans', 'https://images.pexels.com/photos/1235692/pexels-photo-1235692.jpeg', 40, 5);

-- Update an existing user to be an admin (replace 'user@example.com' with an actual registered user's email)
-- UPDATE users SET is_admin = TRUE WHERE email = 'your_registered_user_email@example.com';
