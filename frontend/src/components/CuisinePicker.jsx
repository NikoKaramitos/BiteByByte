import React, { useState } from "react";
import bearPR from "../assets/bearPr.png";
import frenchBear from "../assets/cuisineBears/frenchBear.png";
import chinaBear from "../assets/cuisineBears/chinaBear.png";
import mexicoBear from "../assets/cuisineBears/mexicoBear.png";
import window from "../assets/Designer.jpeg";

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
    <div className="relative w-full h-screen bg-zinc-900/90">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={window}
        alt=""
      />
      <div
        className="flex relative
		justify-center items-center container shadow-2xl mx-auto h-64
		max-w-[800px] w-full rounded 2xl shadowl border-4 border-emerald-900 2xl bg-emerald-500"
      >
        <h2
          className="animate-bounce text-xl leading-none tracking-tight text-transform: capitalize font-bold text-center py-8"
          style={{ lineHeight: "3em" }}
        >
          Hello Chef {firstName}!<br></br>
          Where would you like to begin?
        </h2>
      </div>

      <div class="justify-center items-center grid grid-cols-2 m-4 p-5">
        <div className="relative flex m-4 justify-center items-center">
          <button
            buttonType="filled"
            size="xl"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple={true}
            onClick={addCard}
            className=" hover:bg-emerald-400 border-b-4 border-emerald-700 hover:border-emerald-500
            align-middle font-bold text-center uppercase transition-all text-lg
				disabled:opacity-50  py-3 px-6 rounded-lg bg-emerald-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg
				 hover:shadow-gray-900/20 focus:opacity-[0.85]
				 active:opacity-[0.85] active:shadow-none flex items-center w-80 h-40"
          >
            <img
              src={bearPR}
              alt="BearPR"
              className="h-20 w-20 mr-5 font-bold"
            />
            <h1 className="text-center text-3xl">italy</h1>
          </button>
        </div>

        <div className=" relative flex m-8 justify-center">
          <button className="w-full sm:w-auto">
            <a
              href="#_"
              class="relative  inline-flex items-center justify-start py-7 pl-8 pr-16 overflow-hidden font-semibold
             text-[#013896] transition-all duration-150 ease-in-out rounded-lg hover:pl-10 hover:pr-6 bg-gray-50 group"
            >
              <span
                class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out
             bg-[#013896] group-hover:h-full"
              ></span>
              <span class="absolute right-2 pr-4 duration-200 ease-out group-hover:translate-x-16">
                <svg
                  class="w-5 h-5 text-[#cf142b]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                <svg
                  class="w-5 h-5 text-[#cf142b]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span
                class="relative w-full text-left transition-colors duration-200 ease-in-out
             group-hover:text-white"
              >
                FRANCE
              </span>

              <img src={frenchBear} alt="frenchBear" className=" h-20 w-25 " />
            </a>
          </button>
        </div>

        <div className=" relative flex m-8 justify-center">
          <button className="w-full sm:w-auto">
            <a
              href="#_"
              class="relative  inline-flex items-center justify-start py-7 pl-8 pr-16 overflow-hidden font-semibold
             text-[#EE1C25] transition-all duration-150 ease-in-out rounded-lg hover:pl-10 hover:pr-6 bg-gray-50 group"
            >
              <span
                class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out
             bg-[#EE1C25] group-hover:h-full"
              ></span>
              <span class="absolute right-2 pr-4 duration-200 ease-out group-hover:translate-x-16">
                <svg
                  class="w-5 h-5 text-[#fce44afa]-bold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                <svg
                  class="w-5 h-5 text-[#ffdf00]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span
                class="relative w-full text-left transition-colors duration-200 ease-in-out
             group-hover:text-white p-2"
              >
                CHINA
              </span>
              <img src={chinaBear} alt="chinaBear" className=" h-21 w-20 " />
            </a>
          </button>
        </div>

        <div className=" relative flex m-8 justify-center">
          <button className="w-full sm:w-auto">
            <a
              href="#_"
              class="relative  inline-flex items-center justify-start py-7 pl-8 pr-16 overflow-hidden font-semibold
             text-[#006341] transition-all duration-150 ease-in-out rounded-lg hover:pl-10 hover:pr-6 bg-gray-50 group"
            >
              <span
                class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out
             bg-[#006341] group-hover:h-full"
              ></span>
              <span class="absolute right-2 pr-4 duration-200 ease-out group-hover:translate-x-16">
                <svg
                  class="w-5 h-5 text-[#ce1126] font-bold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                <svg
                  class="w-5 h-5 text-[#ce1126] font-bold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span
                class="relative w-full text-left transition-colors duration-200 ease-in-out
             group-hover:text-white p-2"
              >
                MEXICO
              </span>
              <img src={mexicoBear} alt="mexicoBear" className=" h-21 w-20 " />
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}
