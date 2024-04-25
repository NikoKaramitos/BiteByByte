import React from 'react';
import bear from '../assets/bear.png';
import { NavLink, useNavigate, useLocation} from "react-router-dom";
import '../App.css';

const Navbar = () => {
    const location = useLocation();
    const isDashPage = () => location.pathname === '/Dash';
    const auth = localStorage.getItem('user_data');
    const navigate = useNavigate();
    const logOut = () =>{
        localStorage.clear();
        navigate('/');
    }

    return (
        <div className='nav navbar bg-orange-50 border-gray-200 sticky top-0'>
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
                <a href="https://github.com/NikoKaramitos/BiteByByte" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={bear} className="h-14" alt="BiteByByteLogo" />
                    <span className="self-center">
                    <span className={`text-xl font-semibold whitespace-nowrap ${isDashPage() ? 'text-red-500 shadow-outline-red' : 'text-black'}`}>Bite</span>
                    <span className={`text-xl font-semibold whitespace-nowrap ${isDashPage() ? 'text-white shadow-outline-white' : 'text-black'}`}>By</span>
                    <span className={`text-xl font-semibold whitespace-nowrap ${isDashPage() ? 'text-green-500 shadow-outline-green' : 'text-black'}`}>Byte</span>
                </span>

                </a>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
                        <li className='hover:text-emerald-400'>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li className='hover:text-emerald-400'>
                            <NavLink to="about">About</NavLink>
                        </li>
                        {auth ? (
                            <>
                                <li className='hover:text-emerald-400'>
                                    <NavLink to="settings">Settings</NavLink>
                                </li>
                                <li>
                                    <NavLink onClick={logOut} to="/">Logout</NavLink>
                                </li>
                            </>
                        ) : null}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
