import React from 'react';
import earth from './earth.png'; // Assuming earth.png is in the same directory as Title.js
import {motion} from "framer-motion";


const Title = () =>{
	return (
		<div>
	  		<h1 className='text-black text-2xl text-center mt-40'>Learn the cuisine’s of the world!</h1>
			<motion.div animate={{rotate: 360}} transition={{delay: 1}}>
			<img className="mt-10 h-60 w-60 rounded-full mx-auto items-center justify-center"
			src={earth}
			style={{animation: 'spin 8s linear infinite'}} // Apply spin animation
			alt="Earth"
			/>
			</motion.div>
		</div>
	)
}

export default Title;

