import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import Modal from 'react-modal';
import CategoryModal from '../components/CategoryModal';
import EditCategoryModal from '../components/EditCategoryModal';
import api from '../../utility/api';
import toast from 'react-hot-toast';

const Category = () => {
  const [addModel, setAddModel] = useState(false);
  const [category, setCategory] = useState([]);
  const [editModel, setEditModel] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [path, setPath] = useState('');
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    categoryId: null,
  });


  console.log("editCategoryIdqqqq",editCategoryId)

  const getcategory = async () => {
    const res = await api.get('/get-categories');
    console.log("res",res)
    setCategory(res.data.data);
    setPath(res.data.filepath);
    
  };

  const confirmDelete = (categoryId) => {
    setDeleteModal({ isOpen: true, categoryId: categoryId });
  };

  const handleDelete = async () => {
    try {
      const res = await api.delete(`/delete-category/${deleteModal.categoryId}`);
      if (res.data && res.data.success) {
        getcategory();
        toast.success(res.data.message)
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      setDeleteModal({ isOpen: false, categoryId: null });
    }
  };

  useEffect(() => {
    getcategory();
  }, []);


  return (
    <>
      <div className="container mx-auto mt-5 px-4">
        <div className="flex flex-col">
          <div className="flex justify-between items-center bg-gray-200 px-10 py-6 mb-5">
            <h1 className="text-3xl">Category</h1>
            <button
              onClick={() => setAddModel(true)}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600"
            >
              Add Category
            </button>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
            <table className="min-w-full table-auto bg-white border-separate border-spacing-0">
              {/* Header stays sticky */}
              <thead>
              <tr className="bg-gray-100 text-gray-600">
              <th className="py-3 px-4 text-left border-b border-gray-200 ">Id</th>
                  <th className="py-3 px-4 text-left border-b border-gray-200 ">Image</th>
                  <th className="py-3 px-4 text-left border-b border-gray-200 ">Name</th>
                  <th className="py-3 px-4 text-left border-b border-gray-200 ">Gender</th>
                  <th className="py-3 px-4 text-left border-b border-gray-200 ">Action</th>
                </tr>
              </thead>
              {/* Table body with scroll */}
              <tbody>
                {Array.isArray(category) && category.length > 0 ?(
                category && category.map((elem, ind) => (
                  <tr key={elem._id}>
                    <td className="py-3 px-4 border-b border-gray-200">{++ind}</td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      <img src={path + elem.image} alt={elem.image} className="w-16 h-16" />
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">{elem.name}</td>
                    <td className="py-3 px-4 border-b border-gray-200">{elem.lavel}</td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      <button
                        onClick={() => {
                          setEditCategoryId(elem._id);
                          setEditModel(true);
                        }}
                        className="bg-blue-400 text-white py-1 px-1 rounded-md shadow-md hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105 ml-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => confirmDelete(elem._id)}
                        className="bg-red-400 text-white py-1 px-1 rounded-md shadow-md hover:bg-red-600 transition duration-200 ease-in-out transform hover:scale-105 ml-2"
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-3  text-center text-gray-600">
                    No categories found
                  </td>
                </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CategoryModal isVisible={addModel} getcategory={getcategory} onClose={() => setAddModel(false)} />
        
        {/* Edit Modal */}
      <EditCategoryModal
        isVisible={editModel}
        editCategoryId={editCategoryId}
        getcategory={getcategory}
        onClose={() => setEditModel(false)}
      />

      <Modal
        isOpen={deleteModal.isOpen}
        onRequestClose={() => setDeleteModal({ isOpen: false, categoryId: null })}
        style={{
          overlay: { backgroundColor: 'rgba(0,0,0,0.5)' },
        }}
        className="w-1/4 sm:w-1/3 bg-white rounded-md mx-auto mt-20 p-6 text-center"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this category?</p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
            onClick={handleDelete}
          >
            Yes, Delete
          </button>
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
            onClick={() => setDeleteModal({ isOpen: false, categoryId: null })}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Category;