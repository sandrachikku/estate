import React, { useEffect, useState } from 'react';
import route from '../route';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Wishlist = ({ setUsername, setRole, setLoggedIn }) => {
  const value = localStorage.getItem('Auth');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      if (value !== null) {
        const res = await axios.get(`${route()}getwishlists`, {
          headers: { "Authorization": `Bearer ${value}` },
        });
        if (res.status === 200) {
          setUsername(res.data.username);
          setRole(res.data.role);
          setLoggedIn(true);
          setProducts(res.data.products || []);
        }
      }
    } catch (error) {
      console.log("Error fetching wishlist:", error);
    }
  };

  const isValidProduct = (product) => {
    return product && product._id && product.pimages && product.pname;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products && products.length > 0 ? (
          products.map((product) =>
            isValidProduct(product) ? (
              <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <Link to={`/product/${product._id}`} className="block">
                  <div className="h-48 bg-gray-200 flex justify-center items-center">
                    <img
                      src={product.pimages[0]}
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-lg font-semibold text-gray-700">{product.pname}</span>
                  </div>
                </Link>
              </div>
            ) : null
          )
        ) : (
          <p className="text-center text-gray-500 text-lg col-span-full">No products available</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
