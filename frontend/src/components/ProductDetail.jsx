import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user, updateCartCount } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = async (quantity) => {
    if (!user) {
      alert('Please log in to add items to your cart.');
      navigate('/login');
      return;
    }
    try {
      await axios.post('http://localhost:8000/cart/', { product_id: parseInt(id), quantity });
      // Update cart count in navbar
      updateCartCount();
      alert('Added to cart');
    } catch (error) {
      alert('Error adding to cart');
    }
  };

  if (!product) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading product...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="lg:grid lg:grid-cols-2">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-t-2xl lg:rounded-l-2xl lg:rounded-t-none overflow-hidden">
                {product.image ? (
                  <>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-center object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/600x600?text=No+Image' }}
                    />
                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <svg className="mx-auto h-24 w-24 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-2xl font-medium">No Image</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Stock Badge */}
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
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
            <div className="p-8 lg:p-12">
              <div className="lg:col-span-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

                {/* Rating Placeholder */}
                <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600 text-sm">(4.5) • 25 reviews</span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <p className="text-4xl font-bold text-green-600">${product.price}</p>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description || 'This is a high-quality product with excellent features and great value for money. Perfect for daily use and built to last.'}
                  </p>
                </div>

                {/* Key Features */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      High-quality materials
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Easy to use
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Long-lasting performance
                    </li>
                  </ul>
                </div>

                {/* Add to Cart */}
                <div className="mb-8">
                  {product.stock_count === 0 ? (
                    <div className="inline-flex items-center px-6 py-3 bg-red-100 text-red-800 rounded-lg font-medium">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Out of Stock
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(1)}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center hover:shadow-xl transform hover:scale-105"
                    >
                      <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 6M7 13l2.5 6M7 13l-2.5 6M18 13l-2.5 6M18 13l2.5-6" />
                      </svg>
                      Add to Cart
                    </button>
                  )}
                </div>

                {/* Additional Info */}
                <div className="border-t pt-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <svg className="w-6 h-6 mx-auto text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10l-8-4" />
                      </svg>
                      <p className="text-xs text-gray-500">Free Delivery</p>
                    </div>
                    <div>
                      <svg className="w-6 h-6 mx-auto text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      <p className="text-xs text-gray-500">30-Day Returns</p>
                    </div>
                    <div>
                      <svg className="w-6 h-6 mx-auto text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xs text-gray-500">2-Year Warranty</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
