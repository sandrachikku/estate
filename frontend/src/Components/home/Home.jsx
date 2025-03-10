import React, { useEffect, useState } from 'react';
import route from '../route';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Home = ({ setUsername, setRole, setLoggedIn }) => {
  const navigate = useNavigate();
  const value = localStorage.getItem('Auth');
  const [products, setProducts] = useState([]);
  const [role, setUserRole] = useState("");

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      if (value) {
        const res = await axios.get(`${route()}home`, { headers: { Authorization: `Bearer ${value}` } });
        if (res.status === 200) {
          setUsername(res.data.username || '');
          setRole(res.data.role || '');
          setUserRole(res.data.role || '');
          setLoggedIn(true);

          if (res.data.role === "buyer") {
            const buyerProducts = res.data.products.filter(product => product.addedByRole !== "seller");
            setProducts(buyerProducts);
          } else {
            setProducts(res.data.products || []);
          }
        } else if (res.status === 403) {
          setLoggedIn(false);
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Available Products</h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {products && products.length > 0 ? (
          products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id} className="block bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition">
              <div className="w-full h-48 flex justify-center items-center overflow-hidden rounded-lg">
                <img src={product.pimages?.[0] || 'placeholder.jpg'} alt={product.pname || 'No name'} className="object-cover h-full w-full" />
              </div>
              <div className="mt-4 text-center">
                <h2 className="text-lg font-bold text-gray-900">{product.pname || 'Unknown'}</h2>
                <p className="text-green-600 font-semibold">${(product.price ?? 0).toFixed(2)}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No products available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
