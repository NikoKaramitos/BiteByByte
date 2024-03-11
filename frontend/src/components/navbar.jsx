import React from 'react';
import bear from '../assets/bear.png';
import { NavLink } from "react-router-dom";


const Navbar = () => {
    return (
        <div className='nav navbar bg-orange-50 border-gray-200 dark:bg-gray-900 sticky top-0'>
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
                <a href="https://github.com/NikoKaramitos/BiteByByte" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={bear} class="h-14" alt="BiteByByteLogo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">BiteByByte</span>
                </a>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                <NavLink to="/">Home</NavLink>
                </li>
                <li>
                <NavLink to="about">About</NavLink>
                </li>
                <li>
                <NavLink to="settings">Settings</NavLink>
                </li>
                </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;