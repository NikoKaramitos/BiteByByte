import React, { useState } from "react";
import { CardContent, Typography } from "@mui/material";
import HorizontalStepper from 'react-stepper-horizontal';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'; // Import arrow icons
import '../App.css';

const CustomStepper = ({ steps, ingredients, instructions }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [crossedOffInstructions, setCrossedOffInstructions] = useState(Array(instructions.length).fill(false));


  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleInstructionClick = (index) => {
    const newCrossedOffInstructions = [...crossedOffInstructions];
    newCrossedOffInstructions[index] = !newCrossedOffInstructions[index];
    setCrossedOffInstructions(newCrossedOffInstructions);
  };
  
  const renderContent = () => {
    if (steps[activeStep]) {
      return (
        <>
          <h3 style={{ color: 'white', fontFamily: 'Press Start 2P' }}>
            {steps[activeStep].content}
          </h3>
          {steps[activeStep].title === "Ingredients" && (
            <div style={{ marginTop: '16px' }}>
            <h3 style={{ color:"white" }}>
              Ingredients:
            </h3>
            <ul style={{ paddingLeft: '20px', color:'white'}}>
              {ingredients.map((ingredient, index) => (
                <li key={index} style={{ marginBottom: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" id={`ingredient-${index}`} name={`ingredient-${index}`} />
                  <label htmlFor={`ingredient-${index}`} style={{ marginLeft: '8px', userSelect: 'none' }}>
                    {ingredient}
                  </label>
                </li>
              ))}
            </ul>
            </div>
          )}
           {steps[activeStep].title === "Instructions" && (
            <div style={{ marginTop: '16px' }}>
              <h3 style={{ color:"white" }}>
                Instructions:
              </h3>
              <ol style={{ paddingLeft: '20px', color:'white'}}>
                {instructions.map((instruction, index) => (
                  <li 
                    key={index} 
                    style={{ 
                      marginBottom: '8px', 
                      cursor: 'pointer', 
                      textDecoration: crossedOffInstructions[index] ? 'line-through' : 'none',
                      textDecorationColor: crossedOffInstructions[index] ? '#D2122E' : 'initial',
                      textDecorationThickness: crossedOffInstructions[index] ? '4px' : 'auto' // Adjust the thickness of the line-through
                    }}
                    onClick={() => handleInstructionClick(index)}
                  >
                  <span>
                    <strong>Step {index + 1}:</strong> {/* Add "Step X:" */}
                    {instruction} {/* Instruction on a new line */}
                  </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <div style={{ marginTop: '60px', marginBottom: '16px' }}>
            <button
              disabled={activeStep === 0}
              onClick={handleBack}
              className="back-button"
              style={{
                marginRight: '8px',
                opacity: activeStep === 0 ? 0.5 : 1,
                cursor: activeStep === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              <KeyboardArrowLeft /> Back
            </button>
            <button
              disabled={activeStep === steps.length - 1}
              onClick={handleNext}
              className="next-button"
              style={{
                opacity: activeStep === steps.length - 1 ? 0.5 : 1,
                cursor: activeStep === steps.length - 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Next <KeyboardArrowRight />
            </button>
          </div>
        </>
      );
    }
    return null;
  };
  

  return (
    <div className="relative bg-black bg-opacity-70 h-200 rounded-lg ml-10 mr-10">
      <div className="w-full px-8 py-4">
        <div className="bg-black bg-opacity-60 grid h-24 m-0 rounded-lg place-items-center">
          <div className="w-full px-20 pt-4 pb-8">
          <HorizontalStepper
              steps={steps.map(step => ({ title: step.title }))}
              titleColor="#ffffff" // Set the color of the title
              activeTitleColor="#ffffff" // Set the color of the active title
              completeTitleColor="#ffffff" // Set the color of the completed title
              activeStep={activeStep}
              activeColor="#4caf50"
              completeColor="#4caf50"
              circleFontSize={12}
              circleTop={-6}
              circleStrokeWidth={3}
              size={30}
              completeBarColor="#4caf50"
              defaultBarColor="#E0E0E0"
          />
          </div>
        </div>
        <CardContent>
          {renderContent()}
        </CardContent>
      </div>
    </div>
  );
}

export default CustomStepper;
