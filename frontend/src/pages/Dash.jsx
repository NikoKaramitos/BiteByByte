import React from 'react';
import Navbar from '../components/navbar';
import { Button } from "@material-tailwind/react";
import Footer from "../components/Footer"
import tower2 from "../assets/tower2.webp";
import CustomStepper from '../components/stepper';

const Dash = () =>{
	return (
        <div className='relative'>
        <Navbar></Navbar>
        <img className="w-full  z-0"src={tower2}></img>
        <div className='absolute z-10 top-40 left-0 w-full'>
        <CustomStepper/>
        </div>
        <Footer/>
        </div>
    )
}

export default Dash;