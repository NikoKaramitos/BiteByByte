import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import bearPR from "../assets/bearPr.png";
import LoggedInName from "../components/LoggedInName";

export default function CuisinePicker() {
  var card = "";
  var search = "";

  const app_name = "bitebybyte-9e423411050b";
  function buildPath(route) {
    if (process.env.NODE_ENV === "production") {
      return "https://" + app_name + ".herokuapp.com/" + route;
    } else {
      return "http://localhost:5001/" + route;
    }
  }

  const [message, setMessage] = useState("");
  const [searchResults, setResults] = useState("");
  const [cardList, setCardList] = useState("");

  let _ud = localStorage.getItem("user_data");
  let ud = JSON.parse(_ud);
  let userId = ud.id;
  let firstName = ud.firstName;
  let lastName = ud.lastName;

  const addCard = async (event) => {
    event.preventDefault();

    let obj = { userId: userId, card: card.value };
    let js = JSON.stringify(obj);

    try {
      const response = await fetch("buildPath('api/addcard", {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      let txt = await response.text();
      let res = JSON.parse(txt);

      if (res.error.length > 0) {
        setMessage("API Error:" + res.error);
      } else {
        setMessage("Card has been added");
      }
    } catch (e) {
      setMessage(e.toString());
    }
  };

  const searchCard = async (event) => {
    event.preventDefault();

    let obj = { userId: userId, search: search.value };
    let js = JSON.stringify(obj);

    try {
      const response = await fetch(buildPath("searchcards"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      let txt = await response.text();
      let res = JSON.parse(txt);
      let _results = res.results;
      let resultText = "";
      for (var i = 0; i < _results.length; i++) {
        resultText += _results[i];
        if (i < _results.length - 1) {
          resultText += ", ";
        }
      }
      setResults("Card(s) have been retrieved");
      setCardList(resultText);
    } catch (e) {
      alert(e.toString());
      setResults(e.toString());
    }
  };

  return (
    <div id="cardUIDiv" className="relative w-full h-screen">
		
      <div className=" container shadow-2xl mx-auto h-15px w-auto m-5 p-9">
		<h2 className="animate-bounce text-center mb-4 mt-30 text-xl leading-none tracking-tight
		text-transform: capitalize
		text-decoration: underline"
		style={{ lineHeight: "3em" }}>
          Hello Chef {firstName}! 
		  <br> 
		  </br>
		  Where would you like to begin?
        </h2>
      </div>


      <div class="justify-center items-center grid grid-cols-2 m-4 p-5">
        <div className="flex m-4 justify-center items-center">
          <Button
            color="blue"
            buttonType="filled"
            size="lg"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple={true}
            onClick={addCard}
            className="align-middle select-none font-bold text-center uppercase transition-all text-lg
				disabled:opacity-50  py-3 px-6 rounded-lg bg-[#0582ca] text-white shadow-md shadow-gray-900/10 hover:shadow-lg
				 hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none 
				 active:opacity-[0.85] active:shadow-none flex items-center gap-3 w-80 h-40"
          >
            <img src={bearPR} alt="BearPR" className="h-20 w-20 mr-5" />
          </Button> 
        </div>

		<div className="flex m-8 justify-center">
          <Button
            color="blue"
            buttonType="filled"
            size="lg"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple={true}
            onClick={addCard}
            className="items-center select-none font-sans font-bold text-center uppercase transition-all 
				disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 
				rounded-lg bg-[#0582ca] text-white shadow-md shadow-gray-900/10 hover:shadow-lg
				 hover:shadow-gray-900/20 focus:opacity-[0.85]
				 focus:shadow-none active:opacity-[0.85] active:shadow-none flex gap-3"
          >
            <img src={bearPR} alt="BearPR" className="h-20 w-20 mr-5" />
            I'm here!
          </Button>
        </div>
		<div className="flex m-4 justify-center">
          <Button
            color="blue"
            buttonType="filled"
            size="lg"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple={true}
            onClick={addCard}
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all 
				disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 
				rounded-lg bg-[#0582ca] text-white shadow-md shadow-gray-900/10 hover:shadow-lg
				 hover:shadow-gray-900/20 focus:opacity-[0.85] w-80
				 focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
          >
            <img src={bearPR} alt="BearPR" className="h-20 w-20 mr-5" />
            I'm here!
          </Button>
        </div>

		<div className="flex m-4 justify-center">
          <Button
            color="blue"
            buttonType="filled"
            size="lg"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple={true}
            onClick={addCard}
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all 
				disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 
				rounded-lg bg-[#0582ca] text-white shadow-md shadow-gray-900/10 hover:shadow-lg
				 hover:shadow-gray-900/20 focus:opacity-[0.85]
				 focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
          >
            <img src={bearPR} alt="BearPR" className="h-20 w-20 mr-5" />
            I'm here!
          </Button>
        </div>
		


      </div>
    </div>
  );
}
