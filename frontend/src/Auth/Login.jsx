import React, { useState } from 'react';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import logo from '../assets/images/logo.png';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import api from '../utility/api';
import toast from 'react-hot-toast';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword); 
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log("Attempting login with payload:", { email: values.email, password: values.password });
      const response = await api.post("/login", { email: values.email, password: values.password });
      console.log("Login response:", response);
      
      if (response.data && response.data.token) {
        console.log("Access token received:", response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user",JSON.stringify(response.data.data))
        toast.success("Login successful!");
        navigate("/");
        console.log("Navigating to dashboard");
      } else {
        toast.error("Login failed. Please try again.");
        console.log("Access token missing in response data");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again");
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-[450px] w-[400px] px-8 py-6 border-2 border-gray-300 rounded-lg shadow-lg bg-white">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <img src={logo} alt="Logo" className="w-28" />
          <h2 className="text-2xl font-bold text-center">Login</h2>
        </div>

        {/* Form Section */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};

            if (!values.email) {
              errors.email = "Email is required.";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Password is required.";
            } else if (values.password.length < 6) {
              errors.password = "Password must be at least 6 characters";
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
                  <MdOutlineMailOutline />
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    className="w-full p-2 border-b-2 focus:border-primary focus:border-b-2 focus:outline-none"
                    placeholder="Email"
                    onBlur={handleBlur}
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
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    className="w-full p-2 border-b-2 focus:border-primary focus:border-b-2 focus:outline-none"
                    placeholder="Password"
                    onBlur={handleBlur}
                    value={values.password}
                    autoComplete="on"
                  />
                </div>
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                )}

                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute right-2 top-2 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show/Hide icon */}
                </button>
              </div>
              <div className='flex justify-between items-center'>
                <button
                  type="submit"
                  className="w-24 bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Login'}
                </button>
                <div className='font-medium text-primary hover:text-black focus:outline-none focus:underline transition ease-in-out duration-150'>
                  <Link to="/forgot/password">Forgot Password?</Link>
                </div>
              </div>
            </form>
          )}
        </Formik>

        {/* Footer Section */}
        <div className='flex justify-between items-center'>
          <div>
            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/Signup" className="text-blue-500 hover:underline">
                SignUp here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
