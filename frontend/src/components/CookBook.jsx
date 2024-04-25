import React, { useState } from "react";
import kitchen2 from "../assets/kitchen2.png";
import "../styles/cookBookStyle.css";
import CookBookCard from "../components/cookBookCard";
import lasagna from "../assets/lasagna.jpeg";
import tirmasiu from "../assets/tirmasiu.jpeg";

const cuisines = [
  { buttonText: "Italian" },
  { buttonText: "France" },
  { buttonText: "Mexican" },
  { buttonText: "Chinese " },
];

export default function CookBook() {
  var _ud = localStorage.getItem("user_data");
  var ud = JSON.parse(_ud);
  var userId = ud.id;
  var firstName = ud.firstName;
  var lastName = ud.lastName;

  function selectCuisine(){
    
  }
  return (
    <div class=" text-white bg-black w-screen h-screen flex justify-end">
      <div className="relative w-full h-screen bg-zinc-500/90">
        <img
          className="absolute w-full h-full object-cover mix-blend-overlay"
          src={kitchen2}
          alt=""
        />

        <div className="relative flex justify-center items-center h-full">
          <div className="max-w-[800px] w-full rounded 2xl shadowl border-4 border-black 2xl mx-auto bg-amber-100 bg-opacity-90 p-8">
            <h1 className="text-center text-black text-lg m-3">
              Chef {firstName}'s Cook Book
            </h1>
            <div className="flex justify-between items-center">
              {/* "Prev" Button */}
              <button
                type="button"
                className="bg-gray-800 text-white rounded border-r border-gray-100 py-2 hover:bg-orange-500 hover:text-white px-3"
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
                  <p className="ml-2">Prev</p>
                </div>
              </button>

              {/* Heading "Name of Cuisine"*/}
              {/* Still need to add functionlity to switch between cuisines */}
              <h2 className="text-center text-black text-lg m-3">
                Name of Cuisine
              </h2>
              {/* Next Button */}
              <button
                type="button"
                class="bg-gray-800 text-white rounded py-2 border-l border-gray-200 hover:bg-orange-600 hover:text-white px-3"
              >
                <div class="flex flex-row align-middle">
                  <span class="mr-2">Next</span>
                  <svg
                    class="w-5 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>


            <div className="flex justify-center gap-5 mt-8">
              <div className=" cursor-pointer group ">
                <div className=" bg-white relative preserve-3d group-hover:my-rotate-y-180  duration-1000">
                  <div className=" text-black backface-hidden ">
                    <CookBookCard
                      className="flex w-96 h-96"
                      imageUrl={lasagna}
                      buttonText="Lasagna Recipe"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-xl text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <div className="text-center text-black flex-col items-center justify-center">
                      <h1>Lasagna Reciepe!</h1>
                      <p className="my-2 text-sm"> Ingredigents here</p>
                      <p className="text-xs">Steps here</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cursor-pointer group perspective">
                <div className=" bg-white relative preserve-3d group-hover:my-rotate-y-180  duration-1000">
                  <div className=" text-black backface-hidden ">
                    <CookBookCard
                      className="flex"
                      imageUrl={tirmasiu}
                      buttonText="Lasagna Recipe"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-xl text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <div className="text-center text-black flex-col items-center justify-center">
                      <h1>Lasagna Reciepe!</h1>
                      <p className="my-2"> Ingredigents here</p>
                      <p>Steps here</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cursor-pointer group perspective">
                <div className=" bg-white relative preserve-3d group-hover:my-rotate-y-180  duration-1000">
                  <div className=" text-black backface-hidden ">
                    <CookBookCard
                      className="flex"
                      imageUrl={lasagna}
                      buttonText="Lasagna Recipe"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-xl text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <div className="text-center text-black flex-col items-center justify-center">
                      <h1>Lasagna Reciepe!</h1>
                      <p className="my-2"> Ingredigents here</p>
                      <p>Steps here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
