import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProductModal = ({ isVisible, onClose, children, getProduct }) => {
    const navigate = useNavigate()
    const imgRef = useRef()
    const [categories, setCategories] = useState([])
    const [brand, setBrand] = useState([])
    const [size, setSize] = useState(null);

    // fetch categories data from backend
    useEffect(() => {
        axios.get('http://localhost:8000/get-categories')
            .then((res) => {
                setCategories(res.data.data)
            })
            .catch(err => console.error(err))
    }, [])

    // fetch brand data from backend
    useEffect(() => {
        axios.get('http://localhost:8000/get-brands')
            .then((res) => {
                setBrand(res.data.data)
            })
            .catch(err => console.error(err))
    }, [])



    console.log(categories)
    console.log(brand)

    // Handle size selection toggle
    const handleSizeClick = (size) => {
        setSelectedSizes(size); // Set the clicked size as the selected one
    };


    // modal close
    if (!isVisible) return null
    const handleClose = (e) => {
        if (e.target.id === 'wrapper') onClose()
    }

    // console.log(categories)

    return (
        <div onClick={handleClose} id='wrapper' className='z-[60] fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>

            <div className="w-full sm:w-[400px] md:w-[600px] lg:w-[800px] xl:w-[1000px] flex flex-col bg-white p-4 rounded relative">
                <button onClick={() => onClose()} className="text-black text-4xl absolute right-0 top-0 z-[70]">
                    <IoClose />
                </button>

                {children}

                {/* Form starts here */}
                <Formik
                    initialValues={{ title: "", price: "", oldprice: "", category: "", quantity: "", color: "", size: [], description: "", brand: "", thumbnail: "", subCategory: "", }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.title) {
                            errors.title = "Tittle is required";
                        }

                        if (!values.price) {
                            errors.price = "Price is required";
                        }
                        if (!values.oldprice) {
                            errors.oldprice = "Oldprice is required";
                        }
                        if (!values.category) {
                            errors.category = "Category is required";
                        }
                        if (!values.quantity) {
                            errors.quantity = "Quantity is required";
                        }
                        if (!values.color) {
                            errors.color = "Color is required";
                        }
                        if (!values.size.length) {
                            errors.size = "Size is required";
                        }
                        if (!values.brand) {
                            errors.brand = "Brand is required";
                        }
                        if (!values.description) {
                            errors.description = "Description is required";
                        }
                        if (!values.subCategory) {
                            errors.subCategory = "subCategory is required";
                        }

                        if (!values.thumbnail) {
                            errors.thumbnail = "Thumbnail is required";
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setTimeout(() => {

                            console.log('Form Values', values);

                            const formdata = new FormData()
                            formdata.append('title', values.title);
                            formdata.append('price', values.price);
                            formdata.append('oldprice', values.oldprice);
                            formdata.append('quantity', values.quantity);
                            formdata.append('category', values.category);
                            formdata.append('color', values.color);
                            formdata.append('size', values.size);
                            formdata.append('brand', values.brand);
                            formdata.append('description', values.description);
                            formdata.append('subCategory', values.subCategory);
                            formdata.append('thumbnail', imgRef.current.files[0]);
                            // console.log(formdata)
                            // add user api call
                            axios.post("http://localhost:8000/add-product", formdata)
                                .then(res => {
                                    console.log(res)
                                    resetForm();
                                    onClose();
                                    toast.success(res.data.message)
                                    navigate('/admin/products');
                                    getProduct();
                                })
                                .catch(err => console.log(err))
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
                        setFieldValue,

                    }) => (
                        <form onSubmit={handleSubmit} className="space-y-4 p-5">
                            <div className='grid grid-cols-3 gap-4'>
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="title"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.title}
                                    />
                                    <span style={{ color: "red" }}>
                                        {errors.title && touched.title && errors.title}
                                    </span>
                                </div>

                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="price"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.price}
                                        min="0"
                                    />
                                    <span style={{ color: "red" }}>
                                        {errors.price && touched.price && errors.price}
                                    </span>
                                </div>
                                <div>
                                    <label htmlFor="oldprice" className="block text-sm font-medium">SalePrice</label>
                                    <input
                                        type="number"
                                        name="oldprice"
                                        placeholder="saleprice"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"

                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.oldprice}
                                        min="0"
                                    />
                                    <span style={{ color: "red" }}>
                                        {errors.oldprice && touched.oldprice && errors.oldprice}
                                    </span>
                                </div>

                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium">Category</label>
                                    <select
                                        name="category"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.category}
                                    >
                                        <option value="" disabled>Select a Category</option>
                                        {
                                            categories && categories.map(category => {
                                                return <option key={category._id} value={category._id} >{category.name}</option>
                                            })
                                        }
                                    </select>
                                    <span style={{ color: "red" }}>
                                        {errors.category && touched.category && errors.category}
                                    </span>
                                </div>

                                <div>
                                    <label htmlFor="brand" className="block text-sm font-medium">Brand</label>
                                    <select
                                        name="brand"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        <option value="" disabled>Select a brand</option>
                                        {
                                            brand && brand.map(brand => {
                                                return <option key={brand._id} value={brand._id} >{brand.name}</option>
                                            })
                                        }
                                    </select>
                                    <span style={{ color: "red" }}>
                                        {errors.brand && touched.brand && errors.brand}
                                    </span>
                                </div>


                                <div>
                                    <label htmlFor="quantity" className="block text-sm font-medium">Quantity</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        placeholder="quantity"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"

                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.quantity}
                                        min="0"
                                    />
                                    <span style={{ color: "red" }}>
                                        {errors.quantity && touched.quantity && errors.quantity}
                                    </span>
                                </div>

                                <div>
                                    <label htmlFor="color" className="block text-sm font-medium">Color</label>
                                    <input
                                        type="text"
                                        name="color"
                                        placeholder="color"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"

                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.color}
                                    />
                                    <span style={{ color: "red" }}>
                                        {errors.color && touched.color && errors.color}
                                    </span>
                                </div>

                                <div>
                                    <label htmlFor="size" className="block text-sm font-medium">Size</label>
                                    <div className="mt-2 flex space-x-4">
                                        {["S", "M", "L", "XL", "XXL"].map((size) => (
                                            <label
                                                key={size}
                                                className={`py-2 px-4 border rounded-full transition-all
                                    ${values.size.includes(size) ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}
                                    hover:bg-blue-500 hover:text-white cursor-pointer`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    name="size"
                                                    value={size}
                                                    checked={values.size.includes(size)} // Check if size is selected
                                                    onChange={() => {
                                                        const newSizeArray = values.size.includes(size)
                                                            ? values.size.filter((item) => item !== size)  // Remove size from array if unselected
                                                            : [...values.size, size];  // Add size to array if selected

                                                        setFieldValue('size', newSizeArray); // Update Formik's size field
                                                    }}
                                                    onBlur={handleBlur}
                                                    className="hidden" // Hide the checkbox input, only show label as button
                                                />
                                                {size} {/* Size label */}
                                            </label>
                                        ))}
                                    </div>
                                    {errors.size && touched.size && <span style={{ color: "red" }}>{errors.size}</span>}
                                </div>



                                {/* Gender dropdown */}
                                <div>
                                    <label htmlFor="gender" className="block text-sm font-medium">Gender</label>
                                    <select
                                        name="subCategory"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.subCategory}
                                    >
                                        <option value="" disabled>Select Gender</option>
                                        <option value="Men">Men</option>
                                        <option value="Women">Women</option>
                                        <option value="Child">Child</option>
                                    </select>
                                    <span style={{ color: "red" }}>
                                        {errors.gender && touched.gender && errors.gender}
                                    </span>
                                </div>


                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium">Description</label>
                                    <input
                                        type="text"
                                        name="description"
                                        placeholder="description"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description}
                                    />
                                    <span style={{ color: 'red' }}>
                                        {errors.description && touched.description && errors.description}
                                    </span>
                                </div>




                                <div>
                                    <label htmlFor="thumbnail" className="block text-sm font-medium">Thumbnail</label>
                                    <input
                                        type="file"  // Fixed type for file input
                                        name="thumbnail"
                                        placeholder="thumbnail"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        ref={imgRef}
                                        value={values.thumbnail}
                                    />
                                    <span style={{ color: "red" }}>
                                        {errors.thumbnail && touched.thumbnail && errors.thumbnail}
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
                            {console.log('issubmiting', isSubmitting)}
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default ProductModal
