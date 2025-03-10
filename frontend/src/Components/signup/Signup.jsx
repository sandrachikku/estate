import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import route from '../route';

const Signup = () => {
  const navigate=useNavigate();
  const email=localStorage.getItem('email');
    const [user,setUser]=useState({
      email:email,
      username:"",
      password:"",
      cpassword:"",
      role:"",
    })
    
      const [checkPassword, setCheckPassword] = useState(false);
      const [checkCPassword, setCheckCPassword] = useState(false);
  const handleChange=(e)=>{
    setUser((pre)=>({...pre,[e.target.name]:e.target.value}))
  }
  const handlePassword=(e)=>{
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  if (regex.test(e.target.value)) {
    setUser((pre)=>({...pre,[e.target.name]:e.target.value}));
    if (e.target.name=="password") {
      setCheckPassword(true);
    }else if(e.target.name=="cpassword"){
      setCheckCPassword(true)
    }
  } else {
    if (e.target.name=="password") {
      setCheckPassword(false);
    }else if(e.target.name=="cpassword"){
      setCheckCPassword(false)
    }
  }
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(checkCPassword&&checkPassword){
      try {
        const {data,status}=await axios.post(`${route()}signup`,user,{headers:{"Content-Type":"application/json"}})
      
      if(status===201){
        localStorage.removeItem('email');
        alert(data.msg);
        navigate('/')
      }
      else{
        alert(data.msg)
      }
      } catch (error) {
        alert("Credentials provided is wrong")
      }
    }else{
      alert("Enter strong password")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Sign Up</h2>
        <p className="text-sm text-center text-gray-500 mb-4">Sign up now to become a member.</p>
        
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Enter Name" 
            id="username" 
            name="username" 
            onChange={handleChange} 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input 
            type="password" 
            placeholder="Choose A Password" 
            id="password" 
            name="password" 
            onChange={handlePassword} 
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${checkPassword ? 'border-green-500' : 'border-red-500'}`}
          />
          <input 
            type="password" 
            placeholder="Re-Enter Password" 
            id="cpassword" 
            name="cpassword" 
            onChange={handlePassword} 
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${checkCPassword ? 'border-green-500' : 'border-red-500'}`}
          />
          <select 
            id="role" 
            name="role" 
            onChange={handleChange} 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select your role</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
          
         
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
         
        </form>
        
        <div className="text-sm text-center text-gray-500 mt-4">
          Already have an account? <Link to="/" className="text-blue-500">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
