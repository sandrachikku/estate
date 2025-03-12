import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import route from '../route';
import axios from 'axios';
import { FiMinus, FiPlus } from 'react-icons/fi';

const PlaceOrders= ({ setUsername, setRole, setLoggedIn }) => {
  const navigate = useNavigate();
  const value = localStorage.getItem('Auth');
  const [userDetails, setUserDetails] = useState([]);
  //const [quantities, setQuantities] = useState([]);
  //const [priceTotal, setPriceTotal] = useState(0);
  //const [addresses, setAddresses] = useState([]);
  //const [selectedAddress, setSelectedAddress] = useState("");
  //const [newAddress, setNewAddress] = useState({
  //  houseName: '',
  //  pincode: '',
  //  postOffice: '',
  //  place: '',
  //});
  //const [showAddressForm, setShowAddressForm] = useState(false);

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    const { status, data } = await axios.get(`${route()}getcart`, { headers: { "Authorization": `Bearer ${value}` } });
    if (status === 200) {
      setUsername(data.username);
      setRole(data.role);
      setLoggedIn(true);
      setUserDetails(data.placeOrders);
     // setQuantities(data.cart.map(item => item.quantity));
     // setPriceTotal(data.cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0));
     // setAddresses(data.addresses.addresses);
    }
  };

  return (
    <div className="container mx-auto p-6 ">
      <div className='flex justify-between grid grid-cols-3 gap-x-12 gap-y-4 mt-8 ml-48'>
      {userDetails.length === 0 ? (
        <div className="text-center text-gray-600">
          <h2 className="text-xl font-semibold">Cart empty..</h2>
          <Link to={'/'} className="text-blue-500 hover:underline">Go to products</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {userDetails.map((user, index) => (
              <div key={index} className="bg-white p-4 shadow-md rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Link to={`/product/${user.product._id}`}>
                    <img src={user.product.pimages[0]} alt={user.product.pname} className="w-20 h-20 object-cover rounded" />
                  </Link>
                  <div>
                    <h4 className="text-lg font-semibold">{user.product.pname}</h4>
                    <p className="text-gray-600">${user.product.price}</p>
                  </div>
                </div>
               {/* <div className="flex items-center space-x-2">
                  <button onClick={() => handleQuantityChange(index, item._id, 'decrease')} className="p-2 bg-gray-200 rounded">
                    <FiMinus />
                  </button>
                  <span>{quantities[index]}</span>
                  <button onClick={() => handleQuantityChange(index, item._id, 'increase')} className="p-2 bg-gray-200 rounded">
                    <FiPlus />
                  </button>
                </div>
                <p className="font-semibold">${item.product.price * quantities[index]}</p>*/}
              </div>
            ))}
          </div>

         {/* <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            <p className="text-gray-700">Discount: <span className="text-red-500">20%</span></p>
            <p className="text-gray-700">Delivery Charge: <span className="text-green-500">$5</span></p>
            <p className="text-lg font-bold">Total Amount: <span className="text-blue-500">${((priceTotal - (priceTotal * 0.2)) + 5).toFixed(2)}</span></p>
            
            <div className="mt-4">
              <select value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)} className="w-full p-2 border rounded">
                <option value="">Select Address</option>
                {addresses.map((address, index) => (
                  <option key={index} value={address._id}>
                    {address.houseName}, {address.pincode}, {address.postOffice}, {address.place}
                  </option>
                ))}
              </select>
            </div>

            <button onClick={() => setShowAddressForm(!showAddressForm)} className="mt-4 w-full bg-gray-200 p-2 rounded">
              {showAddressForm ? "Cancel" : "Add New Address"}
            </button>

            {showAddressForm && (
              <div className="mt-4 space-y-2">
                <input type="text" name="houseName" value={newAddress.houseName} onChange={handleAddressChange} placeholder="House Name" className="w-full p-2 border rounded" />
                <input type="text" name="pincode" value={newAddress.pincode} onChange={handleAddressChange} placeholder="Pincode" className="w-full p-2 border rounded" />
                <input type="text" name="postOffice" value={newAddress.postOffice} onChange={handleAddressChange} placeholder="Post Office" className="w-full p-2 border rounded" />
                <input type="text" name="place" value={newAddress.place} onChange={handleAddressChange} placeholder="Place" className="w-full p-2 border rounded" />
                <button onClick={handleAddAddress} className="w-full bg-green-500 text-white p-2 rounded">Add Address</button>
              </div>
            )}
            
            <button onClick={handleCart} className="mt-4 w-full bg-blue-600 text-white p-2 rounded">Place Order</button>
          </div>*/}
        </div>
      )}
      </div>
    </div>
  );
};

export default PlaceOrders;
