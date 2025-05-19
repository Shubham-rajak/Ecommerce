  import React,{ useContext, useRef } from 'react';
  import Slider from 'react-slick';
  import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { ShopContext } from '../context/ShopContext';
  // import { useProductContext } from '../context/Shop';

  const Popular = () => {
    const {category,path} = useContext(ShopContext);
    const sliderRef = useRef(null);
    // console.log(category,'categp')
    const isLoading = !category.length;

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
      <div className="container py-3 mt-5">
        <div className='flex justify-between'>
          <h1 className="text-3xl font-semibold">Popular Categories</h1>
          <div className='flex gap-4 mt-4'>
            <button
              onClick={() => {
                console.log("Prev clicked");
                sliderRef.current.slickPrev()}}
              className="bg-[#E8F6EA] text-primary rounded-full p-2 hover:bg-[#088178] hover:text-white">
              <FaAngleLeft />
            </button>
            <button
              onClick={() =>{
                console.log("object")
                sliderRef.current.slickNext()}}
              className="bg-[#E8F6EA] text-primary rounded-full p-2 hover:bg-[#088178] hover:text-white">
              <FaAngleRight />
            </button>
          </div>
        </div>

        <Slider ref={sliderRef} {...settings}>
          {category &&
            category.map((elem) => (
              <div key={elem._id} className="p-4  flex flex-col items-center overflow-hidden border-xl rounded-xl">
                <div className="w-full h-44 mb-4 ">
                  <img
                    src={path + elem.image }
                    alt={elem.name || "Category"}
                    className="object-cover rounded-xl w-full h-full border-2 border-gray-400"
                  />
                </div>
                <h5 className="text-center">{elem.name || "Unnamed Category"}</h5>
              </div>
            ))}
        </Slider>
      </div>
    );
  };

  export default Popular;
