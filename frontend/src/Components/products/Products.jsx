import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import route from '../route';

const Products = ({ setUsername, setRole, setLoggedIn }) => {
  const { category } = useParams();
  const value = localStorage.getItem("Auth");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { status, data } = await axios.get(`${route()}products/${category}`, {
        headers: { "Authorization": `Bearer ${value}` }
      });
      if (status) {
        setUsername(data.username);
        setRole(data.role);
        setLoggedIn(true);
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {products && products.length > 0 ? (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition">
              {/* Product Image */}
              {product.pimages && product.pimages.length > 0 && (
                <div className="w-full h-48 flex justify-center items-center overflow-hidden rounded-lg">
                  <img src={product.pimages[0]} alt="Product" className="object-cover h-full w-full" />
                </div>
              )}
              <div className="mt-4">
                {/* Category */}
                <span className="text-xs font-semibold text-gray-500 uppercase">{product.category}</span>
                {/* Product Name */}
                <h2 className="text-lg font-bold text-gray-900">{product.pname}</h2>
                {/* Price */}
                <p className="text-green-600 font-semibold">${product.price.toFixed(2)}</p>
                {/* Edit Button */}
                <Link to={`/editproduct/${product._id}`}>
                  <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                    Edit Product
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products available</p>
      )}
    </div>
  );
};

export default Products;
