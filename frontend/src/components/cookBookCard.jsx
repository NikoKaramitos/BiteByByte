import React from 'react';

const CookBookCard = ({ imageUrl, buttonText, onClick }) => {
    return (
        <div className="max-w-[200px] rounded-sm overflow-hidden outline outline-black outline-4 shadow-lg border bg-white">
            <div className="relative">
                <img className="w-full" src={imageUrl} alt="Recipe" />
                <div className="absolute bottom-0 left-0 right-0 p-2 text-white text-center">
                </div>
            </div>

            {/* Button Container */}
            <div className="p-2">
                <button
                    className="w-full text-sm bg-white hover:bg-gray-100 text-black border border-gray-400 rounded shadow"
                    onClick={onClick}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default CookBookCard;

