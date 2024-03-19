import React, { useState } from "react";
import stovetop from "../assets/stovetop.gif";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";


export default function ResetSendEmail() {
	var email;


	const navigate = useNavigate();

	return (
		<div className="relative w-full h-screen bg-zinc-600/90">
			<img
				className="absolute w-full h-full object-cover mix-blend-overlay"
				src={stovetop}
				alt=""
			/>
			<div className="relative flex justify-center items-center h-full">
            <form className="max-w-[400px] w-full rounded 2xl shadowl border-4 border-black 2xl mx-auto bg-white p-10">
					<h2 className="text-2xl font-bold text-center py-4 ">
						BITEbyBYTE
					</h2>
                    <p class="mb-6 text-xs text-center text-gray-500 dark:text-gray-600">
                        Enter your email to send a verification code.
                    </p>
                   
					<div className="flex flex-col mb-4 text-sm">
						<label>Email</label>
						<input
							id="email"
                            type="email"
                            name="email"
							className="relative block px-3 py-2 rounded-lg w-full
							bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none peer"
							required
							pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
							placeholder=" "
							ref={(c) => (email = c)}
						/>
						<span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
								Enter a valid email address
						</span>
					</div>
			
					<a
						href="#_"
						className="relative flex flex-col items-center py-2 mt-3 mb-3 overflow-hidden font-medium text-black border-2 border-orange-500 rounded-full hover:text-white group hover:bg-gray-50"
					>
						<span className="absolute left-0 block w-full h-0 transition-all bg-orange-500 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
						<span className="absolute right-0 flex-col items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
							
                                 <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke-width="1.5" 
                                    stroke="currentColor" 
                                    class="w-6 h-6"
                                 >
                                    <path stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
								
							</svg>
						</span>
						<button className="relative" >
						Reset Password
						</button>
					</a>
					<span className="text-xs text-red-500" id="emailResult">
						
					</span>
				</form>
				
			</div>
			<Footer />
		</div>
	);
}
