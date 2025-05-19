import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';  // Adjust the path if needed
import { FaBars } from 'react-icons/fa';
import Appbar from './Appbar';
import { NavLink } from 'react-router-dom';
import routes from '../routes';

const Sidebar = ({ children }) => {
    // State to toggle sidebar open/close
    const [isOpen, setIsOpen] = useState(true);

    // Function to toggle sidebar
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex w-full">
            <div className={`flex ${isOpen ? 'w-64' : 'w-16'} bg-gray-200 text-black fixed h-full transition-all duration-300`}>
                {/* Sidebar Content */}
                <div className="flex flex-col w-full ">
                    {/* Top Section with Logo and Toggle Button */}
                    <div className="flex justify-between items-center p-4 pr-0">
                        <div className={`${isOpen ? 'block' : 'hidden'}`}>
                            <img src={logo} alt="Logo" className="w-[150px]" />
                        </div>
                        <button
                            onClick={toggleSidebar}
                            className="text-black text-2xl transform transition-all duration-300 ease-in-out hover:scale-110 active:scale-100"
                        >
                            <FaBars />
                        </button>
                    </div>

                    {/* Sidebar Menu */}
                    <div className="mt-10 flex flex-col space-y-4 pr-3">
                        {routes.map((route, index) => {
                            return (
                                <SidebarItem key={index} {...route} isOpen={isOpen} />
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className={`main ${isOpen ? 'pl-64' : 'pl-16'} w-full`}>
                <Appbar isOpen={isOpen} />
                <div className="p-2 w-full h-screen bg-white pt-[70px]">
                    {children}
                </div>
            </div>
        </div>
    );
};

// Sidebar Item Component
const SidebarItem = ({ icon, hasChild, children, label, isOpen, url }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Toggle dropdown visibility
    const handleToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className=''>
            {hasChild ? (
                // Dropdown menu
                <div className=''>
                    <div
                        className="flex items-center px-4 py-2 hover:bg-white cursor-pointer"
                        onClick={handleToggle}
                    >
                        <div className="text-xl hover:bg-white">{icon}</div>
                        <span className={`ml-4 ${isOpen ? 'block' : 'hidden'} hover:bg-white`}>{label}</span>
                    </div>

                    {/* {isDropdownOpen && isOpen && (
                        <ul className="pl-12 mt-2">
                            {children &&
                                children.map((child, ind) => (
                                    <li key={ind} className='pb-2'>
                                        <NavLink
                                            to={child.url}
                                            className="block px-4 py-2 hover:bg-white"
                                        >
                                            {child.label}
                                        </NavLink>
                                    </li>
                                ))}
                        </ul>
                    )} */}
                </div>
            ) : (
                // No child, simple nav item
                <NavLink to={url} end="/">
                    <div className="flex items-center px-4 py-2 hover:bg-white cursor-pointer">
                        <div className="text-xl">{icon}</div>
                        <span className={`ml-4 ${isOpen ? 'block' : 'hidden'} hover:bg-white`}>{label}</span>
                    </div>
                </NavLink>
            )}
        </div>
    );
};

export default Sidebar;
