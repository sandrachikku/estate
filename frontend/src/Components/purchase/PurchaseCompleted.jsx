import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const PurchaseCompleted = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <FaCheckCircle size={60} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Purchase Completed!</h2>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. We hope you enjoy your new items!
        </p>
        <button
          onClick={goToHome}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PurchaseCompleted;
