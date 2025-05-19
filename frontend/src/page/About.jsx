import React, { useRef } from 'react';
import Slider from 'react-slick';
import { FaAngleLeft, FaAngleRight, FaFacebookF, FaInstagram, FaPinterestP, FaTwitter } from 'react-icons/fa';
import Footer from '../components/Footer'

import about1 from "../../src/assets/images/about-1.jpeg";
import about2 from "../../src/assets/images/about-2.jpeg";
import about3 from "../../src/assets/images/about-3.jpeg";
import about4 from "../../src/assets/images/about-4.jpeg";
import about5 from "../../src/assets/images/about-5.jpeg";
import about6 from "../../src/assets/images/about-6.jpeg";
import about7 from "../../src/assets/images/about-7.jpeg";
import about8 from "../../src/assets/images/about-8.jpeg";
import about9 from "../../src/assets/images/about-9.jpeg";
import about10 from "../../src/assets/images/about-10.jpeg";
import about11 from "../../src/assets/images/about-11.jpeg";
import brand1 from "../../src/assets/images/brand-1.png";
import brand2 from "../../src/assets/images/brand-2.png";
import brand3 from "../../src/assets/images/brand-3.png";
import brand4 from "../../src/assets/images/brand-4.png";
import brand5 from "../../src/assets/images/brand-5.png";
import brand6 from "../../src/assets/images/brand-6.png";
const aboutProduct = [
  {
    id: 1,
    image: about2,
    name: "Patric Adams",
    company: "CEO & Co-Founder",
    description: "A software engineer specializing in artificial intelligence and machine learning."
  },
  {
    id: 2,
    image: about3,
    name: "Dilan Specter",
    company: "Head Engineer",
    description: "A sustainability expert focused on renewable energy and environmental impact."
  },
  {
    id: 3,
    image: about4,
    name: "Tomas Baker",
    company: "Senior Planner",
    description: "An experienced financial analyst with a knack for market predictions and investments."
  },
  {
    id: 4,
    image: about5,
    name: "Norton Mendos",
    company: "Project Manager",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nesciunt voluptatum dicta reprehenderit accusamus voluptatibus voluptas"
  },
  {
    id: 5,
    image: about6,
    name: "Patric Adams",
    company: "CEO & Co-Founder",
    description: "A software engineer specializing in artificial intelligence and machine learning."
  },
  {
    id: 6,
    image: about2,
    name: "Dilan Specter",
    company: "Head Engineer",
    description: "A sustainability expert focused on renewable energy and environmental impact."
  },
];
const aboutCity = [
  {
    id: 1,
    image: about9,
    name: "New York, USA",
    company: "27 Division St, New York",
    description: "NY 10002, USA"
  },
  {
    id: 2,
    image: about10,
    name: "Paris, France",
    company: "22 Rue des Carmes",
    description: "75005 Paris"
  },
  {
    id: 3,
    image: about11,
    name: "Jakarta, Indonesia",
    company: "2476 Raya Yogyakarta,",
    description: "89090 Indonesia"
  },
]

const brandImg = [
  {
    id: 1,
    image: brand1,
  },
  {
    id: 2,
    image: brand2,
  },
  {
    id: 3,
    image: brand3,
  },
  {
    id: 4,
    image: brand4,
  },
  {
    id: 5,
    image: brand5,
  },
  {
    id: 6,
    image: brand6,
  },

]


const About = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <>
      <div className="container mt-5">
        {/* 1st Section */}
        <div className="flex justify-center items-center gap-5">
          <div>
            <h5>Our Company</h5>
            <h1>We are Building The Destination For Getting Things Done</h1>
            <p>We are Building The Destination For Getting Things Done</p>
            <p>
              Tempus ultricies augue luctus et ut suscipit. Morbi arcu, ultrices
              purus dolor erat bibendum sapien metus. Sit mi, pharetra, morbi arcu
              id. Pellentesque dapibus nibh augue senectus.
            </p>
          </div>
          <div>
            <img src={about1} alt="About Us" />
          </div>
        </div>

        {/* 2nd sessiton */}

        <div className="flex flex-col justify-center items-center p-5">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h6 className="text-lg text-gray-600 font-semibold">Our Team</h6>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
                Top team of experts
              </h1>
              <p className="text-gray-500 mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione optio
                perferendis sequi mollitia quis autem ea cupiditate possimus!
              </p>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
              All Members
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {aboutProduct && aboutProduct.length > 0 ? (
              aboutProduct.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className=" w-full team-card flex flex-col items-center rounded-lg shadow-md border-2 overflow-hidden bg-white hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className=" object-cover transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
                  />

                  <div className="team-info p-4 text-center">
                    <h6 className="font-bold text-lg text-gray-800">{item.name}</h6>
                    <p className="text-sm text-gray-500">{item.company}</p>
                    <div className="social-icons flex justify-center items-center gap-3 mt-4 text-gray-500">
                      <FaFacebookF className="hover:text-blue-500 transition duration-300" />
                      <FaInstagram className="hover:text-pink-500 transition duration-300" />
                      <FaTwitter className="hover:text-blue-400 transition duration-300" />
                      <FaPinterestP className="hover:text-red-500 transition duration-300" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No team members available.</p>
            )}
          </div>
        </div>



        {/* about3 */}

        <div className="flex flex-col justify-center items-center mb-10">

          <div className="flex flex-col justify-center items-center text-center mb-8">
            <h5 className="text-lg font-semibold text-gray-600">Evara Corporation</h5>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
              Our main branches around the world
            </h1>
            <p className="text-gray-500 mt-4">
              At vero eos et accusamus et iusto odio dignissimos ducimus quibusdam
              praesentium. Debitis nesciunt voluptatum dicta reprehenderit accusamus.
            </p>
          </div>


          <div className=" flex  gap-6">
            {aboutCity.map((item) => (
              <div
                key={item.id}
                className="className='flex flex-col items-center bg-white p-4 rounded-xl shadow-lg hover:shadow-xl"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="mb-4 w-full object-cover rounded-xl hover:shadow-xl hover:border-blue-500 border-transparent border transition-all duration-300 transform hover:scale-y-105 hover:-translate-y-2"
                />
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-700">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.company}</p>
                  <p className="text-xs text-gray-400 mt-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* about4  */}

        <div className="flex flex-col justify-center items-center mb-8 ">

          <div className="flex flex-col justify-center items-center text-center mb-14">
            <h5 className="text-lg font-semibold text-gray-600">some facts</h5>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
              Take a look what
              our clients say about us
            </h1>
            <p className="text-gray-500 mt-4">
              At vero eos et accusamus et iusto odio dignissimos ducimus quiblanditiis praesentium. ebitis
            </p>
            <p className="text-gray-500 mt-4">
              nesciunt voluptatum dicta reprehenderit accusamus
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {aboutProduct.map((elem) => (
              <div
                key={elem.id}
                className="w-full flex  bg-white p-4 rounded-xl shadow-lg hover:shadow-xl hover:border-blue-500 border-transparent border transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
              >
                  <img
                    src={elem.image}
                    alt={elem.name}
                    className="mb-4  h-28 object-cover rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 bg-transparent "
                  />
               

                <div className="text-center p-6 bg-gray-50 rounded-md transition-all duration-300">
                  <p className="text-lg font-bold text-gray-700">{elem.name}</p>
                  <p className="text-sm text-gray-500">{elem.company}</p>
                  <p className="text-[16px] text-gray-850 mt-2">{elem.description}</p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* about 5 */}

        {/* Popular Categories Section */}
        <div className='mb-2'>

          <Slider ref={sliderRef} {...settings}>
            {brandImg.map((elem) => (
              <div
                key={elem.id}
                className="p-4 flex flex-col items-center"
              >

                <div className="w-full h-28 mb-4">
                  <img
                    src={elem.image}
                    alt={elem.image}
                    className="object-cover w-full h-full filter brightness-50 mix-blend-normal"
                  />
                </div>

              </div>
            ))}
          </Slider>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default About;
