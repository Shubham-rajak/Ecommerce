import { useContext, useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { MdDeleteForever } from "react-icons/md";
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';

const CheckOut = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedModal,setSelectedModal] = useState(false)
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressID, setSelectedAddressID] = useState(null);

  const { cartItems = [], loading } = useContext(CartContext);

  const [shippingFee] = useState(50);

  // Ensure cartItems is an array before using reduce
  const totalProductPrice = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + item?.productId.price * item?.quantity, 0).toFixed(2)
    : 0;

  const finalTotal = (parseFloat(totalProductPrice) + shippingFee).toFixed(2);

  // Fetch addresses from the server
  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/get-addresses', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token, // Replace with your authentication token
        }
      });
      setAddresses(response.data.data);
      console.log('Addresses fetched:', response.data.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Toggle Modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Initial form values
  const initialValues = {
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
  };

  // Validation Schema with Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    contact: Yup.string().required('Contact number is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    zipCode: Yup.string().required('Zip Code is required'),
  });

  // Form submit handler
  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/add-address', values, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token // Replace with your authentication token
        }
      });

      if (response.data.success) {
        alert('Address added successfully');
        toggleModal();
        fetchAddresses(); // Re-fetch addresses after adding a new one
      }
    } catch (error) {
      console.error('Error adding address:', error);
      alert('Failed to add address');
    }
  };

  // Handle address selection
  const handleAddressSelect = (addressID) => {
    if (selectedAddressID === addressID) {
      setSelectedAddressID(null); // Deselect if the same address is clicked
    } else {
      setSelectedAddressID(addressID); // Select new address
    }
  };

  const handleBuyNow = () => {
    if (!selectedAddressID) {
      toast.error("Please select a shipping address before proceeding with payment.");
    } else {
      setOrderSuccess(true); // Set the order to successful
      setShowModal(true); // Open the modal
      toast.success("Your order is successful!"); // Show success toast
    }
  };

  // payment methods

  if (loading) return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className='container mt-4'>
      <div className=" flex justify-center items-center mx-56 ">
        {/* Column 1: Add Address Button and Address List */}
        <div className="w-full">
          {/* Button to trigger modal */}
          <button
            onClick={toggleModal}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors mb-4"
          >
            Add Address
          </button>

          {/* Modal for Address Form */}
          {showModal && (
            <div
              onClick={toggleModal}
              className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
            >
              <div
                className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-semibold mb-4">Enter Shipping Address</h3>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                          <label htmlFor="firstName" className="block text-sm font-semibold">
                            First Name
                          </label>
                          <Field
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className="text-red-600 text-xs mt-1"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="lastName" className="block text-sm font-semibold">
                            Last Name
                          </label>
                          <Field
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            className="text-red-600 text-xs mt-1"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="contact" className="block text-sm font-semibold">
                            Contact Number
                          </label>
                          <Field
                            type="text"
                            id="contact"
                            name="contact"
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                          <ErrorMessage
                            name="contact"
                            component="div"
                            className="text-red-600 text-xs mt-1"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="email" className="block text-sm font-semibold">
                            Email
                          </label>
                          <Field
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-600 text-xs mt-1"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="address" className="block text-sm font-semibold">
                            Address
                          </label>
                          <Field
                            type="text"
                            id="address"
                            name="address"
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                          <ErrorMessage
                            name="address"
                            component="div"
                            className="text-red-600 text-xs mt-1"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="city" className="block text-sm font-semibold">
                            City
                          </label>
                          <Field
                            type="text"
                            id="city"
                            name="city"
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                          <ErrorMessage
                            name="city"
                            component="div"
                            className="text-red-600 text-xs mt-1"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="zipCode" className="block text-sm font-semibold">
                            Zip Code
                          </label>
                          <Field
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                          <ErrorMessage
                            name="zipCode"
                            component="div"
                            className="text-red-600 text-xs mt-1"
                          />
                        </div>
                        <div className="mb-4">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                          >
                            {isSubmitting ? 'Saving...' : 'Save Address'}
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          )}
          {/* Address List */}
          <h1 className="text-2xl font-semibold mb-4 p-5">Select Address</h1>
          {addresses && addresses.length > 0 ? (
            <div className="max-w-[450px]">
              {addresses.map((address) => (
                <div
                  key={address._id}
                  className="flex items-center bg-white p-4 rounded-lg shadow-md border gap-2 my-3"
                  onClick={() => handleAddressSelect(address._id)} // Select address when clicked
                >
                  <input
                    type="checkbox"
                    id={`address-${address._id}`}
                    name="address"
                    value={address._id}
                    className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500 mr-4"
                    checked={selectedAddressID === address._id} // Set checkbox checked if selected
                    onChange={() => handleAddressSelect(address._id)}
                  />
                  <div className="flex-grow">
                    <p className="font-semibold text-lg">{address.firstName} {address.lastName}</p>
                    <p className="text-sm text-gray-600">{address.contact}</p>
                    <p className="text-sm text-gray-600">{address.email}</p>
                    <p className="text-sm text-gray-600">{address.address}</p>
                    <p className="text-sm text-gray-600">{address.city}, {address.zipCode}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"><MdDeleteForever /></button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No addresses found</p>
          )}
        </div>

        {/* Column 2: Payment Summary */}
        <div className="w-full">
          <div className="h-80 bg-white p-6 rounded-lg shadow-md mt-4">
            <h3 className="text-xl font-semibold mb-4">Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-lg">
                <span>Total Product Price:</span>
                <span>₹{totalProductPrice}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Shipping Fee:</span>
                <span>₹{shippingFee.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4 flex justify-between text-xl font-bold">
                <span>Final Total:</span>
                <span>₹{finalTotal}</span>
              </div>

              <div className="mt-6">
                <button
                  onClick={selectedModal}
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Buy Now
                </button>

                {showModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md shadow-lg w-80">
                      <h2 className="text-xl text-green-600 mb-4">Order Successful!</h2>
                      <p>Your order has been successfully placed. Thank you for your purchase!</p>
                      <button
                        onClick={() => setSelectedModal(false)}
                        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
      );
};

      export default CheckOut;
