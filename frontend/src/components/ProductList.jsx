import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { user, updateCartCount } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/products/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    if (!user) {
      alert('Please log in to add items to your cart.');
      navigate('/login');
      return;
    }
    try {
      await axios.post('http://localhost:8000/cart/', { product_id: productId, quantity: 1 });
      // Update cart count in navbar
      updateCartCount();
      alert('Added to cart');
    } catch (error) {
      alert('Error adding to cart');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h1>
        <p className="text-xl text-gray-600">Discover amazing products at great prices</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10l-8-4" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900">No products available</h3>
          <p className="mt-1 text-gray-500">We're working on adding new items to our catalog.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
              {/* Product Image */}
              <div className="relative h-64 bg-gray-200 overflow-hidden">
                {product.image ? (
                  <>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image' }}
                    />
                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <svg className="mx-auto h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm">No Image</p>
                    </div>
                  </div>
                )}
                {/* Stock Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.stock_count === 0
                      ? 'bg-red-100 text-red-800'
                      : product.stock_count <= 5
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                  }`}>
                    {product.stock_count === 0 ? 'Out of Stock' : `${product.stock_count} in stock`}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {product.description || 'No description available'}
                </p>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-green-600">
                    ${product.price}
                  </span>
                  {product.stock_count > 5 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Available
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Link
                    to={`/products/${product.id}`}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-center font-medium transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Details
                  </Link>
                  {product.stock_count > 0 && (
                    <button
                      onClick={() => addToCart(product.id)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center hover:shadow-lg transform hover:scale-105"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 6M7 13l2.5 6M7 13l-2.5 6M18 13l-2.5 6M18 13l2.5-6" />
                      </svg>
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
