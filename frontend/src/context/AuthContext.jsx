import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token) {
      // Set axios default header with the token
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Restore user from localStorage
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          // If parsing fails, clear invalid data
          localStorage.removeItem('user');
        }
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email,
        password,
      });
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      // Store user data
      const userData = { email };
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || 'Login failed' };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post('http://localhost:8000/auth/register', {
        username,
        email,
        password,
      });
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      // Store user data
      const userData = { username, email };
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || 'Registration failed' };
    }
  };

  // Function to fetch and update cart count
  const updateCartCount = async () => {
    if (user) {
      try {
        const response = await axios.get('http://localhost:8000/cart/');
        const totalItems = response.data.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(totalItems);
      } catch (error) {
        console.error('Error fetching cart count:', error);
        setCartCount(0);
      }
    } else {
      setCartCount(0);
    }
  };

  // Update cart count when user changes
  useEffect(() => {
    updateCartCount();
  }, [user]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCartCount(0);
  };

  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    cartCount,
    updateCartCount
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
