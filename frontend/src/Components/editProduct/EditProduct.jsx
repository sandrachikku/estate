import React, { useState, useEffect } from 'react';
import axios from 'axios';
import route from '../route';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = ({ setUsername, setRole, setLoggedIn }) => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const value = localStorage.getItem("Auth");
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({});
  const [sizeColorQuantities, setSizeColorQuantities] = useState([]);
  const [isAddCategory, setAddCategory] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleCategoryChange = (e) => {
    setProduct({ ...product, category: e.target.value });
  };

  const fetchProduct = async () => {
    try {
      const { status, data } = await axios.get(`${route()}getproduct/${_id}`, { headers: { "Authorization": `Bearer ${value}` } });
      if (status === 200) {
        setUsername(data.username);
        setRole(data.role);
        setLoggedIn(true);
        setProduct(data.product);
        if (data.category.length > 0) setCategories(data.category);
        setSizeColorQuantities(data.product.sizeColorQuantities);
      }
    } catch (error) {
      console.log("Error fetching product data");
    }
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory]);
      setCategory(newCategory);
      const { status, data } = await axios.post(`${route()}editcategory`, { newCategory }, { headers: { "Authorization": `Bearer ${value}` } });
      if (status === 201) {
        alert(data.msg);
        setAddCategory(false);
      } else {
        alert("Error adding category");
      }
      setNewCategory('');
    }
  };

  const handleSizeQuantityChange = (e, index) => {
    const updatedSizeColorQuantities = [...sizeColorQuantities];
    updatedSizeColorQuantities[index] = { ...updatedSizeColorQuantities[index], quantity: e.target.value };
    setProduct({ ...product, sizeColorQuantities: updatedSizeColorQuantities });
    setSizeColorQuantities(updatedSizeColorQuantities);
  };

  const handleProductDetailChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { status, data } = await axios.put(`${route()}editproduct/${product._id}`, product, { headers: { "Authorization": `Bearer ${value}` } });
      if (status === 201) {
        alert(data.msg);
        navigate('/company');
      } else {
        alert("Update incomplete");
      }
    } catch (error) {
      console.log("Error updating product");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Category</label>
            <div className="flex gap-2">
              <select className="border p-2 w-full" value={category} onChange={handleCategoryChange}>
                <option value={product.category}>{product.category}</option>
                {categories.map((cat, index) => (
                  product.category !== cat.category && <option key={index} value={cat.category}>{cat.category}</option>
                ))}
              </select>
              <button type="button" className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => setAddCategory(!isAddCategory)}>+</button>
            </div>
            {isAddCategory && (
              <div className="flex mt-2 gap-2">
                <input type="text" className="border p-2 w-full" value={newCategory} onChange={handleNewCategoryChange} placeholder="Add new category" />
                <button type="button" className="bg-green-500 text-white px-3 py-1 rounded" onClick={handleAddCategory}>Add</button>
              </div>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Product Name</label>
            <input type="text" name="pname" value={product.pname} onChange={handleProductDetailChange} className="border p-2 w-full" placeholder="Enter product name" />
          </div>
          <div>
            <label className="block text-gray-700">Price</label>
            <input type="number" name="price" value={product.price} onChange={handleProductDetailChange} className="border p-2 w-full" placeholder="Enter price" />
          </div>
          <div>
            <label className="block text-gray-700">Brand</label>
            <input type="text" name="brand" value={product.brand} disabled className="border p-2 w-full bg-gray-100" />
          </div>
          <div>
            <label className="block text-gray-700">Sizes/Colors & Quantities</label>
            {sizeColorQuantities.map((sq, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <span className="p-2 w-full border bg-gray-100">{sq.sizeOrColor}</span>
                <input type="number" value={sq.quantity} onChange={(e) => handleSizeQuantityChange(e, index)} className="border p-2 w-full" placeholder="Quantity" />
              </div>
            ))}
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
