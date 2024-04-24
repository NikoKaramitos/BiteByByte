import React from "react";
import lasagna from "../assets/lasagna.jpeg";
import tiramisu from "../assets/tirmasiu.jpeg";
import carbonara from "../assets/carbonara.png";
import baoBuns from "../assets/baoBuns.png";
import pekingDuck from "../assets/pekingDuck.png";
import tsoChicken from "../assets/tsoChicken.png";
import "../styles/cookBookCard.css";

const CookBookCard = ({ text, buttonText, onClick }) => {
  var imageUrl = "";

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

  return (
    <div className="card">
      <div className="card_image">
        <img src={imageUrl} alt="Recipe" />
      </div>
      <div className="card_content">
        <h2>{text}</h2>
        <div className="card_title">{buttonText}</div>
        <div className="card_text">{/* Content for the card */}</div>
      </div>
    </div>
  );
};

export default CookBookCard;
