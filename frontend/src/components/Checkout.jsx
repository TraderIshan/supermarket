import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const { updateCartCount } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:8000/cart/');
        setCartItems(response.data);
        const totalAmount = response.data.reduce((sum, item) => sum + item.quantity * item.product_price, 0);
        setTotal(totalAmount);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, []);

  const handleCheckout = async () => {
    try {
      const orderItems = cartItems.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product_price,
      }));
      await axios.post('http://localhost:8000/orders/checkout', { items: orderItems });
      // Update cart count after order (cart gets cleared)
      updateCartCount();
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      alert('Checkout failed: ' + (error.response?.data?.detail || 'Unknown error'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Indicator */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center">
            {/* Step 1: Cart */}
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">
                <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">Shopping Cart</span>
            </div>
            <div className="ml-4 mr-4">
              <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Step 2: Checkout */}
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                <span className="text-white text-sm font-medium">2</span>
              </div>
              <span className="ml-2 text-sm font-medium text-blue-600">Checkout</span>
            </div>
            <div className="ml-4 mr-4">
              <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Step 3: Complete */}
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
                <span className="text-gray-500 text-sm font-medium">3</span>
              </div>
              <span className="ml-2 text-sm text-gray-500">Complete</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Method */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-8 h-8 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Payment Method
              </h3>

              <div className="space-y-4">
                {/* Payment Options */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button className="flex items-center p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
                    <svg className="w-6 h-6 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span className="text-sm font-medium">Credit Card</span>
                  </button>
                  <button className="flex items-center p-4 border-2 border-gray-200 rounded-lg">
                    <svg className="w-6 h-6 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span className="text-sm font-medium text-gray-500">PayPal</span>
                  </button>
                </div>

                {/* Card Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-12"
                    />
                    <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.25 8.25h19.5M2.25 12h19.5m-16.5 5.25h12.75"/>
                    </svg>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                  <input
                    type="text"
                    placeholder="John Smith"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Security Notice */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex">
                    <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm text-yellow-800">
                      <strong>Secure Payment:</strong> This is a demo checkout. No real payment processing occurs.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-8 h-8 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Billing Address
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 md:col-span-2"
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 md:col-span-2"
                />
                <input
                  type="text"
                  placeholder="City"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="ZIP Code"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-8 h-8 text-purple-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Order Summary
              </h3>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden">
                        {item.product_image ? (
                          <img
                            src={item.product_image}
                            alt={item.product_name}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/48x48?text=No+Image' }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{item.product_name}</h4>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">${(item.quantity * item.product_price).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">${(total * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">${(total + total * 0.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button onClick={handleCheckout} className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center mt-6 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-lg transform hover:scale-105">
                <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Place Order
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By placing your order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
