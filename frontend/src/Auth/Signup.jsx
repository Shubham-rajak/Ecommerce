import React, { useState } from 'react';
import { Formik } from 'formik';
import { Link,useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaPhoneAlt, FaUser } from 'react-icons/fa';
import logo from '../assets/images/logo.png';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import api from '../utility/api';



const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // call the hooks
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await api.post('/sign-up', {
        name: values.name,
        email: values.email,
        password: values.password,
        contact: values.contact,
      }); // Send data to the backend API
  
      if (response.status === 201) {
        setSuccessMessage(response.data.message); // Show success message
        resetForm(); // Reset the form after successful submission
      }

      if (response.data && response.data.token){
        localStorage.setItem('token', response.data.token);
       navigate('/login')
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setSubmitting(false); // Stop submitting after the request is done
    }
  };
  
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-[450px] w-[400px] px-8 py-6 border-2 border-gray-200 rounded-lg shadow-lg bg-white">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <img src={logo} alt="Logo" className="w-28" />
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        </div>

        {/* Form Section */}
        <Formik
          initialValues={{ name: '', email: '', password: '', contact: '' }}
          validate={(values) => {
            const errors = {};

            if (!values.name) {
              errors.name = 'Name is required.';
            }
            if (!values.email) {
              errors.email = 'Email is required.';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            if (!values.password) {
              errors.password = 'Password is required.';
            } else if (values.password.length < 6) {
              errors.password = 'Password must be at least 6 characters';
            }
            if (!values.contact) {
              errors.contact = 'Contact is required.';
            }
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className='flex justify-center items-center'>
                <FaUser />
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  className="w-full p-2 border-b-2 focus:border-primary focus:border-b-2 focus:outline-none"
                  placeholder="Name"
                  onBlur={handleBlur}
                  onFocus={() => setFocusedField('name')}
                  value={values.name}
                />
                 </div>
                {errors.name && touched.name && (
                  <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                )}
              </div>

              <div className="mb-4">
                <div className='flex justify-center items-center'>
                <MdOutlineMailOutline />
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="w-full p-2 border-b-2 focus:border-primary focus:border-b-2 focus:outline-none"
                  placeholder="Email"
                  onBlur={handleBlur}
                  onFocus={() => setFocusedField('email')}
                  value={values.email}
                />
                </div>
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                )}
              </div>

              <div className="mb-4 relative">
                <div className='flex justify-center items-center'>
                <RiLockPasswordLine />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  onChange={handleChange}
                  className="w-full p-2 border-b-2 focus:border-primary focus:border-b-2 focus:outline-none"
                  placeholder="Password"
                  onBlur={handleBlur}
                  onFocus={() => setFocusedField('password')}
                  value={values.password}
                />
                </div>
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute right-2 top-2 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                )}
              </div>

              <div className="mb-4">
                <div className='flex justify-center items-center'>
                <FaPhoneAlt />
                <input
                  type="text"
                  name="contact"
                  onChange={handleChange}
                  className="w-full p-2 border-b-2 focus:border-primary focus:border-b-2 focus:outline-none"
                  placeholder="Contact"
                  onBlur={handleBlur}
                  onFocus={() => setFocusedField('contact')}
                  value={values.contact}
                />
                </div>
                {errors.contact && touched.contact && (
                  <div className="text-red-500 text-sm mt-1">{errors.contact}</div>
                )}
              </div>

              {errorMessage && (
                <div className="text-red-500 text-sm mt-4">{errorMessage}</div>
              )}

              {successMessage && (
                <div className="text-green-500 text-sm mt-4">{successMessage}</div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
                disabled={isSubmitting}
              >
                {/* {isSubmitting ? 'Submitting...' : 'Submit'} */}
                register {isSubmitting }
              </button>
            </form>
          )}
        </Formik>

        {/* Footer Section */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
