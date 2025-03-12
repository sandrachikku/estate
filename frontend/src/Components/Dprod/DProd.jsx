import React, { useState, useEffect } from 'react';
import axios from 'axios';
import route from '../route';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaCreditCard, FaHeart } from 'react-icons/fa';

const DProd = ({ setUsername, setRole, setLoggedIn }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const value = localStorage.getItem('Auth');
  const [product, setProduct] = useState({});
  const [isOnWishlist, setIsOnWishlist] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id, value, setUsername, setRole, setLoggedIn]);

  const fetchProduct = async () => {
    if (!id) return;
    try {
      const { status, data } = await axios.get(`${route()}product/${id}`, {
        headers: { Authorization: `Bearer ${value}` },
      });
      if (status === 200) {
        setUsername(data.username);
        setRole(data.role);
        setLoggedIn(true);
        setProduct(data.product);
        setIsOnWishlist(data.isOnWishlist);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const addToWishlist = async (id) => {
    const { status } = await axios.post(`${route()}addtowishlist`, { id }, {
      headers: { Authorization: `Bearer ${value}` },
    });
    if (status === 201) {
      alert('Wishlist added');
      fetchProduct();
    } else {
      alert('Failed');
    }
  };

  const removeFromWishlist = async (id) => {
    const { status } = await axios.delete(`${route()}removefromwishlist`, {
      data: { id },
      headers: { Authorization: `Bearer ${value}` },
    });
    if (status === 201) {
      alert('Removed from wishlist');
      fetchProduct();
    } else {
      alert('Failed');
    }
  };

  const handleBuynow = async () => {
    
    //if (cart.sizeOrColor) {
      const { status, data } = await axios.post(`${route()}addtocart`, product, {
        headers: { "Authorization": `Bearer ${value}` }
      });
      if (status === 201) {
        alert(data.msg);
        navigate("/purchasecompleted");
      } else {
        alert("Could not add to cart");
      }
   // } else {
   //   alert("Please select size");
   // }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Images */}
        <div>
          {product.pimages && product.pimages.length > 0 ? (
            <>
              <img
                id="main-img"
                src={product.pimages[0]}
                alt="Product"
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="flex mt-4 space-x-2">
                {product.pimages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-16 h-16 object-cover rounded cursor-pointer border border-gray-200 hover:border-gray-400"
                    onMouseOver={() => { document.getElementById('main-img').src = image; }}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-500">No images available</p>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-4">
        <h1 className="text-2xl font-bold  uppercase">{product.category}</h1>
          <p className="text-gray-600 font-semibold"><strong>Location:</strong>{product.pname}</p>
          <p className="text-gray-800"><strong>Company:</strong> {product.brand}</p>
          <p className="text-xl font-semibold text-red-500">${product.price?.toFixed(2)}</p>
          
          <div className="flex space-x-4 mt-4">
            <button
              className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              onClick={handleBuynow }>
              <FaCreditCard className="mr-2" /> Buy Now
            </button>
            
            {isOnWishlist ? (
              <button
                className="flex items-center px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                onClick={() => removeFromWishlist(product._id)}
              >
                <FaHeart className="mr-2" /> Remove from Wishlist
              </button>
            ) : (
              <button
                className="flex items-center px-5 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600"
                onClick={() => addToWishlist(product._id)}
              >
                <FaHeart className="mr-2" /> Add to Wishlist
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DProd;
