import React from 'react';
import image3 from '../assets/images/slider-3.png';
import image4 from '../assets/images/slider-4.png';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css"; // Importing Alice Carousel CSS
import butImg1 from '../assets/images/btn-brush-bg-1.png';
import butImg2 from '../assets/images/btn-brush-bg-3.png';

const ImageList = [
  {
    id: 1,
    image: image3,
    h5: "Hot promotion",
    h3: "Fashion Trending",
    h1: "Great Collection",
    p: "Save more with coupons & up to 70% off",
    button: "Get It now",
    imgbg:butImg1
  },
  {
    id: 2,
    image: image4,
    h5: "Trade-In offer",
    h3: "Super Value Deals",
    h1: "On all Products",
    p: "Save more with coupons & up to 70% off",
    button: "Get It now",
    imgbg:butImg2
  }
];

const Hero = () => {
  // Mapping ImageList into carousel items

  return (
    <div className="">
      <AliceCarousel
        autoPlay
        autoPlayInterval={3000}
        animationDuration={1000}
        animationType="fadeout"
        infinite
        touchTracking={false}
        disableDotsControls
        disableButtonsControls
        items={items} // Passing items as props to AliceCarousel
      />
    </div>
  );
};


const items = ImageList.map((data) => (
  <div key={data.id} className=" container relative w-full h-[70vh] border-2 grid sm:grid-cols-12 bg-tarnary">
    {/* Hero section */}
    <div className="w-full col-span-5 sm:col-span-5 flex flex-col mt-28 sm:items-start items-center sm:pt-0 text-center sm:text-center px-4 sm:px-20">
      <h5 className="text-2xl font-[600]">{data.h5}</h5>
      <h3 className="text-4xl font-[700] ">{data.h3}</h3>
      <h1 className="text-5xl font-[700] text-primary">{data.h1}</h1>
      <p className='mt-4'>{data.p}</p>
      <div className="mt-4">
        <button className="  px-6 py-3 bg-primary text-white rounded-md">{data.button}</button>
      </div>
    </div>

    {/* Image section */}
    <div className="col-span-7 sm:col-span-7 flex justify-center items-start pr-32 sm:px-0">
      <img src={data.image} alt="Hero image" className="w-full h-full object-cover" />
    </div>
  </div>
));

export default Hero;
