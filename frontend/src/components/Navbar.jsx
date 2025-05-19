import React, { useState, useEffect, useContext } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FiShoppingCart } from "react-icons/fi";
import { MdFavoriteBorder, MdMenu } from "react-icons/md";
import { FaCircleUser, FaXmark } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import api from '../utility/api'; // Ensure the API utility is imported
import "../App.css";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const userInfo = JSON.parse(localStorage.getItem("user")) || {};
  const navigate = useNavigate();
  const location = useLocation();
const {setProducts} = useContext(ShopContext)
  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      navigate("/product");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/about" || location.pathname === "/contact") {
      setShowSearch(false);
    }
  }, [location]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (searchTerm) {
          const response = await api.get(`/get-products?search=${searchTerm}`);
          setSearchResults(response.data); 
          setProducts(response.data.data);
        } else {
          const response = await api.get(`/get-products`);
          setSearchResults([]); 
          setProducts(response.data.data); 
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
  
    fetchSearchResults();
  }, [searchTerm, setProducts]);
  

  return (
    <div className="container bg-gray-100">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 z-[999] sticky">
          {/* Logo */}
          <div className="w-36 flex-shrink-0">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex justify-center items-center space-x-6 text-[20px] mb-5">
            <NavLink to="/" className="text-gray-700 font-semibold hover:text-[#088178]">
              Home
            </NavLink>
            <NavLink to="/about" className="text-gray-700 font-semibold hover:text-[#088178]">
              About
            </NavLink>
            <NavLink to="/product" className="text-gray-700 font-semibold hover:text-[#088178]">
              Product
            </NavLink>
            <NavLink to="/contact" className="text-gray-700 font-semibold hover:text-[#088178]">
              Contact
            </NavLink>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Bar */}
            <IoSearch
              className="text-2xl cursor-pointer"
              onClick={toggleSearch}
            />
            {/* Cart Icon */}
            <NavLink to="/cart" className="relative flex items-center">
              <FiShoppingCart className="text-2xl" />
            </NavLink>

            {/* Profile Icon with Dropdown */}
            <div className="relative">
              <div className="flex items-center gap-3 cursor-pointer" onClick={toggleDropdown}>
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-400 text-slate-950 font-medium bg-vista_blue">
                  {isLoggedIn ? userInfo?.name?.charAt(0).toUpperCase() : "?"}
                </div>
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-gray-200 border rounded shadow-lg z-10">
                  <ul className="list-none p-2">
                    {isLoggedIn ? (
                      <>
                        <li>
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={onLogout}
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <NavLink
                            to="/login"
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Login
                          </NavLink>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="md:hidden">
            <MdMenu className="text-2xl cursor-pointer" onClick={toggleMenu} />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-200 p-4 space-y-4">
            <NavLink to="/" className="block text-gray-700 font-semibold hover:text-blue-500" onClick={toggleMenu}>
              Home
            </NavLink>
            <NavLink to="/about" className="block text-gray-700 font-semibold hover:text-blue-500" onClick={toggleMenu}>
              About
            </NavLink>
            <NavLink to="/product" className="block text-gray-700 font-semibold hover:text-blue-500" onClick={toggleMenu}>
              Product
            </NavLink>
            <NavLink to="/contact" className="block text-gray-700 font-semibold hover:text-blue-500" onClick={toggleMenu}>
              Contact
            </NavLink>

            {/* Mobile Icons */}
            <div className="flex items-center space-x-4">
              <NavLink to="/cart" className="relative flex items-center">
                <FiShoppingCart className="text-2xl" />
              </NavLink>
              <NavLink to="/favorite" className="relative flex items-center">
                <MdFavoriteBorder className="text-2xl" />
              </NavLink>
              <NavLink to="/login">
                <FaCircleUser className="text-2xl" />
              </NavLink>
            </div>
          </div>
        )}
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="flex justify-center items-center bg-white p-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-400 rounded-full w-5/6 sm:w-1/2 p-2"
          />
          <FaXmark className="ml-2 text-2xl cursor-pointer" onClick={toggleSearch} />
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((item) => (
            <div key={item.id} className="search-result-item">
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      )}

      {searchTerm && searchResults.length === 0 && (
        <p className="text-center">No results found</p>
      )}
    </div>
  );
};

export default Navbar;
