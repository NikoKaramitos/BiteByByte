import React, { useState } from "react";
import { Stepper, Step, CardHeader, Typography } from "@material-tailwind/react";
import Collapse from '@mui/material/Collapse';
import { CardContent } from "@mui/material";

const CustomStepper = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [openCollapse, setOpenCollapse] = useState(false);

  const handleStepClick = (step) => {
    setActiveStep(step);
    setOpenCollapse(true);
  };

  const isStepCompleted = (step) => {
    return step < activeStep;
  };

  const renderContent = () => {
    if (steps[activeStep]) {
      return (
        <Typography variant="body1" color="white" style={{ fontFamily: 'Press Start 2P' }}>
          {steps[activeStep].content}
        </Typography>
      );
    }
    return null;
  };

  return (
    <div className="relative bg-black bg-opacity-60 h-200 rounded-lg ml-10 mr-10">
      <div className="w-full px-8 py-4">
        <CardHeader floated={false} variant="gradient" className="bg-black bg-opacity-60 grid h-24 m-0 place-items-center">
          <div className="w-full px-20 pt-4 pb-8">
            <Stepper
              activeStep={activeStep}
              lineClassName="bg-white/50"
              activeLineClassName="bg-green-500"
            >
              {steps.map((step, index) => (
                <Step
                  key={index}
                  className={`h-4 w-4 ${isStepCompleted(index) || index === activeStep ? '!bg-green-500 text-white' : '!bg-blue-gray-50 text-white/75'} cursor-pointer`}
                  onClick={() => handleStepClick(index)}
                >
                  <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                    <Typography variant="h6" color="inherit">{step.title}</Typography>
                  </div>
                </Step>
              ))}
            </Stepper>
          </div>
        </CardHeader>
        <Collapse in={openCollapse}>
          <CardContent>
            {renderContent()}
          </CardContent>
        </Collapse>
      </div>
    </div>
  );
}

export default CustomStepper;
