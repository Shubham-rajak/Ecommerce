import React from 'react';

const Orders = () => {
  // Sample data
  const data = [
    { id: 1, name: 'John Doe', age: 28, job: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', age: 34, job: 'Designer' },
    { id: 3, name: 'Michael Brown', age: 45, job: 'Product Manager' },
    { id: 4, name: 'Sarah Lee', age: 32, job: 'Data Scientist' },
  ];

  return (
    <div className="container mx-auto mt-5 px-4">
      <div className='flex flex-col '>
      <div className="flex justify-between items-center bg-gray-200 px-10 py-6 mb-5">
          <h1 className='text-3xl'>Orders</h1>
          {/* <button
            className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600">
              Add Products
          </button> */}
        </div>

        <table className="min-w-full table-auto bg-white border-separate border-spacing-0">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="py-3 px-4 text-left border-b border-gray-200">Product</th>
            <th className="py-3 px-4 text-left border-b border-gray-200">Category</th>
            <th className="py-3 px-4 text-left border-b border-gray-200">Sub Category</th>
            <th className="py-3 px-4 text-left border-b border-gray-200">Brand</th>
            <th className="py-3 px-4 text-left border-b border-gray-200">Price</th>
            <th className="py-3 px-4 text-left border-b border-gray-200">Rating</th>
            <th className="py-3 px-4 text-left border-b border-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b border-gray-200">{item.id}</td>
              <td className="py-3 px-4 border-b border-gray-200">{item.name}</td>
              <td className="py-3 px-4 border-b border-gray-200">{item.age}</td>
              <td className="py-3 px-4 border-b border-gray-200">{item.job}</td>
              <td className="py-3 px-4 border-b border-gray-200">{item.job}</td>
              <td className="py-3 px-4 border-b border-gray-200">{item.job}</td>
              <td className="py-3 px-4 border-b border-gray-200">{item.job}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Orders;
