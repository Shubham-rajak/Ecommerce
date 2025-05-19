import React, { useRef } from 'react'
import { IoClose } from "react-icons/io5";
import { Formik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const CategoryModal = ({ isVisible, onClose, children, getcategory}) => {
    const navigate = useNavigate()
    const imgRef = useRef()
    if (!isVisible) return null
    
    const handleClose = (e) => {
        if (e.target.id === 'wrapper') onClose()
    }

    return (
        
       <div onClick={handleClose} id='wrapper' className='z-[60] fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
       
       
            <div className="w-full sm:w-[400px] md:w-[600px] lg:w-[800px] xl:w-[1000px] flex flex-col bg-white p-4 rounded relative">
                <button onClick={() => onClose()} className="text-black text-4xl absolute right-0 top-0 z-[70]">
                    <IoClose />
                </button>
       
            {children}

               {/* Form start heare */}

               <Formik
                    initialValues={{ name: "", lavel: "", image: ""}}
                    validate={(values) => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = "Name is required";
                        }

                        if (!values.lavel) {
                            errors.lavel = "Lavel is required";
                        }
                        if (!values.image) {
                            errors.image = "Image is required";
                        }
                       
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting,resetForm }) => {
                        setTimeout(() => {

                            const formdata = new FormData()
                            formdata.append('name', values.name);
                            formdata.append('lavel', values.lavel);    
                            formdata.append('image', imgRef.current.files[0]);
                            console.log(formdata)
                            // add user api call
                            axios.post("http://localhost:8000/add-category", formdata)
                                .then(res => {
                                    console.log(res)
                                    resetForm(); 
                                    onClose(); 
                                    toast.success(res.data.message)
                                    navigate('/admin/categories');
                                    getcategory();
                                })
                                .catch(err => {
                                    // Handling server-side validation errors
                                    if (err.response && err.response.data && err.response.data.message) {
                                        setErrors({
                                           alert: err.response.data.message // Show server error message
                                        });
                                    } else {
                                        console.error("An error occurred:", err);
                                    }
                                })
                            setSubmitting(false);
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
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit} className="space-y-4 p-5">
                            <div className='grid grid-cols-3 gap-4'>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="name"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                    />
                                    <span style={{ color: "red" }}>
                                        {errors.name && touched.name && errors.name}
                                    </span>
                                </div>

                                <div>
                                    <label htmlFor="lavel" className="block text-sm font-medium">Gender</label>
                                    <input
                                        type="text"
                                        name="lavel"
                                        placeholder="gender"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.lavel}
                                    />
                                    <span style={{ color: "red" }}>
                                        {errors.lavel && touched.lavel && errors.lavel}
                                    </span>
                                </div>


                                <div>
                                    <label htmlFor="image" className="block text-sm font-medium">image</label>
                                    <input
                                        type="file"  // Fixed type for file input
                                        name="image"
                                        placeholder="image"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        ref={imgRef}
                                        value={values.image}
                                    />
                                    <span style={{ color: "red" }}>
                                        {errors.image && touched.image && errors.image}
                                    </span>
                                </div>

                            </div>
                            <div className="mt-3">
                                <button
                                    type="submit"
                                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    disabled={isSubmitting}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>

            </div>
        </div>
    )
}

export default CategoryModal



