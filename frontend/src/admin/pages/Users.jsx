import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import api from '../../utility/api'; 

const Users = () => {
  const [users, setUsers] = useState([]);  

  useEffect(() => {
    api.get('/get-users')
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          console.error('Expected an array, but got', response.data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []); 

  const handleDelete = (id) => {
    api.delete(`/delete-user/${id}`)
      .then(() => {
        // Filter out the deleted user from the state
        setUsers(users.filter(user => user._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div className="container mx-auto mt-5 px-4">
      <div className="flex flex-col">
        <div className="flex justify-between items-center bg-gray-200 px-10 py-6 mb-5">
          <h1 className="text-3xl">Users</h1>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="py-3 px-4 text-left border-b border-gray-200">ID</th>
                <th className="py-3 px-4 text-left border-b border-gray-200">Name</th>
                <th className="py-3 px-4 text-left border-b border-gray-200">Email</th>
                <th className="py-3 px-4 text-left border-b border-gray-200">Contact</th>
                <th className="py-3 px-4 text-left border-b border-gray-200">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (  // Check if users array has data
                users.map((item) => (
                  <tr key={item._id || item.id} className="hover:bg-gray-50"> {/* Using _id or id as the unique key */}
                    <td className="py-3 px-4 border-b border-gray-200">{item._id}</td>
                    <td className="py-3 px-4 border-b border-gray-200">{item.name}</td>
                    <td className="py-3 px-4 border-b border-gray-200">{item.email}</td>
                    <td className="py-3 px-4 border-b border-gray-200">{item.contact}</td>

                    <td className="py-3 px-4 border-b border-gray-200">
                      <button
                        // Edit button logic can be added here if needed
                        className="bg-blue-400 text-white py-1 px-1 rounded-md shadow-md hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105 ml-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}  // Call delete function
                        className="bg-red-400 text-white py-1 px-1 rounded-md shadow-md hover:bg-red-600 transition duration-200 ease-in-out transform hover:scale-105 ml-2"
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-3 px-4 text-center text-gray-500">
                    No users available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
