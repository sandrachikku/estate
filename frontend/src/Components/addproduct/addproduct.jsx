import React, { useState, useEffect } from 'react';
import axios from 'axios';
import route from '../route';
import { useNavigate } from 'react-router-dom';

const AddProduct = ({ setUsername, setRole, setLoggedIn }) => {
  const navigate = useNavigate();
  const value = localStorage.getItem("Auth");

  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [brand, setBrand] = useState("");
  const [productDetails, setProductDetails] = useState({ pname: '', price: '', pimages: [] });
  const [isAddCategory, setAddCategory] = useState(false);
  const [sizeColorQuantities, setSizeColorQuantities] = useState([]);

  useEffect(() => { getEssentials(); }, []);

  const getEssentials = async () => {
    try {
      const { status, data } = await axios.get(`${route()}company`, { headers: { "Authorization": `Bearer ${value}` } });
      if (status === 200) {
        setUsername(data.username);
        setRole(data.role);
        setLoggedIn(true);
        if (data.categories.length > 0) setCategories(data.categories);
        if (data.company) setBrand(data.company.name);
      }
    } catch (error) { console.log("Error fetching essentials"); }
  };

  const handleImageChange = async (e) => {
    const files = e.target.files;
    const arr = await Promise.all([...files].map(file => convertToBase64(file)));
    setProductDetails(prev => ({ ...prev, pimages: arr }));
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { status, data } = await axios.post(`${route()}addproduct`, {
        ...productDetails, brand, category, sizeColorQuantities
      }, { headers: { "Authorization": `Bearer ${value}` } });
      if (status === 201) {
        alert(data.msg);
        navigate('/company');
      } else {
        alert('Adding incomplete');
      }
    } catch (error) { console.log("Error:", error); }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Add PLOT</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Category</label>
            <div className="flex gap-2">
              <select className="w-full p-2 border rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select a Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat.category}>{cat.category}</option>
                ))}
              </select>
              <button type="button" className="bg-blue-500 text-white px-3 py-2 rounded" onClick={() => setAddCategory(!isAddCategory)}>+</button>
            </div>
            {isAddCategory && (
              <div className="mt-2 flex gap-2">
                <input type="text" className="w-full p-2 border rounded" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="New category" />
                <button type="button" className="bg-green-500 text-white px-3 py-2 rounded" onClick={handleSubmit}>Add</button>
              </div>
            )}
          </div>
          
          <input type="text" name="pname" value={productDetails.pname} onChange={(e) => setProductDetails({ ...productDetails, pname: e.target.value })} className="w-full p-2 border rounded" placeholder="Enter Location" />
          
          <input type="number" name="price" value={productDetails.price} onChange={(e) => setProductDetails({ ...productDetails, price: e.target.value })} className="w-full p-2 border rounded" placeholder="Enter price" />
          
          <input type="text" name="brand" value={brand} disabled className="w-full p-2 border rounded bg-gray-200" placeholder="Brand" />
          
          <input type="file" multiple onChange={handleImageChange} className="w-full p-2 border rounded" />
          
          
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
