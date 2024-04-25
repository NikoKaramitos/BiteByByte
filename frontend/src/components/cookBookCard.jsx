import React, { useState, useEffect } from "react";
import lasagna from "../assets/lasagna.jpeg";
import tiramisu from "../assets/tirmasiu.jpeg";
import carbonara from "../assets/carbonara.png";
import baoBuns from "../assets/baoBuns.png";
import pekingDuck from "../assets/pekingDuck.png";
import tsoChicken from "../assets/tsoChicken.png";
import "../styles/cookBookCard.css";

const CookBookCard = ({ text, buttonText, userLevels }) => {
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
  const [instructions, setInstructions] = useState([]);
  const [message, setMessage] = useState("");
  const [clickedLines, setClickedLines] = useState({});
  const [hovered, setHovered] = useState(false);
  const handleHover = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

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

      const res = await response.json();

      if (res.error) {
        console.log(res.error);
        setMessage(res.error);
        // setIngredients([]);
        //setInstructions([]);
      } else {
        const { ingredients, instructions } = res;
        console.log(
          "Recipe info for " + text + ": " + ingredients,
          instructions
        );
        setIngredients(ingredients); // Update Ingredigents state with fetched ingredigents
        setInstructions(instructions);
        setMessage(""); // Clear any previous message
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  useEffect(() => {
     // Fetch recipe info based on 'text'
     const getRecipeInfo = async () => {
      try {
        const obj = { recipe: text };
        const js = JSON.stringify(obj);
        const response = await fetch(buildPath("api/recipe"), {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        });

        const res = await response.json();

        if (res.error) {
          console.log(res.error);
          setMessage(res.error);
        } else {
          const { ingredients, instructions } = res;
          setIngredients(ingredients);
          setInstructions(instructions);
          setMessage("");
        }
      } catch (e) {
        alert(e.toString());
      }
    };

    getRecipeInfo();
  }, [text]);

  const toggleLine = (category, index) => {
    const newClickedLines = { ...clickedLines };
    const key = `${category}_${index}`;
    newClickedLines[key] = !newClickedLines[key];
    setClickedLines(newClickedLines);
  };

  return (
    <div
      className={`relative preserve-3d ${
        hovered ? "my-scale-up" : "my-scale-down"
      } duration-1000`}
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
    >
      <div className="text-black backface-hidden">
        <div className="card">
          <div className="card_image">
            <img src={imageUrl} alt="Recipe" />
          </div>
          <div className="card_content">
            <h2 className="card_title">{text}</h2>
            {userLevels?.Italian < 12 && text === "Lasagna" ? (
              <p>Unlock at Level 12 for Lasagna</p>
            ) : (
              <h2 className="card_title">{buttonText}</h2>
            )}
            <h2 className="card_title">{buttonText}</h2>
          </div>
        </div>
      </div>
      {hovered && (
        <div className="absolute inset-0 rounded-xl text-center text-slate-200 transform rotateY-180 backface-visibility-hidden">
          <div className="text-center text-black flex-col items-center justify-center">
            <div className="card_face card_back">
              <div className="card_content">
                <div className="card_text">
                  <p className="my-2 text-sm">Ingredients:</p>
                  <ul className="text-xs">
                    {ingredients.map((ingredient, index) => (
                      <li
                        key={index}
                        onClick={() => toggleLine("ingredient", index)}
                        style={{
                          textDecoration:
                            clickedLines[`ingredient_${index}`] &&
                            "line-through red",
                        }}
                      >
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card_text">
                  <p className="my-2 text-sm">Instructions:</p>
                  <ol className="text-xs">
                    {instructions.map((instruction, index) => (
                      <li
                        key={index}
                        onClick={() => toggleLine("instruction", index)}
                        style={{
                          textDecoration:
                            clickedLines[`instruction_${index}`] &&
                            "line-through red",
                        }}
                      >{`Step ${index + 1}: ${instruction}`}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookBookCard;
