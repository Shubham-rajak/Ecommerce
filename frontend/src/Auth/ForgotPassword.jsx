import React, { useState } from 'react';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa'; // Eye icon for show/hide password
import logo from '../assets/images/logo.png';
import { MdOutlineMailOutline } from 'react-icons/md';
import api from '../utility/api';


const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();



  const handleTogglePassword = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  const handleSubmit = async (values) => {
    try {
      console.log("Attempting login with payload:", { email: values.email, });
      const response = await api.post("/login", { email: values.email, });
      console.log("response:", response);
     
      if (response.data && response.data.message) {
        setMessage(response.data.message); // Assuming the API responds with a success message
        console.log("Password reset email sent");
        // Optionally navigate the user to login page after email is sent
         navigate("/verification/otp");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-[450px] w-[400px] px-8 py-6 border-2 border-gray-300 rounded-lg shadow-lg bg-white">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <img src={logo} alt="Logo" className="w-28" />
          <h2 className="text-2xl font-bold text-center">ForgotPassword</h2>
        </div>

        {/* Display Backend Error */}
       


        {/* Form Section */}
        <Formik
          initialValues={{ email: "" }}
          validate={(values) => {
            const errors = {};

            if (!values.email) {
              errors.email = "Email is required.";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
         
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            alert("forgot your password");
            handleSubmit(values);
            setSubmitting(false);
            resetForm();
          }, 400);
        }}
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
                    className="w-full p-2 border-b-2  focus:border-primary focus:border-b-2 focus:outline-none"
                    placeholder="Email"
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </div>
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                )}
              </div>

             
              <div className='flex flex-col justify-center items-center'>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
                >
                  Send Otp
                </button>
                <div className='w-full flex justify-center flex-col bg-slate-200 hover:bg-slate-400 mt-5 text-center py-2 rounded-lg  font-medium text-primary hover:text-white focus:outline-none focus:underline transition ease-in-out duration-150'>
                  <Link to="/login">Back to Login</Link>

                </div>
              </div>
            </form>
          )}
        </Formik>

      </div>
    </div>
  );
};

export default ForgotPassword;







































