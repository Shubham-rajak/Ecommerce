import React, { useContext, useRef } from "react";
import Slider from "react-slick";
import { FaAngleLeft, FaAngleRight, FaStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { MdFavoriteBorder } from 'react-icons/md';
import { FiShoppingCart } from 'react-icons/fi';
import { GrView } from 'react-icons/gr';
import { ShopContext } from "../context/ShopContext";

const NewArrivals = () => {
  const { products,path } = useContext(ShopContext);
  const sliderRef = useRef(null);

  const isLoading = !products.length;

  if (isLoading) return <h2>Loading...</h2>;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container pt-10">
      <div className="flex justify-between">
        <div className="text-3xl font-semibold mb-2">
          <h1>New Arrivals</h1>
        </div>

          <div className="flex gap-4 my-4 ">
            <button
              onClick={() => sliderRef.current.slickPrev()}
              className="bg-[primary] text-primary rounded-full p-2 hover:bg-[#088178] hover:text-white"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={() => sliderRef.current.slickNext()}
              className="bg-[#E8F6EA] text-primary rounded-full p-2 hover:bg-[#088178] hover:text-white"
            >
              <FaAngleRight />
            </button>
          </div>
      </div>

      <Slider ref={sliderRef} {...settings}>
        { products &&
        products.map((elem) => (
          <NavLink
            to={`/singleproduct/${elem._id}`}
            key={elem._id}
            className="w-full flex flex-col justify-center items-center bg-white group"
          >
            {/* Image Content with Overlay */}
            <div className="relative h-56 mb-4">
              <img
                src={path + elem.thumbnail}
                alt={elem.name}
                className=" relative object-cover border-2 border-xl  border-[#addfdc] w-full h-full rounded-3xl shadow-xl"
              />
              {/* Overlay with Buttons */}
              <div className="absolute  inset-0 bg-black bg-opacity-5 opacity-0 transition-all duration-500 transform -translate-y-full group-hover:translate-y-0 group-hover:opacity-100 flex justify-center items-center gap-3">
                <button className="bg-[#E8F6EA] text-primary p-3 rounded-full hover:bg-[#088178] hover:text-white">
                  <GrView />
                </button>
                <button className="bg-[#E8F6EA] text-primary p-3 rounded-full hover:bg-[#088178] hover:text-white">
                  <MdFavoriteBorder />
                </button>
                <button className="bg-[#E8F6EA] text-primary p-3 rounded-full hover:bg-[#088178] hover:text-white">
                  <FiShoppingCart />
                </button>
              </div>
            </div>

            {/* Text Content */}
            <div className="w-full flex justify-center flex-col items-center space-y-1 px-4 py-2">
              <h5 className="text-lg font-semibold text-center">{elem.title}</h5>

              {/* Price Display */}
              <div className="text-center flex flex-row items-center">
                <span className="text-md font-semibold text-primary">${elem.price}</span>
                {elem.oldPrice && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ${elem.oldPrice}
                  </span>
                )}
              </div>
            </div>
          </NavLink>


        ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;
