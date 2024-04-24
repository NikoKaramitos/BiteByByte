import React, { useState } from "react";
import lasagna from "../assets/lasagna.jpeg";
import tiramisu from "../assets/tirmasiu.jpeg";
import carbonara from "../assets/carbonara.png";
import baoBuns from "../assets/baoBuns.png";
import pekingDuck from "../assets/pekingDuck.png";
import tsoChicken from "../assets/tsoChicken.png";
import "../styles/cookBookCard.css";

const CookBookCard = ({ text, buttonText, onClick }) => {
    const [isFlipped, setIsFlipped] = useState(false);
  
    let imageUrl = "";
  
    switch (text) {
      case "Lasagna":
        imageUrl = lasagna;
        break;
      case "Tiramisu":
        imageUrl = tiramisu;
        break;
      case "Carbonara":
        imageUrl = carbonara;
        break;
      case "Char Siu Bao Buns":
        imageUrl = baoBuns;
        break;
      case "General Tso's Chicken":
        imageUrl = tsoChicken;
        break;
      case "Peking Duck":
        imageUrl = pekingDuck;
        break;
      default:
        break;
    }
  
    const handleButtonClick = () => {
      setIsFlipped(!isFlipped); // Toggle the flipped state on button click
    };
  
    return (
      <div className="card-flip-container">
        <div className={`card-flip ${isFlipped ? "is-flipped" : ""}`}>
          {/* Front face of the card */}
          <div className="front-face">
            <div className="card_image">
              <img src={imageUrl} alt="Recipe" />
            </div>
            <div className="card_content">
              <h2>{text}</h2>
              <div className="card_title" onClick={handleButtonClick}>
                {buttonText}
              </div>
              <div className="card_text">{/* Content for the card */}</div>
            </div>
          </div>
          {/* Back face of the card */}
          <div className="back-face">
            <div className="card_content">
              <div className="text-center text-black flex-col items-center justify-center">
                <p className="my-2 text-sm">Ingredients here</p>
                <p className="text-xs">Steps here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default CookBookCard;
