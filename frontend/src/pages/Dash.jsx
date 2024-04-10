import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import tower2 from "../assets/tower2.webp";
import greek from "../assets/greek2.png";
import mexicanImage from "../assets/mexicanImage.png";
import CustomStepper from "../components/stepper";
import RecipeCard from "../components/recipeCard";
import lasagna from "../assets/lasagna.jpeg";
import tiramisu from "../assets/tirmasiu.jpeg";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
let name;

const Dash = () => {
	const steps1 = [
		{
			title: "Introduction",
			content: "Introduction Content",
			quizzes: [
				{
					question: "Question 1",
					options: ["Option 1", "Option 2", "Option 3"],
					answer: 1,
				},
				{
					question: "Question 2",
					options: ["Option 1", "Option 2", "Option 3"],
					answer: 0,
				},
			],
		},
		{
			title: "Quiz 1",
			content: "Quiz 1 Content",
			quizzes: [
				{
					question: "Question 3",
					options: ["Option 1", "Option 2", "Option 3"],
					answer: 2,
				},
			],
		},
		{
			title: "Ingredients",
			content: "Ingredients Content",
			quizzes: [
				{
					question: "Question 4",
					options: ["Option 1", "Option 2", "Option 3"],
					answer: 1,
				},
			],
		},
		{
			title: "Quiz 2",
			content: "Quiz 1 Content",
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
			content: "final quiz",
			quizzes: [
				{
					question: "Question 4",
					options: ["Option 1", "Option 2", "Option 3"],
					answer: 1,
				},
			],
		},
	];

	const steps2 = [
		{
			title: "Introduction",
			content: "Introduction Content",
			quizzes: [
				{
					question: "Question 1",
					options: ["Option 1", "Option 2", "Option 3"],
					answer: 1,
				},
				{
					question: "Question 2",
					options: ["Option 1", "Option 2", "Option 3"],
					answer: 0,
				},
			],
		},
		{
			title: "Quiz 1",
			content: "Quiz 1 Content",
			quizzes: [
				{
					question: "Question 3",
					options: ["Option 1", "Option 2", "Option 3"],
					answer: 2,
				},
			],
		},
		{
			title: "Ingredients",
			content: "Ingredients Content",
			quizzes: [
				{
					question: "Question 4",
					options: ["Option 1", "Option 2", "Option 3"],
					answer: 1,
				},
			],
		},
		{
			title: "Quiz 2",
			content: "Quiz 1 Content",
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
			content: "final quiz",
			quizzes: [
				{
					question: "Question 4",
					options: ["Option 1", "Option 2", "Option 3"],
					answer: 1,
				},
			],
		},
	];

	const [showStepper1, setShowStepper1] = useState(false);
	const [showStepper2, setShowStepper2] = useState(false);
	const [buttonClicked, setButtonClicked] = useState(false);

	const handleButtonClick1 = () => {
		// fetchRecipes();
		setShowStepper1(true);
		setButtonClicked(true);
	};

	const handleBackButtonClick = () => {
		setShowStepper1(false);
		setShowStepper2(false);
		setButtonClicked(false);
	};

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

	const [recipes, setRecipes] = useState([]);
	const [error, setError] = useState(null);

	const fetchRecipes = async (event) => {
		var obj = { cuisine: "Italian" };
		var js = JSON.stringify(obj);
		try {
			const response = await fetch(buildPath("api/getRecipes"), {
				method: "POST",
				body: js,
				headers: {
					"Content-Type": "application/json",
				},
			});
			var res = JSON.parse(await response.text());
			if (res.error) {
				console.log(res.error);
			}
		} catch (e) {
			setError(e.toString());
		}
	};
	fetchRecipes();

	// Define image based on cuisine
	let imageSrc;
	switch (cuisine) {
		case "italian":
			imageSrc = tower2;
			break;
		case "mexican":
			imageSrc = mexicanImage;
			break;
		case "chinese":
			imageSrc = greek;
			break;
		case "french":
			imageSrc = greek;
			break;
	}

	return (
		<div className="relative">
			<Navbar />
			<img className="w-full  z-0 " src={imageSrc}></img>
			{(showStepper1 || showStepper2) && (
				<div className="absolute z-10 top-40 left-0 w-full">
					{showStepper1 && <CustomStepper steps={steps1} />}
					{showStepper2 && <CustomStepper steps={steps2} />}
					<div className="absolute top-80 left-0 right-0 text-center">
						<button
							className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							onClick={handleBackButtonClick}
						>
							Back
						</button>
					</div>
				</div>
			)}
			{!buttonClicked && (
				<div className="absolute top-40 left-0 right-0 flex justify-center items-center">
					<RecipeCard
						imageUrl={tiramisu}
						recipe="Recipe 1"
						buttonText="Tiramisu Recipe"
						onClick={handleButtonClick1}
					/>
					<RecipeCard
						imageUrl={lasagna}
						recipe="Recipe 2"
						buttonText="Carbonara Recipe"
						onClick={handleButtonClick1}
					/>
					<RecipeCard
						imageUrl={lasagna}
						recipe="Recipe 3"
						buttonText="Lasagna Recipe"
						onClick={handleButtonClick1}
					/>
				</div>
			)}
			<Footer />
		</div>
	);
};

export default Dash;
