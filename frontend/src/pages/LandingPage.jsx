import React from 'react';
import earth from '../assets/earth.png'; // Assuming earth.png is in the assests folder
import {motion} from "framer-motion";
import { Button } from "@material-tailwind/react";
import Navbar from '../components/navbar';
import Body from "../pages/Body";
import Footer from "../components/Footer"
import { useNavigate } from 'react-router-dom';



const LandingPage = () =>{

	const navigate = useNavigate();

	return (
		<div>
			<Navbar></Navbar>
	  		<h1 className='text-black text-2xl text-center mt-20'>Learn the cuisine’s of the world!</h1>
			  <div className="flex flex-col items-center justify-center">
				<Button className='btn h-12 w-1/3 text-color-black border-solid border-2 border-black rounded-lg mt-14 bg-emerald-400 hover:bg-emerald-500'
				onClick={() => navigate('/register')}>Get Started</Button>
				<Button className='btn h-12 w-1/3 text-color-black border-solid border-2 border-black rounded-lg mt-8 bg-slate-100 hover:bg-slate-200'
				onClick={() => navigate('/login')}>I already have an account</Button>
        	</div>
			<motion.div animate={{rotate: 360}} transition={{delay: 1}}>
			<img className="mt-16 mb-20 h-60 w-60 rounded-full mx-auto items-center justify-center"
			src={earth}
			style={{animation: 'spin 20s linear infinite'}} // Apply spin animation
			alt="Earth"
			/>
			</motion.div>
			<Body/>
			<Footer/>
		</div>
		
		
	)
}

export default LandingPage;

