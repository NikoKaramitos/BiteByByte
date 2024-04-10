import React from 'react';
import lasagna from "../assets/lasagna.jpeg";
import tirmasiu from "../assets/tirmasiu.jpeg";



const CookBookCard = ({ imageUrl, buttonText, onClick }) => {

    
    
    return (
        <div className="h-96 rounded-sm overflow-hidden outline outline-black outline-4 shadow-lg border bg-white">
            <img className="w-full" src={imageUrl} alt="Recipe" />
            
            <div className="m-2 text-sm">
                <button className="bg-white hover:bg-gray-100 text-black border-gray-400 rounded shadow" onClick={onClick}>
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default CookBookCard;

