import React, { useEffect, useRef, useState } from 'react'
import Hero from '../page/Hero'
import Footer from '../components/Footer'
import { NavLink } from 'react-router-dom'
import Feature from '../components/Featured'
import Popular from '../components/Popular'
import NewArrivals from '../components/NewArrivals'

import "../app.css"
import { FaArrowRightLong } from 'react-icons/fa6'

const Home = () => {
  // banner 1
  const sliderRef = useRef(null);

  // banner 2
  const [imageIndex, setImageIndex] = useState(0);


  const data = [
    {
      id: 1,
      title: 'Save 20% on Woman Bag',
      paragarph: 'Smart offerce',
      buttonText: 'shop now',
      link: '/handmade-home-decor'
    },
    {
      id: 2,
      title: 'Great Summer Collection',
      paragarph: 'Smart offerce',
      buttonText: 'shop now',
      link: '/handmade-home-decor'
    },
    {
      id: 3,
      title: 'Shop Today’s Deals & Offers',
      paragarph: 'Smart offerce',
      buttonText: 'shop now',
      link: '/handmade-home-decor'
    }
  ]

  const imageArray = [
    'banner2-img-1',         // background 1
    'banner2-img-2',       // background 2
    'banner2-img-3'        // background 3
  ];

  return (
    <>
      {/* Hero sesstion  */}
      <Hero />
      

      {/* Home Session */}
      {/* product button */}
      {/* <div className='container my-5 mt-9 '>
        <div className='flex flex-wrap justify-between items-center text-center flex-col:sm'>
          <div className='space-x-3'>
            <NavLink className="py-2 px-6 rounded-sm bg-slate-100 hover:bg-[#fde1bd] hover:text-primary" to="featured" >Featured </NavLink>
            <NavLink className="py-2 px-6 rounded-sm bg-slate-100 hover:bg-[#fde1bd] hover:text-primary" to="Popular" >Popular </NavLink>
            <NavLink className="py-2 px-6 rounded-sm bg-slate-100 hover:bg-[#fde1bd] hover:text-primary" to="NewArrivals" >  New Arrivals </NavLink>
          </div>
          <div className="text-[#088178] underline-offset-2">
            <button
              onClick={() => sliderRef.current.slickNext()}
              className="hover:scale-95 transition-transform duration-200"
            >
              View more 
            </button>
          </div>

        </div>
      </div> */}

      {/* Feature */}
      <Feature />

      {/* Banner card 1 */}

      <div className='container pt-6'>
        <div className='bg-banner1-img bg-cover bg-center h-64 w-full '>
          <div className=' hidden sm:block items-start w-[50%] ml-14 pt-10'>
            <h4 className='text-[18px] text-[#088178]'>Repair Services</h4>
            <h1 className='text-[36px] flex flex-col font-semibold'>We're an Apple
              <span>Authorised Service Provider</span>
            </h1>
            <button className=" mt-9 flex items-center gap-2 bg-blue-500 text-white px-5 py-2 rounded-md transform hover:scale-x-110 hover:translate-x-4 transition-all duration-300">
              Learn More <FaArrowRightLong />
            </button>
          </div>
        </div>

      </div>

      {/* Popular */}
      <Popular />

      {/* banner card 2 */}
      <div className="container">
        <div className="grid sm:grid-cols-3 gap-4">
          {data && data.map((item, index) => (
            <div
              key={item.id}
              className={`bg-cover bg-center h-44 w-full ${imageArray[index]}`}
              style={{
                backgroundImage: `url(${(`./src/assets/images/banner-${index + 1}.jpeg`)})`
              }}
            >
              <div className="p-8 w-[250px]">
                <p>{item.paragarph}</p>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <a href={item.link} className=" text-blue-500 hover:underline">
                  {item.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>





      {/* New Arrivals */}
      <NewArrivals />

      {/* Footer session */}
      <Footer />

    </>
  )
}

export default Home