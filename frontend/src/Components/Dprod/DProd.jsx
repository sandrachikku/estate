import React, { useState, useEffect } from 'react';
import axios from 'axios';
import route from '../route';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaShoppingCart, FaCreditCard } from 'react-icons/fa';

const DProd = ({ setUsername, setRole, setLoggedIn }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const value = localStorage.getItem('Auth');
  const [product, setProduct] = useState({});
  const [isOnCart, setIsOnCart] = useState(false);
  const [isOnWishlist, setIsOnWishlist] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [cart, setCart] = useState({
    product: {},
    sizeOrColor: "",
    index: 0,
    quantity: 0
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

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
        setIsOnCart(data.isOnCart);
        setIsOnWishlist(data.isOnWishlist);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleSize = (size, ind) => {
    setSelectedSize(size);
    setCart({ sizeOrColor: size, index: ind, product: product, quantity: 1 });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg rounded-lg p-6">
        {/* Product Images */}
        <div>
          {product.pimages && product.pimages.length > 0 ? (
            <>
              <img id='img' src={product.pimages[0]} alt="Main Product" className="w-full h-96 object-cover rounded-lg shadow" />
              <div className="flex gap-2 mt-4">
                {product.pimages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    onMouseOver={() => { document.getElementById("img").src = product.pimages[index]; }}
                    className="w-20 h-20 object-cover rounded-lg cursor-pointer border hover:border-gray-400"
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-500">No images available</p>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.pname}</h1>
          <p className="text-gray-600 uppercase">Category: {product.category}</p>
          <p className="text-lg font-semibold">Brand: {product.brand}</p>
          <p className="text-xl font-bold text-green-600">${product.price?.toFixed(2)}</p>

          {/* Size Options */}
          <div>
            <strong>Select Size:</strong>
            <div className="flex gap-2 mt-2">
              {product.sizeColorQuantities &&
                product.sizeColorQuantities.map((sq, ind) => (
                  <button
                    key={ind}
                    className={`px-4 py-2 border rounded-lg ${selectedSize === sq.sizeOrColor ? 'bg-blue-600 text-white' : 'bg-gray-200'} hover:bg-gray-300`}
                    onClick={() => handleSize(sq.sizeOrColor, ind)}
                    disabled={sq.quantity <= 0}
                  >
                    {sq.sizeOrColor}
                  </button>
                ))}
            </div>
          </div>

          {/* Buy Options */}
          <div className="flex gap-4 mt-4">
            {isOnCart ? (
              <Link to={`/scart/${product._id}`}>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2">
                  <FaCreditCard /> Buy Now
                </button>
              </Link>
            ) : (
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2">
                <FaCreditCard /> Buy Now
              </button>
            )}
            {isOnCart ? (
              <Link to={'/cart'}>
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2">
                  <FaShoppingCart /> Go to Cart
                </button>
              </Link>
            ) : (
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2">
                <FaShoppingCart /> Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DProd;
