import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import tower2 from "../assets/tower2.webp";
import china from "../assets/china.png";
import france from "../assets/france.png";
import mexicanImage from "../assets/mexicanImage.webp";
import CustomStepper from "../components/stepper";
import RecipeCard from "../components/recipeCard";
import lasagna from "../assets/lasagna.jpeg";
import tiramisu from "../assets/tirmasiu.jpeg";
import carbonara from "../assets/carbonara.png";
import baoBuns from "../assets/baoBuns.png";
import pekingDuck from "../assets/pekingDuck.png";
import tsoChicken from "../assets/tsoChicken.png";
import taco from "../assets/taco.png";
import soup from "../assets/onionSoup.png";
import enchiladas from "../assets/enchiladas.png";
import chocolate from "../assets/chocolate.png";
import cake from "../assets/cake.png";
import beef from "../assets/beef.png";
import { useNavigate, useParams } from "react-router-dom";

const Dash = () => {
	const app_name = "bitebybyte-9e423411050b";
	const { cuisine } = useParams();
	const [showStepper, setShowStepper] = useState(false);
	const [ingredients, setIngredients] = useState([]);
	const [instructions, setInstructions] = useState([]);
	const [buttonClicked, setButtonClicked] = useState(false);
	const [selectedRecipeName, setSelectedRecipeName] = useState(null); // Define setSelectedRecipeName state
	const [questions1, setQuestions1] = useState([]); // State to store fetched questions
	const [questions2, setQuestions2] = useState([]); // State to store fetched questions
	const [questions3, setQuestions3] = useState([]); // State to store fetched questions
	const [message1, setMessage1] = useState("");
	var _level = localStorage.getItem("level");
	var level = JSON.parse(_level);
	var currLevel = level.level;

	// Function to generate intro content based on cuisine and selected recipe
	const generateIntroContent = (cuisine, recipeName) => {
		switch (cuisine) {
			case "Italian":
				switch (recipeName) {
					case "Tiramisu":
						return "Tiramisu, Italy's treasured dessert, means 'pick me up,' hinting at its uplifting flavors. In the 1960s, a Venetian chef blended coffee-dipped ladyfingers with mascarpone and cocoa, creating a creamy delight. Traditionally served in a round shape, it symbolizes a full moon's promise of new beginnings and shared joy.";
					case "Carbonara":
						return "Carbonara, a Roman culinary icon, marries eggs, Pecorino Romano, guanciale, and pepper with pasta for a dish of simple elegance. Folklore suggests it fueled coal workers, hence 'carbonara.' Others tie it to post-WWII when American soldiers mixed bacon and eggs with pasta. Today, it's a global comfort food.";
					case "Lasagna":
						return "Lasagna, tracing back to ancient Greece, was perfected in Italy’s Emilia-Romagna. Its layers of pasta, ragù, béchamel, and cheese embody tradition. Regional twists vary, but its essence—warmth and celebration—remains universal. Lasagna is more than a meal; it's a symbol of heritage and familial bonds.";
					default:
						return "Default intro content for Italian cuisine";
				}
			case "Chinese":
				switch (recipeName) {
					case "Char Siu Bao Buns":
						return "Intro content for Char Siu Bao Buns";
					case "General Tso's Chicken":
						return "Intro content for General Tso's Chicken";
					case "Peking Duck":
						return "Intro content for Peking Duck";
					default:
						return "Default intro content for Italian cuisine";
				}
			default:
				return "Default intro content for unspecified cuisine";
		}
	};

	const steps1 = [
		{
			title: "Intro",
			content: generateIntroContent(cuisine, selectedRecipeName),
		},
		{
			title: "Ingredients",
		},
		{
			title: "Quiz 1",
			quizzes: [
				{
					question: "Question 3",
					options: ["Option 1", "Option 2", "Option 3"],
					answer: 2,
				},
			],
		},
		{
			title: "Instructions",
		},
		{
			title: "Quiz 2",
			quizzes: [
				{
					question: "Question 3",
					options: ["Option 1", "Option 2", "Option 3"],
					answer: 2,
				},
			],
		},
		{
			title: "Finish",
			quizzes: [
				{
					question: "Question 4",
					options: ["Option 1", "Option 2", "Option 3"],
					answer: 1,
				},
			],
		},
	];

	const fetchQuestions = async (recipeName, level, difficulty, cuisineId) => {
		try {
			const obj = {
				recipe: recipeName,
				level: level,
				difficulty: difficulty,
				cuisineId: cuisineId,
			};
			const js = JSON.stringify(obj);

			const questionsResponse = await fetch(
				buildPath("api/getQuestions"),
				{
					method: "POST",
					body: js,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			var questionsData = JSON.parse(await questionsResponse.text());
			// const questionsData = await questionsResponse.json();
			if (questionsData.error) {
				console.log(questionsData.error);
				return null;
			}

			// console.log("Questions Data: ", questionsData)

			var { questions } = questionsData;
			// console.log("What is this: ", questions)

			return questions;
		} catch (error) {
			console.error("Error fetching questions:", error);
			return null;
		}
	};

	const handleButtonClick1 = (recipeName, level) => {
		// Modify to accept recipeName parameter
		const fetchRecipesAndShowStepper = async () => {
			try {
				// Create an object containing the recipe name and level
				const obj = { recipe: recipeName };
				// Convert the object to a JSON string
				const js = JSON.stringify(obj);

				// Fetch recipes for the selected recipe name
				const recipesResponse = await fetch(buildPath("api/recipe"), {
					method: "POST",
					body: js,
					headers: {
						"Content-Type": "application/json",
					},
				});
				const recipesData = await recipesResponse.json();
				if (recipesData.error) {
					console.log(recipesData.error);
					return;
				}

				// Extract ingredients and instructions from response data
				const { ingredients, instructions } = recipesData;

				// Fetch questions for the selected recipe and level
				// console.log(`Recipe: ${recipeName}, Level: ${level}`);
				const questions1 = await fetchQuestions(recipeName, 1);
				const questions2 = await fetchQuestions(recipeName, 2);
				const questions3 = await fetchQuestions(recipeName, 3);

				// console.log("Questions 1: ", questions1)
				// console.log("Questions 2: ", questions2)
				// console.log("Questions 3: ", questions3)

				// Update state with fetched ingredients, instructions, and questions
				setIngredients(ingredients);
				setInstructions(instructions);
				setQuestions1(questions1);
				setQuestions2(questions2);
				setQuestions3(questions3);

				// Update state with the selected recipe name
				setSelectedRecipeName(recipeName);

				// Set the stepper to be shown
				setShowStepper(true);
				setButtonClicked(true);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		// Call the inner async function
		fetchRecipesAndShowStepper();
	};

	function buildPath(route) {
		if (process.env.NODE_ENV === "production") {
			return "https://" + app_name + ".herokuapp.com/" + route;
		} else {
			return "http://localhost:5001/" + route;
		}
	}

	// Define image based on cuisine
	let imageSrc;
	let recipeInfo;
	let recipeImage;
	switch (cuisine) {
		case "Italian":
			imageSrc = tower2;
			recipeInfo = {
				recipe1: "Tiramisu",
				recipe2: "Carbonara",
				recipe3: "Lasagna",
			};
			recipeImage = {
				recipe1: tiramisu,
				recipe2: carbonara,
				recipe3: lasagna,
			};
			break;
		case "Mexican":
			imageSrc = mexicanImage;
			recipeInfo = {
				recipe1: "Tacos",
				recipe2: "Tres leches cake",
				recipe3: "Enchiladas",
			};
			recipeImage = {
				recipe1: taco,
				recipe2: cake,
				recipe3: enchiladas,
			};
			break;
		case "Chinese":
			imageSrc = china;
			recipeInfo = {
				recipe1: "Char Siu Bao Buns",
				recipe2: "General Tso's Chicken",
				recipe3: "Peking Duck",
			};
			recipeImage = {
				recipe1: baoBuns,
				recipe2: tsoChicken,
				recipe3: pekingDuck,
			};
			break;
		case "French":
			imageSrc = france;
			recipeInfo = {
				recipe1: "French onion soup",
				recipe2: "Chocolate soufflé",
				recipe3: "Boeuf Bourguignon",
			};
			recipeImage = {
				recipe1: soup,
				recipe2: chocolate,
				recipe3: beef,
			};
			break;
	}

	return (
		<div className="relative">
			<Navbar />
			<img className="w-full  z-0 " src={imageSrc}></img>
			{showStepper && (
				<div className="absolute z-10 top-40 left-0 w-full">
					{showStepper && (
						<CustomStepper
							steps={steps1}
							ingredients={ingredients}
							instructions={instructions}
							questions1={questions1}
							questions2={questions2}
							questions3={questions3}
						/>
					)}
				</div>
			)}
			{!buttonClicked && (
				<div className="absolute top-40 left-0 right-0 flex justify-center items-center">
					<RecipeCard
						imageUrl={recipeImage.recipe1}
						buttonText={recipeInfo.recipe1}
						onClick={() => {
							if (Math.floor(currLevel / 10) === 1) {
								// console.log("What is this?",Math.floor(currLevel/10))
								handleButtonClick1(recipeInfo.recipe1, 1);
							} else if (Math.floor(currLevel / 10) < 1) {
								setMessage1("Completed");
							} else {
								setMessage1("Need to complete prior Recipe");
							}
						}} // Pass recipe name as parameter
					/>
					{/* <span>{message1}</span> */}
					<div>
						<RecipeCard
							imageUrl={recipeImage.recipe2}
							buttonText={recipeInfo.recipe2}
							onClick={() => {
								if (Math.floor(currLevel / 10) === 2) {
									console.log(
										"What is this?",
										Math.floor(currLevel / 10)
									);
									handleButtonClick1(recipeInfo.recipe2, 2);
								}
							}}
							message={
								Math.floor(currLevel / 10) === 2
									? ""
									: Math.floor(currLevel / 10) > 2
									? "Completed"
									: "Need to Complete Prior Recipe"
							}
						/>
					</div>
					<RecipeCard
						imageUrl={recipeImage.recipe3}
						buttonText={recipeInfo.recipe3}
						onClick={() => {
							if (Math.floor(currLevel / 10) === 3) {
								console.log(
									"What is this?",
									Math.floor(currLevel / 10)
								);
								handleButtonClick1(recipeInfo.recipe3, 3);
							}
						}} // Pass recipe name as parameter
					/>
				</div>
			)}
			<Footer />
		</div>
	);
};

export default Dash;
