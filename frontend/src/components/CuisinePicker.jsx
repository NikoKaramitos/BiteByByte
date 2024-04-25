import React, { useState } from "react";
import frenchBear from "../assets/cuisineBears/frenchBear.png";
import chinaBear from "../assets/cuisineBears/chinaBear.png";
import mexicoBear from "../assets/cuisineBears/mexicoBear.png";
import italyBear from "../assets/cuisineBears/italyBear.png";
import window from "../assets/Designer.jpeg";
import { useNavigate } from "react-router-dom";

export default function CuisinePicker() {
  var _ud = localStorage.getItem("user_data");
	var ud = JSON.parse(_ud);
	var userId = ud.id;
	var firstName = ud.firstName;
	var lastName = ud.lastName;
  const navigate = useNavigate();

  const handleCuisineSelect = async (cuisine) => {
    try {
      const response = await fetch(buildPath("api/setCuisine"), {
        method: "POST",
        body: JSON.stringify({ userId, cuisine }),
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());
      
      if(res.error){
        console.log("error: ", res.error)
      }else{
        var level = {
					cuisine: res.currCuisine,
          level: res.newLevel,
				};
				localStorage.setItem("level", JSON.stringify(level));
      }
      // const data = await response.json();
      // Handle response if needed
    } catch (error) {
      // Handle error
    }
    navigate(`/dash/${cuisine}`);
};


  const app_name = "bitebybyte-9e423411050b";
  function buildPath(route) {
    if (process.env.NODE_ENV === "production") {
      return "https://" + app_name + ".herokuapp.com/" + route;
    } else {
      return "http://localhost:5001/" + route;
    }
  }


  return (
    <div className="relative w-full h-screen bg-zinc-700/90">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={window}
        alt=""
      />

<div>
      <div className="flex p-12 justify-center items-center h-full">
        <div
          className="flex relative
          justify-center items-center container shadow-2xl mx-auto 
          max-w-[800px] w-full rounded 2xl shadowl border-4 border-[#fc8f22] 2xl bg-orange-50 text-[#009ea2]"
        >
          <div>
          <h2
            className="animate-bounce text-xl leading-none tracking-tight text-transform: capitalize font-bold text-center py-6 p-4"
            style={{ lineHeight: "3em" }}
          >
            Hello Chef {firstName}!<br></br>
            Where would you like to begin?
          
          </h2>
          <p className=" flex justify-center p-4 text-xs text-center text-gray-500 dark:text-gray-600">
            Select the cuisine you wish to master
          </p>
          </div>
        </div>
      </div>

      <div className="justify-center items-center grid grid-cols-2 m-8 p-5">
        <div className=" relative flex m-8 justify-center">
          <button className="w-full sm:w-auto" id="italyCuisine" onClick={() => handleCuisineSelect("Italian")}>
            <a
              href="#_"
              className="relative  inline-flex items-center justify-start py-7 pl-8 pr-16 overflow-hidden font-semibold
             text-[#009246] transition-all duration-150 ease-in-out rounded-lg hover:pl-10 hover:pr-6 bg-gray-50 group"
            >
              <span
                className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out
             bg-[#009246] group-hover:h-full"
              ></span>
              <span className="absolute right-2 pr-4 duration-200 ease-out group-hover:translate-x-16">
                <svg
                  className="w-5 h-5 text-[#ce2b37]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                <svg
                  className="w-5 h-5 text-[#ce2b37]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span
                className="relative w-full text-left transition-colors duration-200 ease-in-out
             group-hover:text-white p-2"
              >
                ITALIAN
              </span>
              <img src={italyBear} alt="italyBear" className=" h-21 w-20 " />
              
            </a>
          </button>
        </div>

        <div className=" relative flex m-8 justify-center">
          <button className="w-full sm:w-auto" id="franceCuisine" onClick={() => handleCuisineSelect("French")}>
            <a
              href="#_"
              className="relative  inline-flex items-center justify-start py-7 pl-8 pr-16 overflow-hidden font-semibold
             text-[#013896] transition-all duration-150 ease-in-out rounded-lg hover:pl-10 hover:pr-6 bg-gray-50 group"
            >
              <span
                className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out
             bg-[#013896] group-hover:h-full"
              ></span>
              <span className="absolute right-2 pr-4 duration-200 ease-out group-hover:translate-x-16">
                <svg
                  className="w-5 h-5 text-[#cf142b]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                <svg
                  className="w-5 h-5 text-[#cf142b]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span
                className="relative w-full text-left transition-colors duration-200 ease-in-out
             group-hover:text-white"
              >
                FRENCH
              </span>

              <img src={frenchBear} alt="frenchBear" className=" h-20 w-25 " />
            </a>
          </button>
        </div>

        <div className=" relative flex m-8 justify-center mt-5">
          <button className="w-full sm:w-auto" id="chinaCuisine" onClick={() => handleCuisineSelect("Chinese")}>
            <a
              href="#_"
              className="relative  inline-flex items-center justify-start py-7 pl-8 pr-16 overflow-hidden font-semibold
             text-[#EE1C25] transition-all duration-150 ease-in-out rounded-lg hover:pl-10 hover:pr-6 bg-gray-50 group"
            >
              <span
                className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out
             bg-[#EE1C25] group-hover:h-full"
              ></span>
              <span className="absolute right-2 pr-4 duration-200 ease-out group-hover:translate-x-16">
                <svg
                  className="w-5 h-5 text-[#fce44afa]-bold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                <svg
                  className="w-5 h-5 text-[#ffdf00]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span
                className="relative w-full text-left transition-colors duration-200 ease-in-out
             group-hover:text-white p-2"
              >
                CHINESE
              </span>
              <img src={chinaBear} alt="chinaBear" className=" h-21 w-20 " />
            </a>
          </button>
        </div>

        <div className=" relative flex m-8 justify-center mt-5">
          <button className="w-full sm:w-auto" id="mexicoCuisine" onClick={() => handleCuisineSelect("Mexican")}>
            <a
              href="#_"
              className="relative  inline-flex items-center justify-start py-7 pl-8 pr-16 overflow-hidden font-semibold
             text-[#006341] transition-all duration-150 ease-in-out rounded-lg hover:pl-10 hover:pr-6 bg-gray-50 group"
            >
              <span
                className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out
             bg-[#006341] group-hover:h-full"
              ></span>
              <span className="absolute right-2 pr-4 duration-200 ease-out group-hover:translate-x-16">
                <svg
                  className="w-5 h-5 text-[#ce1126] font-bold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                <svg
                  className="w-5 h-5 text-[#ce1126] font-bold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span
                className="relative w-full text-left transition-colors duration-200 ease-in-out
             group-hover:text-white p-2"
              >
                MEXICAN
              </span>
              <img src={mexicoBear} alt="mexicoBear" className=" h-21 w-20 " />
            </a>
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
