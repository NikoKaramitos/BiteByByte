import React from 'react';
import bear from '../assets/bear.png';

const Navbar = () => {
    return (
        <div className=' nav bg-orange-50 border-gray-200 dark:bg-gray-900 sticky top-0'>
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
                <a href="https://github.com/NikoKaramitos/BiteByByte" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={bear} className="h-14" alt="BiteByByteLogo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">BiteByByte</span>
                </a>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                <a href="/" className="block py-2 px-3  md:text-emerald-400 md:bg-transparent  md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
                </li>
                <li>
                <a href="/about" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
                </li>
                <li>
                <a href="/contact" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
                </li>
                </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;