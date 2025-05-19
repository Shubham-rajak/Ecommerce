import React, { useState } from 'react';
import { FaSearch, FaUserCircle, FaSignOutAlt, FaKey, FaUser } from 'react-icons/fa';

const Appbar = ({ isOpen }) => {
  // State to toggle user menu
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Toggle user menu visibility
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <div className={`z-50 bg-gray-200 text-black px-4 py-3 flex items-center justify-end gap-6  fixed right-0  shadow-sm ${isOpen ? 'left-64' : 'left-16'}`}>
      {/* Search Bar */}
      <div className="flex items-center space-x-2 p-4 w-1/3">
        {/* <FaSearch className="text-black" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none  text-black placeholder-gray-400 w-full"
        /> */}
      </div>

      {/* Navbar Right Section - User Icon and Menu */}
      <div className="relative">
        {/* <button onClick={toggleUserMenu}  className="text-black text-2xl transform transition-all duration-300 ease-in-out hover:scale-110 active:scale-100">
          <FaUserCircle />
        </button> */}

        {/* User Menu (Dropdown) */}
        {isUserMenuOpen && (
          <div className="absolute right-0 mt-2 bg-gray-700 text-white rounded-md shadow-lg w-48">
            <ul className="space-y-2 p-3">
              <li>
                <a href="#" className="flex items-center space-x-2 hover:bg-gray-600 px-2 py-1 rounded-md">
                  <FaUser className='text-lg' />
                  <span>Profile</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-2 hover:bg-gray-600 px-2 py-1 rounded-md">
                  <FaKey className="text-lg" />
                  <span>Reset Password</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-2 hover:bg-gray-600 px-2 py-1 rounded-md">
                  <FaSignOutAlt className="text-lg" />
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appbar;
