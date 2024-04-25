import React, { useState, useEffect } from "react";
import kitchen2 from "../assets/kitchen2.png";
import CookBookCard from "../components/cookBookCard";
import "../styles/cookBookCard.css";

const cuisines = [
  { cuisineName: "Italian" },
  { cuisineName: "French" },
  { cuisineName: "Mexican" },
  { cuisineName: "Chinese" },
];

export default function CookBook() {

  var _ud = localStorage.getItem("user_data");
  var ud = JSON.parse(_ud);
  var userId = ud.id;
  var firstName = ud.firstName;
  var lastName = ud.lastName;
  var cuisine;

  const [currentCuisineIndex, setCurrentCuisineIndex] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState("");

  const app_name = "bitebybyte-9e423411050b";
  function buildPath(route) {
    if (process.env.NODE_ENV === "production") {
      return "https://" + app_name + ".herokuapp.com/" + route;
    } else {
      return "http://localhost:5001/" + route;
    }
  }

  const selectCuisine = () => {
    const newIndex = (currentCuisineIndex + 1) % cuisines.length;
    setCurrentCuisineIndex(newIndex);
    setRecipes([]); // Reset recipes when switching cuisines
    setMessage(""); // Clear any previous message
  };

  const loadRecipes = async () => {
    const selectedCuisine = cuisines[currentCuisineIndex].cuisineName;
    const obj = { cuisine: selectedCuisine };
    const js = JSON.stringify(obj);

    try {
      const response = await fetch(buildPath("api/getRecipes"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      const res = JSON.parse(await response.text());

      if (res.error) {
        console.log(res.error);
        setMessage("No Recipes Found for " + selectedCuisine);
        setRecipes([]);
      } 
      else {
        console.log("Recipes:" + res.recipes);
        setRecipes(res.recipes); // Update recipes state with fetched recipes
        //create a cookBookCard for each recipe per cuisine
        setMessage(""); // Clear any previous message
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  useEffect(() => {
    loadRecipes();
  }, [currentCuisineIndex]); // Dependency array to re-run effect when index changes

  return (
    <div className=" text-white bg-black w-screen h-screen flex justify-end">
      <div className="relative w-full h-screen bg-zinc-500/90">
        <img
          className="absolute w-full h-full object-cover mix-blend-overlay"
          src={kitchen2}
          alt=""
        />

        <div className="relative flex justify-center items-center h-full">
          <div className="max-w-[69em] w-full max-h-[750px] h-full rounded 2xl shadowl border-4 border-black 2xl mx-auto bg-amber-100 bg-opacity-90 p-8">
            <h1 className="text-center text-black text-lg m-3">
              Chef {firstName}'s Cook Book
            </h1>
            <div className="flex justify-between items-center">
              {/* "Prev" Button */}
              <button
                id="prev"
                type="button"
                className="bg-gray-800 text-white rounded py-2 border-l border-gray-200 hover:bg-orange-600 hover:text-white px-3"
                onClick={selectCuisine}
                
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="mr-2">Prev</span>
                </div>
              </button>

              {/* Heading "Name of Cuisine"*/}
              {/* Still need to add functionlity to switch between cuisines */}
              <h2 id="cuisine" className="text-center text-black text-lg m-3">
                {cuisines[currentCuisineIndex].cuisineName}
              </h2>
              {/* Next Button */}
              <button
                id="next"
                type="button"
                className="bg-gray-800 text-white rounded py-2 border-l border-gray-200 hover:bg-orange-600 hover:text-white px-3"
                onClick={selectCuisine}
                
              >
                <div className="flex flex-row align-middle">
                  <span className="mr-2">Next</span>
                  <svg
                    className="w-5 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>

            <div className="flex justify-center gap-5 mt-8">
            {recipes.map((recipe, index) => (
              <div className=" cursor-pointer group " key={index}>
               
                      {/* Example CookBookCard for each recipe */}
                      <CookBookCard
                      text={recipe}
                           // Assuming your recipe object has an imageUrl
                          buttonText="Recipe!" // Assuming your recipe object has a name
                        />
                      </div>
            ))}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
