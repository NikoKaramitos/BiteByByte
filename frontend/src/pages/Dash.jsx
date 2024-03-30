import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from "../components/Footer"
import tower2 from "../assets/tower2.webp";
import CustomStepper from '../components/stepper';

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

    return (
        <div className='relative'>
            <Navbar />
            <img className="w-full  z-0" src={tower2} alt="Tower"></img>
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
                <div className="absolute top-80 left-0 right-0 text-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 outline outline-black outline-3" onClick={handleButtonClick1}>
                        Lasagna Recipe
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded outline outline-black outline-3" onClick={handleButtonClick2}>
                        Tiramisu Recipe
                    </button>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Dash;
