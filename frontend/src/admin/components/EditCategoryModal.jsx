import React, { useEffect, useRef, useState } from 'react';
import { IoClose } from "react-icons/io5";
import { Formik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditCategoryModal = ({ isVisible, onClose, children, getcategory, editCategoryId }) => {
    const [category, setCategory] = useState({});
    const [path, setPath] = useState('')
    const imgRef = useRef();
    const navigate = useNavigate();

    console.log("categoryId", editCategoryId);


    useEffect(() => {
        if (editCategoryId)
            axios.get(`http://localhost:8000/get-category/${editCategoryId}`)
                .then(res => {
                    setCategory(res.data.data);
                    setPath(res.data.filepath);
                    console.log('hdvcjdvcj', res.data.data)
                })
                .catch(err => console.error(err));
    }, [editCategoryId]);

    const handleClose = (e) => {
        if (e.target.id === 'wrapper') onClose();
    };

    if (!isVisible) return null;

    return (
        <div onClick={handleClose} id='wrapper' className='z-[60] fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
            <div className="w-full sm:w-[400px] md:w-[600px] lg:w-[800px] xl:w-[1000px] flex flex-col bg-white p-4 rounded relative">
                <button onClick={() => onClose()} className="text-black text-4xl absolute right-0 top-0 z-[70]">
                    <IoClose />
                </button>

                {children}

                {/* Form starts here */}
                {console.log('hello', editCategoryId)}
                <Formik
                    initialValues={{ name: category.name, lavel: category.lavel, image: category.image }}
                    enableReinitialize={true}
                    validate={(values) => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = "Name is required";
                        }

                        if (!values.lavel) {
                            errors.lavel = "Lavel is required";
                        }
                        if (!values.image && !category.image) {
                            errors.image = "Image is required";
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true);

                        const formData = new FormData();
                        formData.append('name', values.name);
                        formData.append('lavel', values.lavel);
                        if (imgRef.current.files[0]) {
                            formData.append('image', imgRef.current.files[0]);
                        }

                        axios.put(`http://localhost:8000/update-category/${editCategoryId}`, formData)
                            .then(res => {
                                resetForm();
                                onClose();
                                toast.success(res.data.message)
                                navigate('/admin/categories');
                                getcategory(); // Refresh categories after update
                            })
                            .catch(err => {
                                if (err.response && err.response.data && err.response.data.message) {
                                    alert(err.response.data.message);
                                    console.error("An error occurred:", err);
                                }
                            });

                        setSubmitting(false);
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
                                    <label htmlFor="lavel" className="block text-sm font-medium">Lavel</label>
                                    <input
                                        type="text"
                                        name="lavel"
                                        placeholder="lavel"
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
                                    <label htmlFor="image" className="block text-sm font-medium">Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        placeholder="image"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 "
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        ref={imgRef}
                                        
                                    />
                                    
                                    {path && (
                                       
                                       <img src={path + '/' + category.image} alt={category.name} className=" w-10 h-10" />
                                   
                               )}
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
                                    Update
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>

            </div>
        </div>
    );
}

export default EditCategoryModal;
