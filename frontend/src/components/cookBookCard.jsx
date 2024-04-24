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
    <div className="relative preserve-3d group-hover:my-rotate-y-180  duration-1000">
      <div className=" text-black backface-hidden ">
        <div className="card">
          <div className="card_image">
            <img src={imageUrl} alt="Recipe" />
          </div>
          <div className="card_content">
          <h2 className="card_title">{text}</h2>
            <h2 className="card_title">{buttonText}</h2>
            <div className="card_text">{/* Content for the card */}</div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 rounded-xl text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
        <div className="text-center text-black flex-col items-center justify-center">
        <div className="card_face card_back">
        <div className="card_content">
          <div className="card_text">
            <p className="my-2 text-sm">Ingredients here</p>
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
