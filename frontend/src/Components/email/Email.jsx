import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import route from '../route';

const Email = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { status, data } = await axios.post(`${route()}verifyemail`, { email }, {
        headers: { "Content-Type": "application/json" }
      });
      
      if (status === 201) {
        localStorage.setItem('email', email);
        alert(data.msg);
        navigate('/emailsuccess');
      } else {
        alert(data.msg);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96 text-center">
        <div className="flex flex-col items-center mb-4">
          <img src="/images/logo.jpg" alt="Logo" className="w-16 h-16 mb-2" />
          <h2 className="text-2xl font-semibold text-gray-700">ShopClues</h2>
        </div>
        <h2 className="text-xl font-medium text-gray-700 mb-2">Sign up</h2>
        <p className="text-sm text-gray-500 mb-4">Please enter your email address to confirm signup.</p>
        
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input 
            type="text" 
            id="email" 
            name="email" 
            placeholder="Email" 
            onChange={handleChange} 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Send
          </button>
        </form>

        <div className="text-sm text-gray-500 mt-4">
          Already have an account? <Link to={'/login'} className="text-blue-500">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Email;
