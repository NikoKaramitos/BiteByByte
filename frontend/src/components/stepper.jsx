import React, { useState, useEffect } from "react";
import { CardContent } from "@mui/material";
import HorizontalStepper from "react-stepper-horizontal";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"; // Import arrow icons
import Select from "react-select";
import "../App.css";

const CustomStepper = ({
	steps,
	ingredients,
	instructions,
	questions1,
	questions2,
	questions3,
}) => {
	const app_name = "bitebybyte-9e423411050b";
	const [activeStep, setActiveStep] = useState(0);
	const [crossedOffInstructions, setCrossedOffInstructions] = useState(
		Array(instructions.length).fill(false)
	);
	const [selectedOptions1, setSelectedOptions1] = useState(
		Array(questions1.length).fill(null)
	);
	const [selectedOptions2, setSelectedOptions2] = useState(
		Array(questions2.length).fill(null)
	);
	const [selectedOptions3, setSelectedOptions3] = useState(
		Array(questions3.length).fill(null)
	);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [questionNumber, setQuestionNumber] = useState(1); // Initialize question number
	const [score, setScore] = useState(0); // Initialize score
	const [showQuiz1, setShowQuiz1] = useState(true); // Initialize showQuiz state
	const [showQuiz2, setShowQuiz2] = useState(true); // Initialize showQuiz state
	const [showQuiz3, setShowQuiz3] = useState(true); // Initialize showQuiz state
	const [scoreQuiz1, setScoreQuiz1] = useState(0); // Initialize score for Quiz 1
	const [scoreQuiz2, setScoreQuiz2] = useState(0);
	const [scoreQuiz3, setScoreQuiz3] = useState(0);
	const [showResults1, setShowResults1] = useState(false); // Flag to control quiz results visibility
	const [showResults2, setShowResults2] = useState(false); // Flag to control quiz results visibility
	const [showResults3, setShowResults3] = useState(false); // Flag to control quiz results visibility

	const letter = { 0: "A", 1: "B", 2: "C", 3: "D" };
	var _ud = localStorage.getItem("user_data");
	var ud = JSON.parse(_ud);
	var userId = ud.id;

	var _level = localStorage.getItem("level");
	var level = JSON.parse(_level);
	var currLevel = level.level;

	useEffect(() => {
		// Reset question index and number when active step changes
		setCurrentQuestionIndex(0);
		setQuestionNumber(1);
	}, [activeStep]);

	if (!questions1 || !questions2 || !questions3) {
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

	const handleOptionSelect1 = (questionIndex, optionIndex) => {
		const newSelectedOptions1 = [...selectedOptions1];
		newSelectedOptions1[questionIndex] = optionIndex;
		setSelectedOptions1(newSelectedOptions1);
	};

	const handleOptionSelect2 = (questionIndex, optionIndex) => {
		const newSelectedOptions2 = [...selectedOptions2];
		newSelectedOptions2[questionIndex] = optionIndex;
		setSelectedOptions2(newSelectedOptions2);
	};

	const handleOptionSelect3 = (questionIndex, optionIndex) => {
		const newSelectedOptions3 = [...selectedOptions3];
		newSelectedOptions3[questionIndex] = optionIndex;
		setSelectedOptions3(newSelectedOptions3);
	};

	const handleNextQuestion = () => {
		setCurrentQuestionIndex(currentQuestionIndex + 1);
		setQuestionNumber(questionNumber + 1); // Increment question number
	};

	const handlePreviousQuestion = () => {
		setCurrentQuestionIndex(currentQuestionIndex - 1);
		setQuestionNumber(questionNumber - 1); // Decrement question number
	};

	const calculateScore1 = () => {
		let correctAnswers = 0;
		for (let i = 0; i < questions1.length; i++) {
			console.log(
				`Selected: ${letter[selectedOptions1[i]]}, Correct: ${
					questions1[i].Correct
				}`
			);
			if (letter[selectedOptions1[i]] === questions1[i].Correct) {
				correctAnswers++;
			}
		}
		return correctAnswers;
	};

	const calculateScore2 = () => {
		let correctAnswers = 0;
		for (let i = 0; i < questions2.length; i++) {
			console.log(
				`Selected: ${letter[selectedOptions2[i]]}, Correct: ${
					questions2[i].Correct
				}`
			);
			if (letter[selectedOptions2[i]] === questions2[i].Correct) {
				correctAnswers++;
			}
		}
		return correctAnswers;
	};

	const calculateScore3 = () => {
		let correctAnswers = 0;
		for (let i = 0; i < questions3.length; i++) {
			console.log(
				`Selected: ${letter[selectedOptions3[i]]}, Correct: ${
					questions3[i].Correct
				}`
			);
			if (letter[selectedOptions3[i]] === questions3[i].Correct) {
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

			if (res.error) {
				console.log("error: ", res.error);
			} else {
				var level = {
					cuisine: res.currCuisine,
					level: res.newLevel,
				};
				localStorage.setItem("level", JSON.stringify(level));
				console.log("What is my level after levelUP: ", currLevel);
				currLevel = level.level;
			}
		} catch (e) {
			console.log(e.toString());
		}
	};

	const handleFinishQuiz = () => {
		const finishQuiz = async () => {
			if (steps[activeStep].title === "Quiz 1") {
				const finalScore = calculateScore1();
				if (finalScore === 3 && currLevel === 10) {
					await levelUp(); // Wait for levelUp to complete
				}
				setShowResults1(true); // Set flag to display quiz results
				setScoreQuiz1(finalScore); // Set score for Quiz 1
			} else if (steps[activeStep].title === "Quiz 2") {
				const finalScore = calculateScore2();
				if (finalScore === 3 && currLevel === 11) {
					await levelUp(); // Wait for levelUp to complete
				}
				setScoreQuiz2(finalScore); // Set score for Quiz 2
				setShowResults2(true);
				// Set flag to display quiz results
			} else if (steps[activeStep].title === "Finish") {
				const finalScore = calculateScore3();
				if (finalScore === 3 && currLevel === 12) {
					await levelUp(); // Wait for levelUp to complete
				}
				setScoreQuiz3(finalScore); // Set score for Quiz 2
				setShowResults3(true); // Set flag to display quiz results
			}

			// Add navigation logic here after levelUp
			// handleNext(); // Or any other navigation function as needed
		};

		finishQuiz(); // Call the async function to handle the logic
	};

	const handleTryAgain = () => {
		setShowQuiz1(true); // Show the quiz questions again
		setShowQuiz2(true); // Show the quiz questions again
		setShowQuiz3(true); // Show the quiz questions again
		setCurrentQuestionIndex(0); // Reset question index
		setQuestionNumber(1); // Reset question number
		setScoreQuiz1(0); // Reset score for Quiz 1
		setScoreQuiz2(0); // Reset score for Quiz 2
		setScoreQuiz3(0); // Reset score for Quiz 3
		setSelectedOptions1(Array(questions1.length).fill(null)); // Reset selected options
		setSelectedOptions2(Array(questions2.length).fill(null)); // Reset selected options
		setSelectedOptions3(Array(questions3.length).fill(null)); // Reset selected options
		setShowResults1(false);
		setShowResults2(false);
		setShowResults3(false);
	};

	const handleNext = () => {
		if (
			steps[activeStep].title === "Ingredients" ||
			steps[activeStep].title === "Instructions" ||
			steps[activeStep].title === "Intro"
		) {
			setActiveStep(activeStep + 1);
		} else if (
			steps[activeStep].title === "Quiz 1" &&
			currLevel % 10 >= 1
		) {
			setActiveStep(activeStep + 1);
		} else if (
			steps[activeStep].title === "Quiz 2" &&
			currLevel % 10 >= 2
		) {
			setActiveStep(activeStep + 1);
		} else if (currLevel % 10 >= 2) {
			setActiveStep(activeStep + 1);
		} else if (
			steps[activeStep].title === "Finish" &&
			currLevel % 10 === 0
		) {
			window.location.reload();
		}
		console.log("CurrLevel: ", currLevel);
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
					<h3
						style={{ color: "white", fontFamily: "Press Start 2P" }}
					>
						{steps[activeStep].content}
					</h3>
					{steps[activeStep].title === "Ingredients" && (
						<div style={{ marginTop: "16px" }}>
							<h3 style={{ color: "white" }}>Ingredients:</h3>
							<ul style={{ paddingLeft: "20px", color: "white" }}>
								{ingredients.map((ingredient, index) => (
									<li
										key={index}
										style={{
											marginBottom: "8px",
											cursor: "pointer",
										}}
									>
										<input
											type="checkbox"
											id={`ingredient-${index}`}
											name={`ingredient-${index}`}
											style={{
												width: "16px",
												height: "16px",
											}}
										/>
										<label
											htmlFor={`ingredient-${index}`}
											style={{
												marginLeft: "8px",
												userSelect: "none",
											}}
										>
											{ingredient}
										</label>
									</li>
								))}
							</ul>
						</div>
					)}
					{steps[activeStep].title === "Quiz 1" && (
						<div style={{ marginTop: "16px", color: "white" }}>
							<div key={questions1[currentQuestionIndex]._id}>
								<h3>
									Question {questionNumber}:{" "}
									{questions1[currentQuestionIndex].Question}{" "}
									{/* Display question number */}
								</h3>
								<br />
								<ul>
									{Object.entries(
										questions1[currentQuestionIndex].Answers
									).map(([key, value], optionIndex) => (
										<li
											key={key}
											onClick={() =>
												handleOptionSelect1(
													currentQuestionIndex,
													optionIndex
												)
											}
											style={{
												cursor: "pointer",
												marginBottom: "8px",
												color:
													selectedOptions1[
														currentQuestionIndex
													] === optionIndex
														? "green"
														: "white",
											}}
										>
											<span
												style={{
													display: "inline-block",
													width: "16px",
													height: "16px",
													borderRadius: "50%",
													border: "1px solid white",
													backgroundColor:
														selectedOptions1[
															currentQuestionIndex
														] === optionIndex
															? "green"
															: "transparent",
													marginRight: "8px",
												}}
											></span>
											{value}
										</li>
									))}
								</ul>
							</div>
							<br />
							<div>
								{currentQuestionIndex > 0 && (
									<button
										onClick={handlePreviousQuestion}
										className="quiz-button"
									>
										Previous Question
									</button>
								)}
								{currentQuestionIndex <
								questions1.length - 1 ? (
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

					{steps[activeStep].title === "Quiz 1" && showResults1 && (
						<div style={{ marginTop: "16px", color: "white" }}>
							<h3>Quiz 1 Results:</h3>
							<br />
							<p>
								Your Score: {scoreQuiz1} / {questions1.length}
							</p>
							<br />
							<button
								onClick={handleTryAgain}
								className="quiz-button"
							>
								Try Again
							</button>
						</div>
					)}
					{steps[activeStep].title === "Quiz 2" && (
						<div style={{ marginTop: "16px", color: "white" }}>
							<div key={questions2[currentQuestionIndex]._id}>
								<h3>
									Question {questionNumber}:{" "}
									{questions2[currentQuestionIndex].Question}{" "}
									{/* Display question number */}
								</h3>
								<br />
								<ul>
									{Object.entries(
										questions2[currentQuestionIndex].Answers
									).map(([key, value], optionIndex) => (
										<li
											key={key}
											onClick={() =>
												handleOptionSelect2(
													currentQuestionIndex,
													optionIndex
												)
											}
											style={{
												cursor: "pointer",
												marginBottom: "8px",
												color:
													selectedOptions2[
														currentQuestionIndex
													] === optionIndex
														? "green"
														: "white",
											}}
										>
											<span
												style={{
													display: "inline-block",
													width: "16px",
													height: "16px",
													borderRadius: "50%",
													border: "1px solid white",
													backgroundColor:
														selectedOptions2[
															currentQuestionIndex
														] === optionIndex
															? "green"
															: "transparent",
													marginRight: "8px",
												}}
											></span>
											{value}
										</li>
									))}
								</ul>
							</div>
							<br />
							<div>
								{currentQuestionIndex > 0 && (
									<button
										onClick={handlePreviousQuestion}
										className="quiz-button"
									>
										Previous Question
									</button>
								)}
								{currentQuestionIndex <
								questions2.length - 1 ? (
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
					{steps[activeStep].title === "Quiz 2" && showResults2 && (
						<div style={{ marginTop: "16px", color: "white" }}>
							<h3>Quiz 2 Results:</h3>
							<br />
							<p>
								Your Score: {scoreQuiz2} / {questions2.length}
							</p>
							<br />
							<button
								onClick={handleTryAgain}
								className="quiz-button"
							>
								Try Again
							</button>
						</div>
					)}
					{steps[activeStep].title === "Instructions" && (
						<div style={{ marginTop: "16px" }}>
							<h3 style={{ color: "white" }}>Instructions:</h3>
							<ol style={{ paddingLeft: "20px", color: "white" }}>
								{instructions.map((instruction, index) => (
									<li
										key={index}
										style={{
											marginBottom: "8px",
											cursor: "pointer",
											textDecoration:
												crossedOffInstructions[index]
													? "line-through"
													: "none",
											textDecorationColor:
												crossedOffInstructions[index]
													? "#D2122E"
													: "initial",
											textDecorationThickness:
												crossedOffInstructions[index]
													? "4px"
													: "auto", // Adjust the thickness of the line-through
										}}
										onClick={() =>
											handleInstructionClick(index)
										}
									>
										<span>
											<strong>Step {index + 1}:</strong>{" "}
											{/* Add "Step X:" */}
											{instruction}{" "}
											{/* Instruction on a new line */}
										</span>
									</li>
								))}
							</ol>
						</div>
					)}
					{steps[activeStep].title === "Finish" && (
						<div style={{ marginTop: "16px", color: "white" }}>
							<div key={questions3[currentQuestionIndex]._id}>
								<h3>
									Question {questionNumber}:{" "}
									{questions3[currentQuestionIndex].Question}{" "}
									{/* Display question number */}
								</h3>
								<br />
								<ul>
									{Object.entries(
										questions3[currentQuestionIndex].Answers
									).map(([key, value], optionIndex) => (
										<li
											key={key}
											onClick={() =>
												handleOptionSelect3(
													currentQuestionIndex,
													optionIndex
												)
											}
											style={{
												cursor: "pointer",
												marginBottom: "8px",
												color:
													selectedOptions3[
														currentQuestionIndex
													] === optionIndex
														? "green"
														: "white",
											}}
										>
											<span
												style={{
													display: "inline-block",
													width: "16px",
													height: "16px",
													borderRadius: "50%",
													border: "1px solid white",
													backgroundColor:
														selectedOptions3[
															currentQuestionIndex
														] === optionIndex
															? "green"
															: "transparent",
													marginRight: "8px",
												}}
											></span>
											{value}
										</li>
									))}
								</ul>
							</div>
							<br />
							<div>
								{currentQuestionIndex > 0 && (
									<button
										onClick={handlePreviousQuestion}
										className="quiz-button"
									>
										Previous Question
									</button>
								)}
								{currentQuestionIndex <
								questions3.length - 1 ? (
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
								{steps[activeStep].title === "Finish" &&
									showResults3 && (
										<div
											style={{
												marginTop: "16px",
												color: "white",
											}}
										>
											<h3>Final Results:</h3>
											<br />
											<p>
												Your Score: {scoreQuiz3} /{" "}
												{questions3.length}
											</p>
											<br />
											<button
												onClick={handleTryAgain}
												className="quiz-button"
											>
												Try Again
											</button>
										</div>
									)}
							</div>
						</div>
					)}
					<div style={{ marginTop: "60px", marginBottom: "16px" }}>
						<button
							disabled={activeStep === 0}
							onClick={handleBack}
							className="back-button"
							style={{
								marginRight: "8px",
								opacity: activeStep === 0 ? 0.5 : 1,
								cursor:
									activeStep === 0
										? "not-allowed"
										: "pointer",
							}}
						>
							<KeyboardArrowLeft /> Back
						</button>
						<button
							disabled={activeStep === steps.length - 1}
							onClick={handleNext}
							className="next-button"
							style={{
								opacity: activeStep === steps.length ? 0.5 : 1,
								cursor:
									activeStep === steps.length
										? "not-allowed"
										: "pointer",
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
							steps={steps.map((step) => ({ title: step.title }))}
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
				<CardContent>{renderContent()}</CardContent>
			</div>
		</div>
	);
};

export default CustomStepper;
