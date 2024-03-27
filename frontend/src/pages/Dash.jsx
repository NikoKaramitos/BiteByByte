import React from 'react';
import Navbar from '../components/navbar';
import { Button } from "@material-tailwind/react";
import Footer from "../components/Footer"
import tower2 from "../assets/tower2.webp";

const Dash = () =>{
	return (
        <div className=''>
        <Navbar></Navbar>
        <img className="w-full relative"src={tower2}></img>
        <div className='flex items-center justify-center'>
        <Button className='btn h-16 w-16 m-2 rounded-full text-color-black border-solid border-2 border-black mt-14 bg-red-600 hover:bg-emerald-500'>1</Button>
        <Button className='btn h-16 w-16 px-6 m-2 rounded-full text-color-black border-solid border-2 border-black mt-14 bg-red-600 hover:bg-emerald-500'>2</Button>
        <Button className='btn h-16 w-16 px-6 m-2 rounded-full text-color-black border-solid border-2 border-black mt-14 bg-red-600 hover:bg-emerald-500'>3</Button>
        <Button className='btn h-16 w-16 px-6 m-2 rounded-full text-color-black border-solid border-2 border-black mt-14 bg-red-600 hover:bg-emerald-500'>4</Button>
        </div>
        <Footer/>
        </div>
    )
}

export default Dash;