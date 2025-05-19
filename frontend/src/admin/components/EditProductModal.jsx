import React, { useEffect, useRef, useState } from 'react';
import { IoClose } from "react-icons/io5";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditProductModal = ({ isVisible, onClose, children, getProduct, editProductId }) => {
    const navigate = useNavigate();
    const [path, setPath] = useState('');
    const imgRef = useRef();
    const [categories, setCategories] = useState([]);
    const [brand, setBrand] = useState([]);
    const [product, setProduct] = useState({});

    // fetch product data from backend
    useEffect(() => {
        if (editProductId) {
            axios.get(`http://localhost:8000/get-product/${editProductId}`)
                .then((res) => {
                    setProduct(res.data.data);
                    setPath(res.data.filepath);
                    console.log('Product fetched:', res.data.data);
                })
                .catch(err => console.error(err));
        }
    }, [editProductId]);

    // fetch categories and brand data from backend
    useEffect(() => {
        axios.get('http://localhost:8000/get-categories')
            .then((res) => setCategories(res.data.data))
            .catch(err => console.error(err));

        axios.get('http://localhost:8000/get-brands')
            .then((res) => setBrand(res.data.data))
            .catch(err => console.error(err));
    }, []);

    // modal close handler
    if (!isVisible) return null;
    const handleClose = (e) => {
        if (e.target.id === 'wrapper') onClose();
    };

    return (
        <div onClick={handleClose} id='wrapper' className='z-[60] fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
            <div className="w-full sm:w-[400px] md:w-[600px] lg:w-[800px] xl:w-[1000px] flex flex-col bg-white p-4 rounded relative">
                <button onClick={() => onClose()} className="text-black text-4xl absolute right-0 top-0 z-[70]">
                    <IoClose />
                </button>

                {children}

                {/* Form starts here */}
                <Formik
                    initialValues={{
                        title: product.title,
                        price: product.price,
                        oldprice: product.oldprice,
                        category: product.category,
                        quantity: product.quantity,
                        color: product.color,
                        size: product.size,
                        description: product.description,
                        brand: product.brand,
                        thumbnail:product.thumbnail,
                        images: product.images || []
                    }}
                    enableReinitialize={true}
                    validate={(values) => {
                        const errors = {};
                        if (!values.title) errors.title = "Title is required";
                        if (!values.price) errors.price = "Price is required";
                        if (!values.oldprice) errors.oldprice = "Old Price is required";
                        if (!values.category) errors.category = "Category is required";
                        if (!values.quantity) errors.quantity = "Quantity is required";
                        if (!values.color) errors.color = "Color is required";
                        if (!values.size) errors.size = "Size is required";
                        if (!values.brand) errors.brand = "Brand is required";
                        if (!values.description) errors.description = "Description is required";
                        if (!values.thumbnail) errors.thumbnail = "Thumbnail is required";
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true);

                        console.log("onSubmit")

                        const formData = new FormData();
                        formData.append('title', values.title);
                        formData.append('price', values.price);
                        formData.append('oldprice', values.oldprice);
                        formData.append('quantity', values.quantity);
                        formData.append('category', values.category);
                        formData.append('color', values.color);
                        formData.append('size', values.size);
                        formData.append('brand', values.brand);
                        formData.append('description', values.description);
                        if (imgRef.current.files[0]) {
                            formData.append('thumbnail', imgRef.current.files[0]);
                        }

                        // API call to update product
                        axios.put(`http://localhost:8000/update-product/${editProductId}`, formData)
                            .then(res => {
                                console.log(res);
                                resetForm();
                                onClose();
                                toast.success(res.data.message)
                                navigate('/admin/products');
                                getProduct(); // Reload product list after update
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
                        isSubmitting
                    }) => (
                        <form onSubmit={handleSubmit} className="space-y-4 p-5">
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.title}
                                    />
                                    {errors.title && touched.title && <span style={{ color: "red" }}>{errors.title}</span>}
                                </div>
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        min="0"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.price}
                                    />
                                    {errors.price && touched.price && <span style={{ color: "red" }}>{errors.price}</span>}
                                </div>
                                <div>
                                    <label htmlFor="oldprice" className="block text-sm font-medium">Sale Price</label>
                                    <input
                                        type="number"
                                        name="oldprice"
                                        min="0"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.oldprice}
                                    />
                                    {errors.oldprice && touched.oldprice && <span style={{ color: "red" }}>{errors.oldprice}</span>}
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
                                    <input
                                        type="text"
                                        name="size"
                                        placeholder="size"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"

                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.size}
                                    />
                                    <span style={{ color: "red" }}>
                                        {errors.size && touched.size && errors.size}
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
                                        type="file"
                                        name="thumbnail"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        ref={imgRef}
                                    />

                                    {path && product.thumbnail && (
                                        <img
                                            src={`${path}/${product.thumbnail}`}
                                            alt={product.title}
                                            className="h-16 mt-2"
                                        />
                                    )}
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
    );
}

export default EditProductModal;
