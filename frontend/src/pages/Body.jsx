import React from "react";
import phone from './phone.png';
import apple from './apple.png';
import google from './google.png';
import { Rating } from "@material-tailwind/react";

const Body = () =>{
	return (
        <div className='w-full bg-white py-16 px-4'>
        <div className='max-w-[1240px] mx-auto grid-md:grid-cols-2'>
        <img className='flex mx-auto items-center justify-center h-80 w-40'
                    src={phone}
                    alt="phone">
                </img>
            <div className='flex flex-row items-center justify-center'>
                <img className='mt-10 h-11 w-50'
                    src={apple}
                    alt="apple">
                </img>
                <img className='mt-10 h-16 w-50'
                    src={google}
                    alt="google">
                </img>
            </div>
        </div>
        </div>
    )
}

export default Body;
