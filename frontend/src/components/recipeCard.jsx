import React from 'react';

const RecipeCard = ({ imageUrl, buttonText, onClick, recipe }) => {
    return (
        <div className="max-w-sm rounded-lg overflow-hidden outline outline-black outline-4  shadow-lg border border-gray-300 bg-white m-4">
            <img className="w-full" src={imageUrl} alt="Recipe" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{recipe}</div>
            </div>
            <div className="px-6 py-4">
                <button className="bg-white hover:bg-gray-100 text-black font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={onClick}>
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default RecipeCard;

