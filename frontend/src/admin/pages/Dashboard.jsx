import React, { useState, useEffect } from 'react'
import api from '../../utility/api'
import { FaUser, FaBox, FaTags } from 'react-icons/fa';

const Dashboard = () => {
  const [user, setUser] = useState([])
  const [product, setProduct] = useState([])
  const [category, setCategory] = useState([])

  const dataFetch = async () => {
    try {
      const userresponse = await api.get('/get-users')
      const categoryresponse = await api.get('/get-categories')
      const productresponse = await api.get('/get-products')
      setUser(userresponse.data.data)
      setProduct(productresponse.data.data)
      setCategory(categoryresponse.data.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    dataFetch()
  }, [])

  return (
    <div className="container mx-auto pt-5 px-4">
      <div className='flex justify-between items-center bg-gray-200 px-10 py-6 mb-5'>
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>
      </div>

      <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-6">
        {/* Users Card */}
        <div className="bg-blue-100 hover:bg-blue-200  border-blue-300 rounded-lg shadow-lg p-6 transition duration-300 ease-in-out transform hover:scale-105">
          <div className="flex items-center mb-4">
            <FaUser className="text-blue-600 text-4xl mr-4" />
            <h5 className="text-xl font-semibold text-blue-700">Users</h5>
          </div>
          <p className="text-lg text-blue-600">{user.length} Users</p>
        </div>

        {/* Products Card */}
        <div className="bg-green-100 hover:bg-green-200  border-green-300 rounded-lg shadow-lg p-6 transition duration-300 ease-in-out transform hover:scale-105">
          <div className="flex items-center mb-4">
            <FaBox className="text-green-600 text-4xl mr-4" />
            <h5 className="text-xl font-semibold text-green-700">Products</h5>
          </div>
          <p className="text-lg text-green-600">{product.length} Products</p>
        </div>

        {/* Categories Card */}
        <div className="bg-yellow-100 hover:bg-yellow-200  border-yellow-300 rounded-lg shadow-lg p-6 transition duration-300 ease-in-out transform hover:scale-105">
          <div className="flex items-center mb-4">
            <FaTags className="text-yellow-600 text-4xl mr-4" />
            <h5 className="text-xl font-semibold text-yellow-700">Categories</h5>
          </div>
          <p className="text-lg text-yellow-600">{category.length} Categories</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
