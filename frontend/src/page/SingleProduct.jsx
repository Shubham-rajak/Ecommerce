import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import api from '../utility/api';
import RelatedProducts from '../components/RelatedProduct';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { CartContext } from '../context/CartContext';
import { PiCrownSimpleFill } from "react-icons/pi";
import { RiRefreshLine } from "react-icons/ri";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { TbPointFilled } from "react-icons/tb";
import Footer from '../components/Footer';


import img1 from "../assets/images/about-10.jpeg"
import img2 from "../assets/images/about-11.jpeg"


const SingleProduct = () => {
  const { path } = useContext(ShopContext);
  const { productId } = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [categories, setCategories] = useState([])
  const navigate = useNavigate();
  const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];
  const [activeTab, setActiveTab] = useState("description");

  const getSingleProduct = async (productId) => {
    try {
      const response = await api.get(`/get-product/${productId}`);
      setSingleProduct(response.data.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleAddToCart = () => {
    if (!size) {
      toast.error('Please select both size and color');
      return;
    }
    addToCart(productId, size);
    navigate('/cart');
  };

  useEffect(() => {
    getSingleProduct(productId);
  }, [productId]);

  useEffect(() => {
    axios.get('http://localhost:8000/get-categories')
      .then((res) => {
        setCategories(res.data.data)
      })
      .catch(err => console.error(err))
  }, [])


  if (!singleProduct) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  

  return (
    <div className="container mt-14">
      <div className="grid grid-cols-12 gap-5 ">
        <div className=" relative col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-4">
          <img
            src={path + singleProduct.thumbnail}
            alt={singleProduct.title}
            className="absolute w-full h-full rounded-lg object-cover shadow-lg"
          />
        </div>


        {/* Product Details Section */}

        <div className="col-span-12 sm:col-span-0 md:col-span-6 lg:col-span-5 w-[90%] ">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">{singleProduct.title}</h1>
            <hr className='border-gray-300' />
            <p className="text-3xl font-semibold text-[#088178] py-1"><span className='text-gray-700'>Price:</span> ₹{singleProduct.price}
              <span className="text-sm text-gray-500 line-through ml-4 text-[21px]">₹{singleProduct.oldprice}</span>
            </p>
            <hr className='border-gray-300' />
            <p className="text-[18px] text-gray-700 pt-4 pb-5 ">{singleProduct.description}</p>

            {/* static part */}
            <div>
              <ul className='flex flex-col gap-2 mb-4'>
                <li className='flex justify-start items-center gap-3'><PiCrownSimpleFill /> 1 Year AL Jazeera Brand Warranty </li>
                <li className='flex justify-start items-center gap-3'><RiRefreshLine /> 30 Day Return Policy</li>
                <li className='flex justify-start items-center gap-3'><BsCreditCard2FrontFill />Cash on Delivery available</li>
              </ul>
            </div>

            {/* Color Selection Section */}
            {/* <div className="flex  justify-start items-center gap-4">
              <p className="text-lg font-medium text-gray-700">Color</p>
              <div className="flex gap-2">
                {singleProduct.color && singleProduct.color.length > 0 ? (
                  singleProduct.color.map((item, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 rounded-full cursor-pointer border-2 ${color === item ? 'border-black' : 'border-gray-300'} transition-all`}
                      style={{ backgroundColor: item }}
                      onClick={() => setColor(item)}
                    >
                      {color === item && <FaCheck className="text-white text-sm absolute top-1 right-1" />}
                    </div>
                  ))
                ) : (
                  <span>No Colors Available</span>
                )}
              </div>
            </div> */}

            {/* Size Selection Section */}
            <div className="flex justify-start items-center gap-5 ">
              <p className="text-lg font-medium text-gray-700">Size</p>
              <div className="flex gap-1 flex-wrap">
                {sizeOptions.map((item, index) => (
                  <button
                    key={index}
                    className={`py-1 px-3 rounded-full border ${size === item ? 'bg-[#088178] text-white' : 'bg-gray-50'} hover:bg-[#088178] hover:text-white`}
                    onClick={() => setSize(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability Section */}
            <div className="mt-6">
              <p className={`font-semibold ${singleProduct.quantity > 0 ? 'text-[#088178]' : 'text-red-600'} mb-5`}>
                {singleProduct.quantity > 0 ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>


            {/* Add to Cart Button */}
            <div className="">
              <button
                className="w-2/4 bg-[#088178] text-white py-2 rounded-md shadow-md"
                onClick={handleAddToCart}
                disabled={singleProduct.quantity === 0}
              >
                {singleProduct.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>

        {/* session 3 */}

        {/* sidebar 3rd */}
        <div className="col-span-12 sm:col-span-0 md:col-span-0 lg:col-span-3 border">
          <h2 className="text-2xl font-semibold my-4 mx-7">Category</h2>
          <hr />
          <div className="mt-1 w-full px-7 py-3 focus:ring-indigo-500 focus:border-indigo-500">
            {
              categories && categories.length > 0 ? (
                categories.map(categories => (
                  <div key={categories._id} className='mb-3'>
                    <div
                      onClick={() => handleCategoryClick(categories._id)}
                      className="cursor-pointer text-blue-500 hover:text-blue-700"
                    >
                       <NavLink to="/product" >
                      {categories.name}
                      </NavLink>
                    </div>
                    {categories === categories._id && (
                      <div className="mt-2 pl-4">
                       
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div>No categories available</div>
              )
            }
          </div>
        </div>

        {/* descrition page */}

        <div className='mt-16 grid col-span-12 lg:col-span-9'>
          <div className="tabs mb-6 flex space-x-4">
            {/* Buttons to switch between tabs */}
            <button
              className={`btn p-2 rounded-md text-lg ${activeTab === "description" ? "bg-[#088178] text-white" : "bg-gray-200 text-gray-800 hover:bg-[#088178] hover:text-white"}`}
              onClick={() => handleTabChange("description")}
            >
              Description
            </button>
            <button
              className={`rounded-md p-2 text-lg ${activeTab === "additionalInfo" ? "bg-[#088178] text-white" : "bg-gray-200 text-gray-800 hover:bg-[#088178] hover:text-white"}`}
              onClick={() => handleTabChange("additionalInfo")}
            >
              Additional Information
            </button>
            {/* <button
              className={`btn px-6 py-3 rounded-md text-lg ${activeTab === "reviews" ? "bg-[#088178] text-white" : "bg-gray-200 text-gray-800 hover:bg-[#088178] hover:text-white"}`}
              onClick={() => handleTabChange("reviews")}
            >
              Reviews
            </button> */}
          </div>

          {/* Conditional Rendering based on Active Tab */}
          {activeTab === "description" && (
            <div className="text-gray-700">
              <p className="mb-2">
                Uninhibited carnally hired played in whimpered dear gorilla koala depending and much yikes off far quetzal goodness and from for grimaced goodness unaccountably and meadowlark near unblushingly crucial scallop tightly neurotic hungrily some and dear furiously this apart.
                Spluttered narrowly yikes left moth in yikes bowed this that grizzly much hello on spoon-fed that alas rethought much decently richly and wow against the frequent fluidly at formidable acceptably flapped besides and much circa far over the bucolically hey precarious goldfinch mastodon goodness gnashed a jellyfish and one however because.
              </p>
              <p className="mb-6">
                Spluttered narrowly yikes left moth in yikes bowed this that grizzly much hello on spoon-fed that alas rethought much decently richly and wow against the frequent fluidly at formidable acceptably flapped besides and much circa far over the bucolically hey precarious goldfinch mastodon goodness gnashed a jellyfish and one however because.
              </p>

              <table className="min-w-full  mb-6">
                <tbody>
                  <tr>
                    <td className="px-2 py-2 flex justify-start items-center gap-3 text-gray-500"><TbPointFilled />
                      Type Of Packing</td>
                    <td className="px-2 py-2  text-gray-500">Bottle</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 flex justify-start items-center gap-3  text-gray-500"><TbPointFilled />Color</td>
                    <td className="px-2 py-2  text-gray-500">Green, Pink, Powder Blue, Purple</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 flex justify-start items-center gap-3  text-gray-500"><TbPointFilled />Quantity Per Case</td>
                    <td className="px-2 py-2  text-gray-500">100ml</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 flex justify-start items-center gap-3  text-gray-500"><TbPointFilled />Ethyl Alcohol</td>
                    <td className="px-2 py-2  text-gray-500">70%</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 flex justify-start items-center gap-3  text-gray-500"><TbPointFilled />Piece In One Carton</td>
                    <td className="px-2 py-2  text-gray-500">Laconic overheard dear woodchuck wow...</td>
                  </tr>
                </tbody>
              </table>
              <hr className='my-6 border-gray-400' />
              <div>
                <p>Laconic overheard dear woodchuck wow this outrageously taut beaver hey hello far meadowlark imitatively egregiously hugged that yikes minimally unanimous pouted flirtatiously as beaver beheld above forward energetic across this jeepers beneficently cockily less a the raucously that magic upheld far so the this where crud then below after jeez enchanting drunkenly more much wow callously irrespective limpet.</p>
              </div>

              <h3 className='font-semibold text-[26px] mt-5'>Packaging & Delivery</h3>
              <hr className='my-4 border-gray-400' />
              <p className='mb-20'>Less lion goodness that euphemistically robin expeditiously bluebird smugly scratched far while thus cackled sheepishly rigid after due one assenting regarding censorious while occasional or this more crane went more as this less much amid overhung anathematic because much held one exuberantly sheep goodness so where rat wry well concomitantly.

                Scallop or far crud plain remarkably far by thus far iguana lewd precociously and and less rattlesnake contrary caustic wow this near alas and next and pled the yikes articulate about as less cackled dalmatian in much less well jeering for the thanks blindly sentimental whimpered less across objectively fanciful grimaced wildly some wow and rose jeepers outgrew lugubrious luridly irrationally attractively dachshund.</p>
            </div>
          )}

          {activeTab === "additionalInfo" && (
            <div>
              <table className="min-w-full border-collapse border border-gray-300">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Stand Up</td>
                    <td className="border border-gray-300 px-4 py-2">35″L x 24″W x 37-45″H(front to back wheel)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Folded (w/o wheels)</td>
                    <td className="border border-gray-300 px-4 py-2">32.5″L x 18.5″W x 16.5″H</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Folded (w/ wheels)</td>
                    <td className="border border-gray-300 px-4 py-2">32.5″L x 24″W x 18.5″H</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Door Pass Through</td>
                    <td className="border border-gray-300 px-4 py-2">24</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Frame</td>
                    <td className="border border-gray-300 px-4 py-2">Aluminum</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Weight (w/o wheels)</td>
                    <td className="border border-gray-300 px-4 py-2">20 LBS</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Weight Capacity</td>
                    <td className="border border-gray-300 px-4 py-2">60 LBS</td>
                  </tr>

                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Width</td>
                    <td className="border border-gray-300 px-4 py-2">24″</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Handle height (ground to handle)</td>
                    <td className="border border-gray-300 px-4 py-2">37-45″</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Wheels</td>
                    <td className="border border-gray-300 px-4 py-2">12″ air / wide track slick tread</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Seat back height</td>
                    <td className="border border-gray-300 px-4 py-2">21.5″</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Head room (inside canopy)</td>
                    <td className="border border-gray-300 px-4 py-2">
                      25″</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Color</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Black, Blue, Red, White</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Size</td>
                    <td className="border border-gray-300 px-4 py-2">
                      M, S</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="col-span-12 sm:col-span-0 md:col-span-0 lg:col-span-3 mt-14 ">
          <div className='row-span-12 lg:row-span-6 border border-gray-300 h-2/5  mb-10 overflow-hidden '>
             <img src={img1} alt="" className='w-full h-full'/>
          </div>
          <div className='row-span-12 lg:row-span-6 border border-green-800 h-2/4 mt-30 overflow-hidden '>
              <img src={img2} alt="" className='w-full h-full'cd/>
             </div>
        </div>
      </div >
      <div>
          <RelatedProducts />
        </div>
        <div>
          <Footer />
        </div>
    </div >
  );
};

export default SingleProduct;
