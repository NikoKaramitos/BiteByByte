import React, { useState, useEffect } from "react";
import lasagna from "../assets/lasagna.jpeg";
import tiramisu from "../assets/tirmasiu.jpeg";
import carbonara from "../assets/carbonara.png";
import baoBuns from "../assets/baoBuns.png";
import pekingDuck from "../assets/pekingDuck.png";
import tsoChicken from "../assets/tsoChicken.png";
import "../styles/cookBookCard.css";

const CookBookCard = ({ text, buttonText }) => {
  var imageUrl = ""; // display correct recipe image

  // This uses text to return the correct recipe image
  if (text === "Lasagna") {
    imageUrl = lasagna;
  } else if (text === "Tiramisu") {
    imageUrl = tiramisu;
  } else if (text === "Carbonara") {
    imageUrl = carbonara;
  } else if (text === "Char Siu Bao Buns") {
    imageUrl = baoBuns;
  } else if (text === "General Tso's Chicken") {
    imageUrl = tsoChicken;
  } else if (text === "Peking Duck") {
    imageUrl = pekingDuck;
  }

  const [ingredients, setIngredients] = useState([]);
  //const [recipe, setInstructions] = useState([]);
  const [message, setMessage] = useState("");

  // builds path
  const app_name = "bitebybyte-9e423411050b";
  function buildPath(route) {
    if (process.env.NODE_ENV === "production") {
      return "https://" + app_name + ".herokuapp.com/" + route;
    } else {
      return "http://localhost:5001/" + route;
    }
  }

  //this function uses text as the recipe name and searches through the /api/recipe
  // to display the ingredients and instructions
  const getRecipeInfo = async () => {

    try {
      const obj = { recipe: text };
    const js = JSON.stringify(obj);
      const response = await fetch(buildPath("api/recipe"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      const res = await response.json()

      if (res.error) {
        console.log(res.error);
        setMessage(res.error);
       // setIngredients([]);
        //setInstructions([]);
      } else {
        const { ingredients } = res;
        console.log("Recipe info for " + text + ": " + ingredients);
        setIngredients(ingredients); // Update Ingredigents state with fetched ingredigents
        // setInstructions(res.setInstructions);
        setMessage(""); // Clear any previous message
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  function getIngredigents(obj) {}

  useEffect(() => {
    getRecipeInfo();
  }, [text]); // Dependency array to re-run effect when index changes

  return (
    <div className="relative preserve-3d group-hover:my-rotate-y-180  duration-1000">
      <div className=" text-black backface-hidden ">
        <div className="card">
          <div className="card_image">
            <img src={imageUrl} alt="Recipe" />
          </div>
          <div className="card_content">
            <h2 className="card_title">{text}</h2>
            <h2 className="card_title">{buttonText}</h2>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 rounded-xl text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
        <div className="text-center text-black flex-col items-center justify-center">
          <div className="card_face card_back">
            <div className="card_content">
                <div className="card_text">
                  <p className="my-2 text-sm">
                    Ingredients here
                    <ul className="text-xs">
                    {ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                  </p>
                  <p className="text-xs">Steps here</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookBookCard;
