import React, { useState } from "react";
import { CardContent, Typography } from "@mui/material";
import HorizontalStepper from 'react-stepper-horizontal';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'; // Import arrow icons
import '../App.css';

const CustomStepper = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  
  const renderContent = () => {
    if (steps[activeStep]) {
      return (
        <>
          <Typography variant="body1" color="white" style={{ fontFamily: 'Press Start 2P' }}>
            {steps[activeStep].content}
          </Typography>
          <div style={{ marginTop: '60px', marginBottom: '16px' }}>
            <button
              disabled={activeStep === 0}
              onClick={handleBack}
              className="back-button" // Added class for next button
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
              className="next-button" // Added class for next button
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
    <div className="relative bg-black bg-opacity-60 h-200 rounded-lg ml-10 mr-10">
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
