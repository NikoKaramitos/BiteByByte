import React, { useState } from "react";
import { CardContent} from "@mui/material";
import HorizontalStepper from 'react-stepper-horizontal';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'; // Import arrow icons
import '../App.css';

const CustomStepper = ({ steps, ingredients, instructions, questions }) => {
  const app_name = "bitebybyte-9e423411050b";
  const [activeStep, setActiveStep] = useState(0);
  const [crossedOffInstructions, setCrossedOffInstructions] = useState(Array(instructions.length).fill(false));
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1); // Initialize question number
  const [score, setScore] = useState(0); // Initialize score
  const [showQuiz1, setShowQuiz1] = useState(true); // Initialize showQuiz state
  const [showQuiz2, setShowQuiz2] = useState(true); // Initialize showQuiz state
  const [scoreQuiz1, setScoreQuiz1] = useState(0); // Initialize score for Quiz 1
  const [scoreQuiz2, setScoreQuiz2] = useState(0);  
  const letter = {0:"A", 1:"B", 2:"C",3:"D" };
  var _ud = localStorage.getItem("user_data");
	var ud = JSON.parse(_ud);
	var userId = ud.id;

  if (!questions) {
    // Return null or an alternative component if questions are null
    return null;
  }

  function buildPath(route) {
		if (process.env.NODE_ENV === "production") {
			return "https://" + app_name + ".herokuapp.com/" + route;
		} else {
			return "http://localhost:5001/" + route;
		}
	}

  const handleOptionSelect = (questionIndex, optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };
  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setQuestionNumber(questionNumber + 1); // Increment question number
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    setQuestionNumber(questionNumber - 1); // Decrement question number
  };
 
  const calculateScore = () => {
    let correctAnswers = 0;
    for (let i = 0; i < questions.length; i++) {
      console.log(`Selected: ${letter[selectedOptions[i]]}, Correct: ${questions[i].Correct}`)
      if (letter[selectedOptions[i]] === questions[i].Correct) {
        correctAnswers++;
      }
    }
    return correctAnswers;
  };

  const levelUp = async () => {
    const obj = { userId: userId, xp: 1 };
    var js = JSON.stringify(obj);

    try {
      const response = await fetch(buildPath("api/setLevel"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());
      
      if(res.error){
        console.log("error: ", res.error)
      }else{
        var level = {
					cuisine: res.currCuisine,
          level: res.newLevel,
				};
				localStorage.setItem("level", JSON.stringify(level));
      }
    } catch (e) {
      console.log(e.toString())
    }

  }

  const handleFinishQuiz = () => {
    if (steps[activeStep].title === "Quiz 1") {
      const finalScore = calculateScore();
      setScoreQuiz1(finalScore); // Set score for Quiz 1
    } else if (steps[activeStep].title === "Quiz 2") {
      const finalScore = calculateScore();
      setScoreQuiz2(finalScore); // Set score for Quiz 2
    }
  
    setShowQuiz1(false); // Hide the quiz questions
    setShowQuiz2(false); // Hide the quiz questions
  };

  const handleTryAgain = () => {
    setShowQuiz1(true); // Show the quiz questions again
    // setShowQuiz2(true); // Show the quiz questions again
    setCurrentQuestionIndex(0); // Reset question index
    setQuestionNumber(1); // Reset question number
    setScoreQuiz1(0); // Reset score for Quiz 1
    // setScoreQuiz2(0); // Reset score for Quiz 2
    setSelectedOptions(Array(questions.length).fill(null)); // Reset selected options
  };

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
        {steps[activeStep].title === "Quiz 1"  && (
        <div style={{ marginTop: '16px', color: 'white' }}>
          <div key={questions[currentQuestionIndex]._id}>
            <h3>Question {questionNumber}: {questions[currentQuestionIndex].Question} {/* Display question number */}</h3>
            <br/>
            <ul>
              {Object.entries(questions[currentQuestionIndex].Answers).map(([key, value], optionIndex) => (
                <li
                  key={key}
                  onClick={() => handleOptionSelect(currentQuestionIndex, optionIndex)}
                  style={{
                    cursor: 'pointer',
                    marginBottom: '8px',
                    color: selectedOptions[currentQuestionIndex] === optionIndex ? 'green' : 'white'
                  }}
                >
                <span
                    style={{
                      display: 'inline-block',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      border: '1px solid white',
                      backgroundColor: selectedOptions[currentQuestionIndex] === optionIndex ? 'green' : 'transparent',
                      marginRight: '8px',
                    }}
                  ></span>
                  {value}
                </li>
              ))}
            </ul>
          </div>
          <br/>
          <div>
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePreviousQuestion}
                className="quiz-button"
              >
                Previous Question
              </button>
            )}
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="quiz-button"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={handleFinishQuiz}
                className="quiz-button"
              >
                Finish Quiz
              </button>
            )}
          </div>
        </div>
      )}
      
      {!showQuiz1 && score !== null && (
        <div style={{ marginTop: '16px', color: 'white' }}>
          <h3>Quiz Results:</h3>
          <br/>
          <p>Your Score: {scoreQuiz1} / {questions.length}</p>
          <br/>
          <button
            onClick={handleTryAgain}
            className="quiz-button"
          >
            Try Again
          </button>
        </div>
      )}
      {steps[activeStep].title === "Quiz 2" && (
        <div style={{ marginTop: '16px', color: 'white' }}>
          <div key={questions[currentQuestionIndex]._id}>
            <h3>Question {questionNumber}: {questions[currentQuestionIndex].Question} {/* Display question number */}</h3>
            <br/>
            <ul>
              {Object.entries(questions[currentQuestionIndex].Answers).map(([key, value], optionIndex) => (
                <li
                  key={key}
                  onClick={() => handleOptionSelect(currentQuestionIndex, optionIndex)}
                  style={{
                    cursor: 'pointer',
                    marginBottom: '8px',
                    color: selectedOptions[currentQuestionIndex] === optionIndex ? 'green' : 'white'
                  }}
                >
                <span
                    style={{
                      display: 'inline-block',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      border: '1px solid white',
                      backgroundColor: selectedOptions[currentQuestionIndex] === optionIndex ? 'green' : 'transparent',
                      marginRight: '8px',
                    }}
                  ></span>
                  {value}
                </li>
              ))}
            </ul>
          </div>
          <br/>
          <div>
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePreviousQuestion}
                className="quiz-button"
              >
                Previous Question
              </button>
            )}
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="quiz-button"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={handleFinishQuiz}
                className="quiz-button"
              >
                Finish Quiz
              </button>
            )}
          </div>
        </div>
      )}
      
      {!showQuiz2 && score!== null && (
        <div style={{ marginTop: '16px', color: 'white' }}>
          <h3>Quiz Results:</h3>
          <br/>
          <p>Your Score: {scoreQuiz2} / {questions.length}</p>
          <br/>
          <button
            onClick={handleTryAgain}
            className="quiz-button"
          >
            Try Again
          </button>
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
