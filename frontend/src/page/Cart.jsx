import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext'; // Assuming you have a CartContext for global state
import { useNavigate } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

const Cart = () => {
  const { cartItems = [], increaseQuantity, decreaseQuantity, removeFromCart, clearCart, loading, path } = useContext(CartContext);
  const [shippingFee] = useState(50);
  const navigate = useNavigate();

  // Ensure cartItems is an array before using reduce
  const totalProductPrice = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + (item?.productId?.price || 0) * item?.quantity, 0).toFixed(2)
    : 0;

  const finalTotal = (parseFloat(totalProductPrice) + shippingFee).toFixed(2);

  if (loading) return <div className="text-center text-xl">Loading...</div>;

  // Handle checkout button click
  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="max-w-screen-xl mx-auto py-8 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button
              onClick={clearCart}
              className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          {/* Table for cart items */}
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-300">
                <tr>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Product Name</th>
                  <th className="py-3 px-4 text-left">Size</th>
                  <th className="py-3 px-4 text-left">Color</th> {/* Add Color Column */}
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Quantity</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(cartItems) && cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <tr key={item?._id} className="border-b bg-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-4">
                        <img
                          src={path + item?.productId?.thumbnail} // Ensure thumbnail exists
                          alt={item?.productId?.title || 'Product Image'} // Ensure title exists
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      </td>
                      <td className="py-3 px-4">{item?.productId?.title || 'Product Name'}</td>
                      <td className="py-3 px-4">{item?.size || 'Size not available'}</td>
                      <td className="py-3 px-4">{item?.color || 'Color not available'}</td>
                      <td className="py-3 px-4">₹{(item?.productId?.price || 0).toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-3 items-center justify-center">
                          <button
                            onClick={() => decreaseQuantity(item?._id)}
                            className="bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors px-1 flex items-center justify-center"
                          >
                            <FaMinus className="text-xl" />
                          </button>
                          <span>{item?.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item?._id)}
                            className="bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors px-2 py-1 flex items-center justify-center"
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => removeFromCart(item?._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors"
                        >
                          <MdDeleteForever />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500">Your cart is empty.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Price Section */}
        <div className="w-full lg:w-1/3 bg-gray-200 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-lg">
              <span>Total Product Price:</span>
              <span>₹{totalProductPrice}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>Shipping Fee:</span>
              <span>₹{shippingFee.toFixed(2)}</span>
            </div>
            <div className="border-t pt-4 flex justify-between text-xl font-bold">
              <span>Final Total:</span>
              <span>₹{finalTotal}</span>
            </div>
            <div className="mt-6">
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
