import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
// import { MdFavoriteBorder } from 'react-icons/md';
import { FiShoppingCart } from 'react-icons/fi';
import { GrView } from 'react-icons/gr';
import { ShopContext } from '../context/ShopContext';

const Feature = () => {
  const { products, path } = useContext(ShopContext);
  const isLoading = !products.length;

  if (isLoading) return <h2>Loading...</h2>;

  // Filter products added in the last 15 days
  const currentDate = new Date();
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(currentDate.getDate() - 15);

  const recentProducts = products.filter((product) => {
    const productDate = new Date(product.createdAt);
    return productDate >= tenDaysAgo;
  });

  // Slice to only show 8 products
  const displayedProducts = recentProducts.slice(0, 8);

  return (
    <div className="container py-8 px-32 ">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedProducts.map((elem) => (
          <NavLink
            to={`/singleProduct/${elem._id}`}
            key={elem._id}
            className="relative w-full h-full border border-gray-300 rounded-2xl overflow-hidden shadow-lg group transform transition-transform duration-300 origin-bottom hover:scale-y-105 hover:shadow-xl"
          >
            <div className="relative">
              {/* Main Image */}
              <img
                src={path + elem.thumbnail}
                alt={elem.name}
                className="w-full h-80 object-cover"
              />

              {/* Overlay with Left-to-Right Effect */}
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 translate-x-[-100%] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out">
                <div className="flex space-x-2">
                  <button className="bg-[#E8F6EA] text-primary p-3 rounded-full hover:bg-[#088178] hover:text-white">
                    <GrView />
                  </button>
                  {/* <button className="bg-[#E8F6EA] text-primary p-3 rounded-full hover:bg-[#088178] hover:text-white">
                    <MdFavoriteBorder />
                  </button> */}
                  <button className="bg-[#E8F6EA] text-primary p-3 rounded-full hover:bg-[#088178] hover:text-white">
                    <FiShoppingCart />
                  </button>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="px-4 pb-2">
              {/* <p className="text-sm text-gray-600">{elem.description}</p> */}
              <h1 className="text-lg font-semibold">{elem.name}</h1>
              <div className="flex items-center space-x-2">
                <span className="text-green-500 font-bold">₹{elem.price}</span>
                <span className="text-gray-500 line-through">₹{(
                  elem.price * 1.03
                ).toFixed(2)}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Rating: </span>
                <span className="text-yellow-500">95%</span>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Feature;
