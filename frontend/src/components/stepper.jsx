import React from "react";
import { Stepper, Step, CardHeader, Typography } from "@material-tailwind/react";
 
const CustomStepper = ()=> {
  const [activeStep, setActiveStep] = React.useState(0);
 
  return (
    <div className="relative w-full  h-screen">
    <div className="w-full px-8 py-4">
    <CardHeader floated={false} variant="gradient" className=" bg-black bg-opacity-60 grid h-24 m-0 place-items-center"> {/* Height adjustment */}
        <div className="w-full px-20 pt-4 pb-8">
          <Stepper
            activeStep={activeStep}
            lineClassName="bg-white/50"
            activeLineClassName="bg-green-500"
          >
            <Step
              className="h-4 w-4 !bg-blue-gray-50 text-white/75 cursor-pointer"
              activeClassName="ring-0 !bg-green-500 text-white"
              completedClassName="!bg-green-500 text-white"
              onClick={() => setActiveStep(0)}
            >
              <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                <Typography variant="h6" color="inherit">Level 1</Typography>
              </div>
            </Step>
            <Step
              className="h-4 w-4 !bg-blue-gray-50 text-white/75 cursor-pointer"
              activeClassName="ring-0 !bg-green-500 text-white"
              completedClassName="!bg-green-500 text-white"
              onClick={() => setActiveStep(1)}
            >
              <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                <Typography variant="h6" color="inherit">Level 2</Typography>
              </div>
            </Step>
            <Step
              className="h-4 w-4 !bg-blue-gray-50 text-white/75 cursor-pointer"
              activeClassName="ring-0 !bg-green-500 text-white"
              completedClassName="!bg-green-500 text-white"
              onClick={() => setActiveStep(2)}
            >
              <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                <Typography variant="h6" color="inherit">Level 3</Typography>
              </div>
            </Step>
            <Step
              className="h-4 w-4 !bg-blue-gray-50 text-white/75 cursor-pointer"
              activeClassName="ring-0 !bg-green-500 text-white"
              completedClassName="!bg-green-500 text-white"
              onClick={() => setActiveStep(3)}
            >
              <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                <Typography variant="h6" color="inherit">Level 4</Typography>
              </div>
            </Step>
          </Stepper>
        </div>
      </CardHeader>
    </div>
    </div>
  );
}

export default CustomStepper;