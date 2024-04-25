import React from 'react';

const RecipeCard = ({ imageUrl, buttonText, onClick, message }) => {
    return (
        <button className="cardButton max-w-sm rounded-lg overflow-hidden outline outline-black outline-4  shadow-lg border border-gray-300 bg-white m-4 " onClick={onClick}>
            <img className="w-full outline outline-black outline-4 bg-rose-50" src={imageUrl} alt="Recipe" />
            <div className="px-6 py-4">
                <h1 className="bg-white text-black text-2xl font-semibold py-6 px-4" >
                    {buttonText}
                </h1>
            </div>
            <span>{message}</span>
        </button>
    );
};

export default RecipeCard;

