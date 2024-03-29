import React from "react";
import apple from '../assets/apple.png';
import google from '../assets/google.png';
import phone from '../assets/phone.png';

const Body = () =>{
	return (
        <div className='w-full bg-white py-16 px-4'>
            <div className='max-w-[1240px] mx-auto grid-md:grid-cols-2'>
                <div className="flex flex-row items-center justify-center">
                    <img className='h-80 w-40'
                        src={phone}
                        alt="phone">
                    </img>
                    <div className="p-8 flex flex-col items-center justify-center">
                        <h2 className="p-1">Cooking Challenges</h2>
                        <h2 className="p-1">Progress Tracking</h2>
                        <h2 className="p-1">Educational Content</h2>

                    </div>
                </div>
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
