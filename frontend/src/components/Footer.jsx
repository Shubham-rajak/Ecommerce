import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import footer from '../assets/images/logo.png'
import footer1 from '../assets/images/app-store.jpeg'
import footer2 from '../assets/images/google-play.jpeg'
import footer3 from '../assets/images/payment-method.jpeg'
import { MdEmail } from 'react-icons/md'

const Footer = () => {
    return (

        // footer top
        <div className="py-8">
            <div className="bg-[#aeccc5] py-[30px] w-full">
                <div className="container">
                    <div className="grid sm:grid-cols-2 items-center justify-between">
                        <div className="flex items-center text-center sm:text-left sm:items-start mb-6 lg:mb-0">
                            <MdEmail className="text-2xl mb-2 lg:mb-3" />
                            <div className='flex justify-around flex-col  sm:flex-row sm:text-left sm:items-center'>
                                <h4 className="text-xl font-semibold text-center sm:text-left">
                                    Sign up to Newsletter
                                </h4>
                                <p className="text-sm text-gray-700 text-cente gap-2 hidden sm:block ">
                                    ...and receive $25 coupon for first shopping.
                                </p>

                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                className="flex flex-wrap px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-8 container">
                <div className="grid sm:grid-cols-12 gap-5">

                    {/* Section1 */}
                    <div className='sm:col-span-4'>
                        <div className="flex flex-col ">
                            <div>
                                <img src={footer} alt="Logo" className="mb-4 w-28" />
                            </div>
                            <h5 className="text-xl font-bold mb-2 text-[#90908E]">Contact</h5>
                            <p className='text-[#465B52] w-full'> Address: 562 Wellington Road, Street 32, San Francisco</p>
                            <p className='text-[#465B52]'> Phone: +01 2222 365 / (+91) 01 2345 6789</p>
                            <p className='text-[#465B52]'> Hours: 10:00 - 18:00, Mon - Sat</p>
                            <h5 className="text-xl font-[14px] mt-6 mb-2 text-[#90908E]">Follow Us</h5>
                            <div className="flex space-x-4">
                                <Link className="text-xl hover:text-blue-500" to=""><FaFacebookF /></Link>
                                <Link className="text-xl hover:text-blue-500" to=""><FaTwitter /></Link>
                                <Link className="text-xl hover:text-pink-500" to=""><FaInstagram /></Link>
                                <Link className="text-xl hover:text-red-500" to=""><FaYoutube /></Link>
                            </div>
                        </div>
                    </div>

                    {/* session2*/}
                    <div className='sm:col-span-2 '>
                        <div className="flex flex-col w-full sm:w-[80%] md:w-[70%] lg:w-[80%]">
                            <h5 className="text-xl font-bold mb-2">About</h5>
                            <ul className="space-y-2">
                                <li><Link to="">About Us</Link></li>
                                <li><Link to="">Delivery Information</Link></li>
                                <li><Link to="">Privacy Policy</Link></li>
                                <li><Link to="">Terms & Conditions</Link></li>
                                <li><Link to="">Contact Us</Link></li>
                                <li><Link to="">Support Center</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* session3 */}
                    <div className='sm:col-span-2'>

                        <div className="flex flex-col w-full sm:w-[80%] md:w-[70%] lg:w-[80%]">
                            <h5 className="text-xl font-bold mb-2">My Account</h5>
                            <ul className="space-y-2">
                                <li><Link to="">Sign In</Link></li>
                                <li><Link to="">View Cart</Link></li>
                                <li><Link to="">My Wishlist</Link></li>
                                <li><Link to="">Track My Order</Link></li>
                                <li><Link to="">Help</Link></li>
                                <li><Link to="">Order</Link></li>
                            </ul>
                        </div>
                    </div>


                    {/* session4 */}
                    <div className='sm:col-span-4'>
                        <div className="flex flex-col ">
                            <h5 className="text-xl font-bold mb-2">Install App</h5>
                            <p className='text-[16px] mb-4'>From App Store or Google Play</p>

                            <div className="flex flex-wrap gap-4 mb-4">
                                <img src={footer1} alt="App Store" className="w-32 h-14 border-2 border-primary rounded-md min-w-[140px]" />
                                <img src={footer2} alt="Google Play" className="w-32 h-14 border-2 rounded-md  min-w-[140px]" />
                            </div>
                            <p>Secured Payment Gateways</p>
                            <div className="mt-4">

                                <img src={footer3} alt="Payment Methods" className="w-80 min-w-[120px]" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer
