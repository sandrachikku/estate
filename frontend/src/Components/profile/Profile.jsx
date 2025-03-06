import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle,FaEllipsisH,FaEdit, FaTimes  } from "react-icons/fa";
import axios from "axios";
import route from "../route";


const Profile = ({setUsername,setRole,setLoggedIn}) => {
  const value=localStorage.getItem('Auth');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddresses, setIsEditingAddresses] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [profile, setProfile] = useState({});
  const [phoneError, setPhoneError] = useState(""); // For phone number validation
  const [isProfileValid, setIsProfileValid] = useState(true); // To track overall profile validation
 // const [countCart,setCountCart]=useState(0);
 // const [countWishlist,setCountWishlist]=useState(0);
 // const [countOrders,setCountOrders]=useState(0);
  const [showPopover, setShowPopover] = useState(null);
  const [position,setPosition]=useState(0)
  useEffect(()=>{
    getEssentials();
  },[])
  const getEssentials=async()=>{
    try {
      
      const {status,data}=await axios.get(`${route()}profile`,{headers:{"Authorization":`Bearer ${value}`}});
      
      if (status==200) {
        setUsername(data.username);
        setRole(data.role);
        setLoggedIn(true);
        if(data.profile)
          setProfile({...data.profile});
        if(data.address)
          setAddresses(data.address.addresses);
       // setCountCart(data.cart);
       // setCountWishlist(data.wishlist);
       // setCountOrders(data.orders)
      }
    }
     catch (error) {
      console.log("error");
    }
  }
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "phone") {
      // Validate phone number (example: 10 digits only)
      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(value)) {
        setPhoneError("Phone number must be 10 digits.");
        setIsProfileValid(false);
      } else {
        setPhoneError("");
        setIsProfileValid(true);
      }
    }
  };

  const handlePopoverToggle = (index) => {
    setShowPopover(showPopover === index ? null : index);
  };
  const handleSubmitProfile=async()=>{
    if(isEditingProfile){
      const { status, data } = await axios.post(`${route()}edituser`, profile, {
        headers: { Authorization: `Bearer ${value}` },
      });      
      if (status===201) {
        alert(data.msg);
      }else{
        alert("error");
      }
      setIsEditingProfile(!isEditingProfile);
      getEssentials();
    }
    else{
      setIsEditingProfile(!isEditingProfile);
    }
  }
  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAddresses = [...addresses];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      [name]: value,
    };
    setAddresses(updatedAddresses);
  };

  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      { houseNumber: "", houseName: "", place: "", pincode: "", postOffice: "" },
    ]);
    setPosition(addresses.length);
    setIsEditingAddresses(!isEditingAddresses);
  };
  const handleEditAddress=(ind)=>{
    setPosition(ind);
    setIsEditingAddresses(!isEditingAddresses);
  }
  const handleSubmitAddress=async()=>{
    if(isEditingAddresses){
      const {status,data}=await axios.post(`${route()}editaddress`,addresses,{headers:{"Authorization":`Bearer ${value}`}});
      if (status===201) {
        alert(data.msg)
      }else{
        alert("error")
      }
      setPosition(0);
      setIsEditingAddresses(!isEditingAddresses);
      getEssentials();
    }
    else{
      setIsEditingAddresses(!isEditingAddresses);
    }
  }
  const handleCancelAddress=()=>{
    if(addresses[position].houseName=='')
      addresses.pop();
    setPosition(0);
    setIsEditingAddresses(!isEditingAddresses);
    getEssentials();
  }
  
  return (
    <div className="profile-container">
      {/* Profile Section */}
      {/* Profile Section */}
      <div className="flex justify-between grid grid-cols-3 gap-x-8 gap-y-4 mt-8 ml-40">
      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl pl-24  pr-24 pb-24 pt-16">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Your Details</h1>
      <div className="flex items-center space-x-4 mb-6">
        <FaUserCircle size={40} className="text-gray-500" />
        <p className="text-lg font-medium text-gray-700">Hi {profile.fname},</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">First Name</label>
          <input
            type="text"
            name="fname"
            value={profile.fname ||""}
            onChange={handleProfileChange}
            disabled={!isEditingProfile}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 disabled:bg-gray-200"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Last Name</label>
          <input
            type="text"
            name="lname"
            value={profile.lname ||""}
            onChange={handleProfileChange}
            disabled={!isEditingProfile}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 disabled:bg-gray-200"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={profile.phone || ""}
            onChange={handleProfileChange}
            disabled={!isEditingProfile}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 disabled:bg-gray-200"
          />
          {phoneError && <p className="text-sm text-red-500">{phoneError}</p>}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Gender</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={profile.gender === "male"}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={profile.gender === "female"}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
                className="mr-2"
              />
              Female
            </label>
          </div>
        </div>
        <button
          onClick={handleSubmitProfile}
          disabled={!isProfileValid}
          className={`w-full p-2 rounded-md text-white ${isProfileValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          {isEditingProfile ? "Save Profile" : "Edit Profile"}
        </button>
      </div>
    </div>

      {/* Addresses Section */}
      <div className="bg-white shadow-2xl rounded-2xl p-6 max-w-2xl mx-auto pl-40 pr-40 pb-40 pt-16">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h3 className="text-xl font-semibold">Addresses</h3>
        <button
          onClick={handleAddAddress}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
          title="Add New Address"
        >
          +
        </button>
      </div>

      {isEditingAddresses && (
        <div className="mt-4 space-y-2">
          <input
            type="text"
            name="houseName"
            placeholder="House Name"
            value={addresses[position]?.houseName || ""}
            onChange={(e) => handleAddressChange(position, e)}
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            name="place"
            placeholder="Place"
            value={addresses[position]?.place || ""}
            onChange={(e) => handleAddressChange(position, e)}
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={addresses[position]?.pincode || ""}
            onChange={(e) => handleAddressChange(position, e)}
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            name="postOffice"
            placeholder="Post Office"
            value={addresses[position]?.postOffice || ""}
            onChange={(e) => handleAddressChange(position, e)}
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            name="landmark"
            placeholder="Landmark"
            value={addresses[position]?.landmark || ""}
            onChange={(e) => handleAddressChange(position, e)}
            className="w-full p-2 border rounded-md"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSubmitAddress}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center"
            >
              <FaEdit className="mr-1" /> Save Address
            </button>
            <button
              onClick={handleCancelAddress}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center"
            >
              <FaTimes className="mr-1" /> Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 space-y-4">
        {addresses.map((address, index) =>
          address.houseName ? (
            <div key={index} className="p-4 border rounded-lg shadow-md relative">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{address.houseName}</h2>
                <FaEllipsisH
                  className="cursor-pointer text-gray-600 hover:text-black"
                  onClick={() => handlePopoverToggle(index)}
                />
              </div>
              {showPopover === index && (
                <div className="absolute top-10 right-4 bg-white shadow-md rounded-md p-2">
                  <button
                    onClick={() => handleEditAddress(index)}
                    className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handlePopoverToggle(null)}
                    className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                  >
                    Cancel
                  </button>
                </div>
              )}
              <p className="text-gray-700 mt-2">
                {address.postOffice} P.O, {address.place}, {address.pincode} (PIN), {address.landmark}
              </p>
            </div>
          ) : null
        )}
      </div>
    </div>
    </div>
    </div>
  );
};

export default Profile;
