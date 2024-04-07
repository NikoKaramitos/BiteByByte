import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from "../components/Footer"
import tower2 from "../assets/tower2.webp";
import greek from "../assets/greek2.png";
import mexicanImage from "../assets/mexicanImage.png";
import CustomStepper from '../components/stepper';
import RecipeCard from '../components/recipeCard';
import lasagna from "../assets/lasagna.jpeg";
import tirmasiu from "../assets/tirmasiu.jpeg"
import { useNavigate } from "react-router-dom";
import {useParams,} from "react-router-dom";

const Dash = () => {
    const steps1 = [
        { title: 'Intro', content: 'Lasagna holds a revered place in Italian culinary heritage, with origins dating back to ancient Greece and Rome. Evolving over centuries, it has become a quintessential dish symbolizing celebration and familial bonds in Italy. Passed down through generations, the tradition of making lasagna embodies the essence of Italian heritage, bringing people together to share in its hearty, comforting flavors.' },
        { title: 'Ingredients', content: 'This is the content for step 2 of the first stepper.' },
        { title: 'Instructions', content: 'This is the content for step 3 of the first stepper.' },
        { title: 'Finish', content: 'This is the content for step 4 of the first stepper.' },
    ];

    const steps2 = [
        { title: 'Intro', content: 'This is the content for level 1 of the second stepper.' },
        { title: 'Ingredients', content: 'This is the content for level 2 of the second stepper.' },
        { title: 'Instructions', content: 'This is the content for level 3 of the second stepper.' },
        { title: 'Finish', content: 'This is the content for level 4 of the second stepper.' },
    ];

    const [showStepper1, setShowStepper1] = useState(false);
    const [showStepper2, setShowStepper2] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);

    const handleButtonClick1 = () => {
        setShowStepper1(true);
        setButtonClicked(true);
    };

    const handleButtonClick2 = () => {
        setShowStepper2(true);
        setButtonClicked(true);
    };

    const handleBackButtonClick = () => {
        setShowStepper1(false);
        setShowStepper2(false);
        setButtonClicked(false);
    };

    const [recipes, setRecipes] = useState([]);
    const { cuisine } = useParams();
    const navigate = useNavigate(); 


    const app_name = "bitebybyte-9e423411050b";
	function buildPath(route) {
		if (process.env.NODE_ENV === "production") {
			return "https://" + app_name + ".herokuapp.com/" + route;
		} else {
			return "http://localhost:5001/" + route;
		}
	}

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(buildPath(`/api/cuisines/${cuisine}/recipes`));
                if (!response.ok) {
                    throw new Error('Failed to fetch recipes');
                }
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };
    
        fetchRecipes();
    }, [cuisine]);

    // Define image based on cuisine
    let imageSrc;
    switch (cuisine) {
        case 'italian':
            imageSrc = tower2;
            break;
        case 'mexican':
            imageSrc = mexicanImage;
            break;
        case 'chinese':
            imageSrc = greek;
            break;
        case 'french':
            imageSrc = greek;
            break;
    }

    // Define click handler for recipe cards
    const handleRecipeClick = (recipeId) => {
        // Redirect to recipe details page or perform any other action
        navigate(`/recipes/${recipeId}`);
    };

    return (
        <div className='relative'>
            <Navbar />
            <h1>{cuisine} Dash Page</h1>
            <img className="w-full  z-0 " src={imageSrc} ></img>
            {(showStepper1 || showStepper2) && (
                <div className='absolute z-10 top-40 left-0 w-full'>
                    {showStepper1 && <CustomStepper steps={steps1} />}
                    {showStepper2 && <CustomStepper steps={steps2} />}
                    <div className="absolute top-80 left-0 right-0 text-center">
                        <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleBackButtonClick}>
                            Back
                        </button>
                    </div>
                </div>
            )}
            {!buttonClicked && (
                <div className="absolute top-40 left-0 right-0 flex justify-center items-center">
                    <RecipeCard
                        imageUrl= {lasagna}
                        buttonText="Lasagna Recipe"
                        onClick={handleButtonClick1}
                    />
                    <RecipeCard
                        imageUrl={tirmasiu}
                        buttonText="Tiramisu Recipe"
                        onClick={handleButtonClick2}
                    />
                </div>
            )}
            <Footer />
        </div>
    );
    };

export default Dash;