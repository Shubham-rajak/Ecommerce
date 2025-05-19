import React, { useState } from 'react';
import { Formik } from 'formik';
import api from '../utility/api'; // Make sure to set up your API utility
import { useNavigate } from 'react-router-dom';

const OtpVerification = ({ email }) => {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  // Function to handle OTP form submission
  const handleOtpSubmit = async (values) => {
    try {
      // Concatenate OTP values into a single string
      const otp = values.otp1 + values.otp2 + values.otp3 + values.otp4 + values.otp5 + values.otp6;
      console.log("Attempting to verify OTP for email:", email, "with OTP:", otp);

      // Send OTP to the backend for verification
      const response = await api.post("/verify-otp", { email, otp });

      // Handle success or failure response from the server
      if (response.data.success) {
        setMessage("OTP verified successfully! You can now reset your password.");
        setTimeout(() => navigate("/login"), 2000); // Redirect after success
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-[450px] w-[400px] px-8 py-6 border-2 border-gray-300 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold text-center mb-4">Enter OTP</h2>

        {/* Display Error or Success Message */}
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        {message && <div className="text-green-500 text-sm mb-2">{message}</div>}

        {/* OTP Form using Formik */}
        <Formik
          initialValues={{
            otp1: "", otp2: "", otp3: "", otp4: "", otp5: "", otp6: ""
          }}
          validate={(values) => {
            const errors = {};
            // Validate if any OTP field is empty or invalid
            if (!values.otp1 || !values.otp2 || !values.otp3 || !values.otp4 || !values.otp5 || !values.otp6) {
              errors.otp = "All OTP fields are required.";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleOtpSubmit(values);
            setSubmitting(false);
            resetForm();
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
              <div className="flex justify-between mb-4">
                {/* Render each OTP input */}
                {[...Array(6)].map((_, index) => {
                  const otpField = `otp${index + 1}`;
                  return (
                    <input
                      key={index}
                      type="text"
                      name={otpField}
                      maxLength={1} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values[otpField]}
                      className="otp-input w-1/6 p-2 border-b-2 focus:border-primary focus:outline-none text-center"
                      placeholder="-"
                      inputMode="numeric" // Ensures numeric keypad on mobile
                    />
                  );
                })}
              </div>


              {/* Submit Button */}
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            </form>
          )}
        </Formik>

        {/* Back to Login or Resend OTP */}
        <div className="text-center mt-5">
          <button
            className="text-blue-600 hover:text-blue-700 focus:outline-none"
            onClick={() => alert('Resend OTP functionality goes here!')}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
