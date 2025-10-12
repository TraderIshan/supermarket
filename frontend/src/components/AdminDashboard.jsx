import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({});
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    stock_count: '',
    category_id: 1
  });

  useEffect(() => {
    if (user?.is_admin) {
      const fetchDashboard = async () => {
        try {
          const response = await axios.get('http://localhost:8000/admin/dashboard');
          setDashboardData(response.data);
        } catch (error) {
          console.error('Error fetching dashboard:', error);
        }
      };
      fetchDashboard();
    }
  }, [user]);

  const handleAddProduct = async () => {
    try {
      await axios.post('http://localhost:8000/products/', newProduct);
      alert('Product added!');
      setNewProduct({ name: '', price: '', description: '', stock_count: '', category_id: 1 });
      // Refresh dashboard
      const response = await axios.get('http://localhost:8000/admin/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      alert('Error adding product');
    }
  };

  const handleRestock = async (productId, stock) => {
    try {
      await axios.put(`http://localhost:8000/admin/products/${productId}/restock`, { stock });
      alert('Restocked!');
      // Refresh dashboard
      const response = await axios.get('http://localhost:8000/admin/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      alert('Error restocking');
    }
  };

  if (!user?.is_admin) {
    return <div className="text-center py-8">Access denied.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-100 p-4 rounded">
          <h3 className="text-lg font-semibold">Total Sales</h3>
          <p className="text-2xl font-bold">${dashboardData.total_sales}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-2xl font-bold">{dashboardData.total_products}</p>
        </div>
        <div className="bg-red-100 p-4 rounded">
          <h3 className="text-lg font-semibold">Low Stock Products</h3>
          <p className="text-2xl font-bold">{dashboardData.low_stock_products?.length}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Low Stock Products</h3>
        {dashboardData.low_stock_products?.map((product) => (
          <div key={product.id} className="flex justify-between items-center border py-2 px-4 mb-2">
            <span>{product.name} (Stock: {product.stock})</span>
            <input
              type="number"
              min="1"
              placeholder="Quantity"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const qty = parseInt(e.target.value);
                  if (qty > 0) {
                    handleRestock(product.id, qty);
                  }
                }
              }}
              className="border px-2 py-1 w-20"
            />
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
        {dashboardData.recent_orders?.map((order) => (
          <div key={order.id} className="border rounded p-4 mb-4">
            <p><strong>Order #{order.id}</strong> - {order.user_email} - ${order.total_amount} - {order.status}</p>
            <p className="text-gray-600">{order.created_at}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="border p-2"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="border p-2"
          />
          <input
            type="number"
            placeholder="Stock Count"
            value={newProduct.stock_count}
            onChange={(e) => setNewProduct({ ...newProduct, stock_count: e.target.value })}
            className="border p-2"
          />
          <input
            type="number"
            placeholder="Category ID"
            value={newProduct.category_id}
            onChange={(e) => setNewProduct({ ...newProduct, category_id: parseInt(e.target.value) })}
            className="border p-2"
          />
        </div>
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="border p-2 w-full mb-4"
        ></textarea>
        <button onClick={handleAddProduct} className="bg-green-600 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
