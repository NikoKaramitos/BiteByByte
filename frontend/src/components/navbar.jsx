import React from 'react';
import bear from '../assets/bear.png';
import { NavLink, useNavigate, useLocation} from "react-router-dom";
import LoggedInName from '../components/LoggedInName';

const Navbar = () => {
    const location = useLocation();
    const isHomePage = () => location.pathname === '/';
    const isLoginPage = () => location.pathname === '/login';
    const isRegisterPage = () => location.pathname === '/register';
    const isItaly = () => location.pathname === '/dash';
    const isSettingsPage = () => location.pathname === '/settings';
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
        <span className={`text-xl font-semibold whitespace-nowrap ${isHomePage() || isLoginPage() || isRegisterPage() ? 'text-black' : 'text-red-500'}`} style={{ textShadow: '1px 1px 1px black' }}>Bite</span>
        <span className={`text-xl font-semibold whitespace-nowrap ${isHomePage() || isLoginPage() || isRegisterPage() ? 'text-black' : 'text-white'}`} style={{ textShadow: '1px 1px 1px black' }}>By</span>
        <span className={`text-xl font-semibold whitespace-nowrap ${isHomePage() || isLoginPage() || isRegisterPage() ? 'text-black' : 'text-green-500'}`} style={{ textShadow: '1px 1px 1px black' }}>Byte</span>
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
                <li className='hover:text-emerald-400'>
                <NavLink to="settings">Settings</NavLink>
                </li>
                    {
                        auth ? ( <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
                            <li> 
                            <NavLink to="profile settings">Hi, <LoggedInName/></NavLink>
                            </li>
                            <li>
                            <NavLink onClick={logOut} to="/">Logout</NavLink>
                            </li>
                            </ul>
                        ) :<>
                        </>
                    }
                </ul>
                </div>
            </div>
        </div>
    )
}


export default Navbar;