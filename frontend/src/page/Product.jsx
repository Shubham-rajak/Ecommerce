import React, { useContext} from "react";
import { ShopContext } from "../context/ShopContext";
import { CartContext } from "../context/CartContext";
import { NavLink } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { MdFavoriteBorder } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";

const Product = () => {
  const {
    products,
    category,
    sortOrder,
    setSortOrder,
    isLoading,
    error,
    path,
    getProductByCategory
    
  } = useContext(ShopContext);

  const { addToCart } = useContext(CartContext);


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleAddToCart = (productId, size, color) => {
    addToCart(productId, size, color);
  };

  const onChangeHandler = (e) =>{
    getProductByCategory(e.target.value)
  }
  return (
    <div className="container">
      <div className="grid grid-cols-5 min-h-screen bg-gray-200">
        {/* Sidebar */}
        <div className="col-span-1 p-4">
            <h1 className="text-2xl font-semibold">
              Filter
            </h1>
          <div className="">
            <h4 className="text-xl font-semibold my-2 mx-7">Categories</h4>
            <div className="w-full py-3">
              <select
                value={category}
                onChange={onChangeHandler}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Category</option>
                {category && category.length > 0 ? (
                  category.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option>No categories available</option>
                )}
              </select>
            </div>
          </div>


          <div className="mt-4">
            <h4 className="text-xl font-semibold my-4 mx-7">Sort</h4>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Default</option>
              <option value="latest">Newest added</option>
              <option value="htol">High to Low</option>
              <option value="ltoh">Low to High</option>
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-4 bg-gray-100 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-gray-50">
            {products.length > 0 ? (
              products.map((elem) => (
                <NavLink
                  to={`/singleProduct/${elem._id}`}
                  key={elem._id}
                  className="col-span-1 shadow-xl group flex flex-col justify-center items-center rounded-xl border-2"
                >
                  <div className="relative w-full h-56 mb-4 p-2">
                    <img
                      src={path + elem.thumbnail}
                      alt={elem.name}
                      className="w-full h-56 rounded-tr-xl rounded-tl-xl transform transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-5 opacity-0 transition duration-500 group-hover:opacity-100 flex justify-center items-center gap-3">
                      <button className="bg-[#E8F6EA] text-primary p-3 rounded-full hover:bg-[#088178] hover:text-white">
                        <GrView />
                      </button>
                      <button className="bg-[#E8F6EA] text-primary p-3 rounded-full hover:bg-[#088178] hover:text-white">
                        <MdFavoriteBorder />
                      </button>
                      <button className="bg-[#E8F6EA] text-primary p-3 rounded-full hover:bg-[#088178] hover:text-white">
                        <FiShoppingCart onClick={() => handleAddToCart(elem._id, 'M', 'Red')} />
                      </button>
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <h5 className="text-lg font-semibold">{elem.title}</h5>
                    <div className="flex items-center justify-center">
                      <span className="text-primary font-semibold">₹{elem.price}</span>
                      {elem.oldPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ₹{elem.oldPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </NavLink>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">No products available.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
