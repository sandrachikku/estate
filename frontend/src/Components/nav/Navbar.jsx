import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ username, role, loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();
  const [isSeller, setIsSeller] = useState(false);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  useEffect(() => {
    if (role === "seller") {
      setIsSeller(true);
    }
  }, [role]);

  const handleLogout = () => {
    localStorage.removeItem('Auth');
    setIsSeller(false);
    setIsPopoverVisible(false);
    setLoggedIn(!loggedIn);
    navigate('/');
  };

  const togglePopover = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center space-x-2">
        <Link to={'/'} className="flex items-center text-white font-bold text-lg">
          <img src="/image/logo.png" alt="Logo" className="w-13 h-13 rounded-full bg-white size-15 " />
          <span className="ml-2">PLOT BOOKING</span>
        </Link>
      </div>

      {loggedIn && (
        <div className="flex items-center space-x-6">
          <h4 className="text-white font-medium">{username}</h4>
          <div className="relative">
            <FaUserCircle 
              className="text-white text-2xl cursor-pointer " 
              onClick={togglePopover} 
            />
            {isPopoverVisible && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md p-2">
                <Link to={'/profile'}>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">Profile</button>
                </Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Logout</button>
              </div>
            )}
          </div>
          {isSeller && (
            <Link to={'/company'}>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600">Seller</button>
            </Link>
          )}
          <Link to={'/cart'}>
            <FaShoppingCart className="text-white text-2xl cursor-pointer "/>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
