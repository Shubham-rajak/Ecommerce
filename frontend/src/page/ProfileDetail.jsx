import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md"; 
import { FaAddressCard } from "react-icons/fa"; 
import api from '../utility/api';

const ProfileDetail = ({ userInfo }) => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  // Fetch user information on component mount
  const getUser = async () => {
    try {
      const response = await api.get('/get-user');
      // console.log(response);
      setUser(response.data.user); 
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle address change
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add your logic to save the address
    console.log("Address Added: ", address);
    closeModal(); // Close modal after submitting
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="space-y-6">
          {/* Render User Info */}
          {user ? (
            <>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800">Name</h3>
                <p className="text-gray-500 text-sm">{user?.name || "No name available"}</p>
              </div>

              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800">Email</h3>
                <p className="text-gray-500 text-sm">{user?.email || "No email available"}</p>
              </div>

              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800">Phone</h3>
                <p className="text-gray-500 text-sm">{user?.contact || "No phone number available"}</p>
              </div>

              
            </>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      </div>

      {/* Button to open modal */}
      <div className="max-w-3xl mx-auto mt-10 text-center">
        <button
          onClick={openModal}
          className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-600"
        >
          <FaAddressCard />
          Add Address
        </button>
      </div>

      {/* Modal for adding address */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[800px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Add Address</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <MdClose size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Grid for address form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={address}
                    onChange={handleAddressChange}
                    className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-200"
                    placeholder="Enter first name"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={address}
                    onChange={handleAddressChange}
                    className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-200"
                    placeholder="Enter last name"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    id="contact"
                    value={address}
                    onChange={handleAddressChange}
                    className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-200"
                    placeholder="Enter contact number"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={handleAddressChange}
                    className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-200"
                    placeholder="Enter your address"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={address}
                    onChange={handleAddressChange}
                    className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-200"
                    placeholder="Enter your city"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    ZipCode
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    value={address}
                    onChange={handleAddressChange}
                    className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-200"
                    placeholder="Enter your zip code"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetail;
