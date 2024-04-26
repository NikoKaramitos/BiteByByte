import { useState, useEffect } from 'react';
import bear from '../assets/bear.png';
import { NavLink, useNavigate, useLocation} from "react-router-dom";
import '../App.css';
import { CgProfile } from "react-icons/cg";


const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const location = useLocation();
    const isItalian = () => location.pathname === '/dash/Italian';
    const isMexican = () => location.pathname === '/dash/Mexican';
    const isGreek = () => location.pathname === '/dash/French';
    const isChinese = () => location.pathname === '/dash/Chinese';
    const auth = localStorage.getItem('user_data');
    const navigate = useNavigate();
    const logOut = () =>{
        localStorage.clear();
        navigate('/');
    }

        const [user, setUser] = useState(JSON.parse(localStorage.getItem('user_data')));
      
        useEffect(() => {
          setUser(JSON.parse(localStorage.getItem('user_data')));
        }, []);

    return (
        <div className='nav navbar bg-orange-50 border-gray-200 sticky top-0'>
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={bear} className="h-14" alt="BiteByByteLogo" />
                    <span className="self-center">
                    <span className={`text-xl font-semibold whitespace-nowrap ${isItalian() || isMexican() ? 'text-green-500 shadow-outline' : (isGreek() ? 'text-blue-500 shadow-outline' : (isChinese() ? 'text-red-500 shadow-outline' : 'text-black'))}`}>Bite</span>
                    <span className={`text-xl font-semibold whitespace-nowrap ${isItalian() || isMexican() ? 'text-white shadow-outline' : (isGreek() ? 'text-white shadow-outline' : (isChinese() ? 'text-yellow-300 shadow-outline' : 'text-black'))}`}>By</span>
                    <span className={`text-xl font-semibold whitespace-nowrap ${isItalian() || isMexican() ? 'text-red-500 shadow-outline' : (isGreek() ? 'text-red-500 shadow-outline' : (isChinese() ? 'text-red-500 shadow-outline' : 'text-black'))}`}>Byte</span>
                </span>

                </a>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-2 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
                    {auth && user && user.currCuisine? (
                        <li className='hover:text-emerald-400'>
                            <NavLink to={`/dash/${user.currCuisine}`}>Home</NavLink>
                        </li>
                       ) : null}
                        {/*only show if they are logged in*/ }
                        {auth ? (
                        <li className='hover:text-emerald-400'>
                            <NavLink to="/cuisines">Cuisines</NavLink>
                        </li>
                        ) : null}
                        {auth ? (
                        <li className='hover:text-emerald-400'>
                            <NavLink to="cookbook">CookBook</NavLink>
                        </li>
                            ) : null}
                        {auth ? (
                        <li className='hover:text-emerald-400'>
                                <NavLink to="/Profile-Settings">Settings</NavLink>
                        </li>
                        ): null}
                        {/*only show if they are logged in*/ }
                        {auth ? (
                <>
                        <li className="relative hover:text-emerald-400">
                        <button onClick={handleToggle} className="focus:outline-none">
                            <CgProfile style={{ fontSize: '30px' }} />
                        </button>

                        {isOpen && (
                            <ul className="absolute top-full left-0 bg-white border border-gray-200 rounded shadow-md mt-1">
                                <li>
                                    <NavLink onClick={logOut} to="/" className="block px-4 py-2 text-gray-800 hover:text-emerald-400">Logout</NavLink>
                                </li>
                            </ul>
                        )}
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
