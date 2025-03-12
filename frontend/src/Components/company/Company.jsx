import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaPlus } from 'react-icons/fa';
import route from "../route";
import { Link } from 'react-router-dom';

const Company = ({ setUsername, setRole, setLoggedIn }) => {
  const value = localStorage.getItem("Auth");
  const [company, setCompany] = useState({
    name: "",
    location: "",
    gstin: "",
    contact: ""
  });
  const [categories, setCategories] = useState([]);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    getEssentials();
  }, []);

  const getEssentials = async () => {
    try {
      const { status, data } = await axios.get(`${route()}company`, { headers: { "Authorization": `Bearer ${value}` } });
      if (status === 200) {
        setUsername(data.username);
        setRole(data.role);
        setLoggedIn(true);
        if (data.company) setCompany(data.company);
        if (data.categories && data.categories.length > 0) setCategories(data.categories);
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSave = async () => {
    if (isEditable) {
      const { status, data } = await axios.post(`${route()}editcompany`, company, { headers: { "Authorization": `Bearer ${value}` } });
      if (status === 201) {
        alert(data.msg);
      } else {
        alert("Error saving company details");
      }
      setIsEditable(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 ">
     <div className='flex justify-between  gap-24 '>
     <div className="bg-white shadow-2xl rounded-2xl p-24 w-full max-w-3xl pl-24">
        <div className="flex items-center gap-4 mb-4">
          
          <h2 className="text-xl font-semibold">Company Details</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600">Company Name:</label>
            <input type="text" name="name" value={company.name} onChange={handleChange} disabled={!isEditable} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" />
          </div>
          <div>
            <label className="block text-gray-600">Location:</label>
            <input type="text" name="location" value={company.location} onChange={handleChange} disabled={!isEditable} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" />
          </div>
          <div>
            <label className="block text-gray-600">Contact:</label>
            <input type="text" name="contact" value={company.contact} onChange={handleChange} disabled={!isEditable} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" />
          </div>
        </div>
        
        <div className="mt-4 flex gap-2">
          {!isEditable ? (
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2" onClick={handleEditClick}><FaEdit /> Edit</button>
          ) : (
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={handleSave}>Save</button>
          )}
        </div>
      </div>

      <div className="bg-white shadow-2xl rounded-2xl p-24 w-full max-w-3xl pl-24">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Categories</h3>
          <div className="flex gap-2">
            {company.name && (
              <Link to={'/addproduct'}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  <FaPlus /> Product
                </button>
              </Link>
            )}
            <Link to={'/placeorders'}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Placed Orders</button>
            </Link>
          </div>
        </div>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <Link to={`/products/${encodeURIComponent(category.category)}`} className="text-blue-500 hover:underline">{category.category}</Link>
            </li>
          ))}
        </ul>
      </div>
     </div>
      
    </div>
  );
};

export default Company;
