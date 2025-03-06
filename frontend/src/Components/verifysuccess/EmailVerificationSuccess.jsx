import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const EmailVerificationSuccess = () => {
  const navigate = useNavigate();
  const goToLogin = () => navigate('/login');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96 text-center">
        <div className="flex flex-col items-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Verification Email Sent</h2>
        <p className="text-sm text-gray-500 mb-4">
          We've sent a verification email to your inbox. To continue, please check your email and verify your account. Once verified, you can proceed to login.
        </p>
        <button 
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={goToLogin}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationSuccess;
