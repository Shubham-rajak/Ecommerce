import React, { useState } from 'react';
import { Formik } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utility/api';

const UpdatePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Added for toggle visibility
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (values) => {
        try {
            const response = await api.post("/update-password", { password: values.password });

            if (response.data && response.data.message) {
                setSuccessMessage("Password updated successfully!");
                setError('');
                setTimeout(() => navigate('/login'), 2000); // Navigate after a short delay
            }
        } catch (error) {
            console.error("Error updating password:", error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="max-w-[450px] w-[400px] px-8 py-6 border-2 border-gray-300 rounded-lg shadow-lg bg-white">
                <h2 className="text-2xl font-bold text-center mb-6">Update Password</h2>

                {/* Display Backend Error */}
                {error && <div className="text-red-500">{error}</div>}
                {successMessage && <div className="text-green-500">{successMessage}</div>}

                <Formik
                    initialValues={{ password: "", confirmPassword: "" }}
                    validate={(values) => {
                        const errors = {};

                        if (!values.password) {
                            errors.password = "Password is required.";
                        } else if (values.password.length < 6) {
                            errors.password = "Password must be at least 6 characters.";
                        }

                        if (!values.confirmPassword) {
                            errors.confirmPassword = "Confirm Password is required.";
                        } else if (values.confirmPassword !== values.password) {
                            errors.confirmPassword = "Passwords do not match.";
                        }

                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        handleSubmit(values);
                        setSubmitting(false);
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                            {/* New Password Field */}
                            <div className="mb-4 relative">
                                <div className="flex justify-center items-center">
                                    <RiLockPasswordLine />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        onChange={handleChange}
                                        className="w-full p-2 border-b-2 focus:border-primary focus:border-b-2 focus:outline-none"
                                        placeholder="New Password"
                                        onBlur={handleBlur}
                                        value={values.password}
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
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            {/* Confirm Password Field */}
                            <div className="mb-4 relative">
                                <div className="flex justify-center items-center">
                                    <RiLockPasswordLine />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        onChange={handleChange}
                                        className="w-full p-2 border-b-2 focus:border-primary focus:border-b-2 focus:outline-none"
                                        placeholder="Confirm Password"
                                        onBlur={handleBlur}
                                        value={values.confirmPassword}
                                    />
                                </div>
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>
                                )}
                                <button
                                    type="button"
                                    onClick={handleToggleConfirmPassword}
                                    className="absolute right-2 top-2 text-gray-500"
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Update Password'}
                            </button>

                            <div className='flex flex-col justify-center items-center'>
                                <div className='w-full flex justify-center flex-col bg-slate-200 hover:bg-slate-400 mt-5 text-center py-2 rounded-lg font-medium text-primary hover:text-white focus:outline-none focus:underline transition ease-in-out duration-150'>
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

export default UpdatePassword;
