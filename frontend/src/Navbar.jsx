import React, {useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import blueBear from '../src/assets/Better_bear_blue.png'

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-2 text-[#a98467]}">
      <img logo="true" src= {blueBear} alt=""/>
      <ul className="hidden md:flex">
        <li className='p-4'>Home</li>
        <li className='p-4'>About</li>
      </ul>
      </div>
  );
};

export default Navbar;
