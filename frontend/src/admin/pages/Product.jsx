import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import ProductModal from '../components/ProductModal';
import Modal from 'react-modal'
import api from '../../utility/api';
import EditProductModal from '../components/EditProductModal';
import toast from 'react-hot-toast';

const Product = () => {
  const [addModel, setAddModel] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [product, setProduct] = useState([]);
  const [path, setPath] = useState('');
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    categoryId: null,
  });

// console.log('productidddddd' , editProductId);

  // fetch API  or get product
  const getProduct = async () => {
    const res = await api.get("/get-products")
    console.log(res);
    setProduct(res.data.data);
    setPath(res.data.filepath);

  }

  // delete product

  const confirmDelete = (productId) => {
    setDeleteModal({ isOpen: true, productId: productId });
  };

  const deleteProduct = async () => {
    try {
      await api.delete(`/delete-product/${deleteModal.productId}`);
      if (res.data && res.data.success) {
        getProduct();
        toast.success(res.data.message)
      }
    } catch (error) {
      console.error('Error deleting products:', error);
    } finally {
      setDeleteModal({ isOpen: false, productId: null });
    }

  };


  // get product
  useEffect(() => {
    getProduct();
  }, [])

  return (
    <>
      <div className="container mx-auto mt-5 px-4">
        <div className="flex flex-col">
          <div className="flex justify-between items-center bg-gray-200 px-10 py-6 mb-5">
            <h1 className="text-3xl">Products</h1>
            <button
              onClick={() => setAddModel(true)}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600"
            >
              Add Products
            </button>
          </div>

          <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
            <table className="min-w-full table-auto bg-white border-separate border-spacing-0">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="py-3 px-4 text-left border-b border-gray-200">Id</th>
                  <th className="py-3 px-4 text-left border-b border-gray-200">Image</th>
                  <th className="py-3 px-4 text-left border-b border-gray-200">Title</th>
                  <th className="py-3 px-4 text-left border-b border-gray-200">Category</th>
                  <th className="py-3 px-4 text-left border-b border-gray-200">Brand</th>
                  <th className="py-3 px-4 text-left border-b border-gray-200">size</th>
                  <th className="py-3 px-4 text-left border-b border-gray-200">Price</th>
                  <th className="py-3 px-4 text-left border-b border-gray-200">Action</th>
                </tr>
              </thead>

              <tbody>
                {Array.isArray(product) && product.length > 0 ? (
                  product.map((elem, ind) => (
                    <tr key={elem._id}>
                      <td className="py-3 px-4 border-b border-gray-200">{++ind}</td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        <img src={path + elem.thumbnail} alt={elem.thumbnail} className='w-16 h-16' />
                      </td>

                      <td className="py-3 px-4 border-b border-gray-200">{elem.title}</td>
                      <td className="py-3 px-4 border-b border-gray-200">{elem.category?.name }</td>
                      <td className="py-3 px-4 border-b border-gray-200">{elem.brand?.name || 'N/A'}</td>
                      <td className="py-3 px-4 border-b border-gray-200">{elem.size}</td>
                      <td className="py-3 px-4 border-b border-gray-200">{elem.price}</td>


                      <td className="py-3 px-4 border-b border-gray-200">
                        <button 
                        onClick={() =>{
                          setEditProductId(elem._id);
                          setEditModal(true);
                        }}
                       className="bg-blue-400 text-white py-1 px-1 rounded-md shadow-md hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105 ml-2 ">
                          <FaEdit />
                        </button>
                        <button onClick={() => confirmDelete(elem._id)}
                          className="bg-red-400 text-white py-1 px-1 rounded-md shadow-md hover:bg-red-600 transition duration-200 ease-in-out transform hover:scale-105 ml-2 ">
                          <MdDeleteForever />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-3">No products available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <ProductModal isVisible={addModel} getProduct={getProduct} onClose={() => setAddModel(false)} />

        {/* Edit Modal */}
        <EditProductModal
          isVisible={editModal}
          editProductId = {editProductId}
          getProduct={getProduct}
          onClose={() => setEditModal(false)}

        />

      <Modal
        isOpen={deleteModal.isOpen}
        onRequestClose={() => setDeleteModal({ isOpen: false, productId: null })}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
        }}
        className='w-[30%] bg-white rounded-md mx-auto mt-20 p-6 text-center'
      >
        <h2 className='text-xl font-semibold text-gray-800 mb-4'>Confirm Deletion</h2>
        <p className='text-gray-600 mb-6'>Are you sure you want to delete this category?</p>
        <div className='flex justify-center gap-4'>
          <button
            className='bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300'
            onClick={deleteProduct}
          >
            Yes, Delete
          </button>
          <button
            className='bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300'
            onClick={() => setDeleteModal({ isOpen: false, productId: null })}
          >
            Cancel
          </button>
        </div>
      </Modal>

    </>
  );
};

export default Product;
