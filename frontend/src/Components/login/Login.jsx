import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import route from '../route';

const Login = () => {
  const navigate = useNavigate();
  const [loginDetails, setDetails] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = `${route()}signin`;
      const response = await axios.post(apiUrl, loginDetails, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.status === 200) {
        localStorage.setItem('Auth', response.data.token);
        alert(response.data.msg);
        navigate('/home');
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert(error.response?.data?.msg || 'Login failed, please try again.');
    }
  };

  const handleChange = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700">ShopClues</h2>
        <p className="text-sm text-center text-gray-500 mb-4">Log in to your account</p>
        
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input 
              type="text" 
              id="email" 
              name="email" 
              onChange={handleChange} 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              onChange={handleChange} 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
            Sign in
          </button>
        </form>
        
        <div className="text-sm text-center text-gray-500 mt-4">
          Don't have an account? <Link to="/email" className="text-blue-500">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
