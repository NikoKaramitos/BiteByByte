import React, { useState } from "react";
import aroundWorld from '../assets/around-world2.jpeg';
//import LoginPage from "../pages/LoginPage";


export default function Register()
{
	var firstName;
	var lastName;
    var email;
    var username;
    var password;

	const app_name = "bitebybyte-9e423411050b";
	function buildPath(route) {
		if (process.env.NODE_ENV === "production") {
			return "https://" + app_name + ".herokuapp.com/" + route;
		} else {
			return "http://localhost:5001/" + route;
		}
	}

	const [message, setMessage] = useState("");

	const doRegister = async (event) => {
		event.preventDefault();

		var obj = { firstName: firstName.value, lastName: lastName.value, email: email.value, username: username.value, password:password.value };
		var js = JSON.stringify(obj);

		try {
			const response = await fetch(buildPath('api/register'), {
				method: "POST",
				body: js,
				headers: { "Content-Type": "application/json" },
			});

			var res = JSON.parse(await response.text());
            

			if (res.id <= 0) {
				setMessage("Username is already taken.");
                
			} else {
				var user = {
					firstName: res.firstName,
					lastName: res.lastName,
                    email: res.email,
                    username: res.username,
                    password: res.password,
					id: res.id
				};
				localStorage.setItem("user_data", JSON.stringify(user));

				setMessage("");
				window.location.href = "/";
			}
		} catch (e) {
			alert(e.toString());
			return;
		}
	};

    function goLogin (event){
		event.preventDefault();
		window.location.href = "/";
	};

	return (
            <div className="relative w-full h-screen bg-zinc-900/90">
            <img className="absolute w-full h-full object-cover mix-blend-overlay" src= {aroundWorld} alt=""/>

            <div className="flex justify-center items-center h-full">
                <form className="max-w-[400px] w-full rounded 2xl shadowl 2xl mx-auto bg-white p-8">
                    <h2 className="text-4xl font-bold text-center py-6 ">BITEbyBYTE.</h2>

                    <label>First Name</label>
                    <div className="flex flex-col mb-4">
                        <input id="firstName" className=" relative text-md block px-3 py-2 rounded-lg w-full bg-white border-2
                        border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none
                        invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" required
                        ref={(c) => (firstName = c)} />
                         <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        Please enter a first name</span>
                </div>


                <div className="flex flex-col mb-4">
                    <label>Last Name</label>
                    <input id="lasttName" className="relative 2text-md block px-3 py-2 rounded-lg w-full
                    bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none peer
                    invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" required
                    type="text" 
                    ref={(c) => (lastName = c)} />
                    <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        Please enter a last name</span>

                </div>

                <label>Email</label>
                <div className="flex flex-col mb-4">
                    <input id="email" type="email" name="email" className="peer relative 2text-md block px-3 py-2 rounded-lg w-full
                    bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none
                    invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                    placeholder=" " required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    ref={(c) => (email = c)} />
                    <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        Enter a valid email address</span>

                
                </div>
                
                <div className="flex flex-col mb-4">
                    <label>Username</label>
                    <input id="username" className="peer relative 2text-md block px-3 py-2 rounded-lg w-full
                        bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none
                        invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 "
                        required type="text" ref={(c) => (username = c)} />
                    <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        Enter a Username
                    </span>
                </div>


                <div className="flex flex-col">
                    <label>Password</label>
                    <input id="password" className="peer relative 2text-md block px-3 py-2 rounded-lg w-full
                        bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none
                        invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 "
                        type="password"  required pattern=".{7,}" ref={(c) => (password = c)}/>
                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        Enter a password
                        </span>
                </div>


                    <a href="#_" className="relative flex flex-col items-center px-12 py-3 mt-2 overflow-hidden font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50">
                        <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                        <span className="absolute right-0 flex-col items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                        <button className="relative"onClick={doRegister}>Register</button>
                    </a>
                    <span id="registerResult">{message}</span>
                    <p className="flex items-center mt-2 relative"><input className="mr-2" type="checkbox" /> Remember Me </p>
                    <button id="signinButton"className="relative w-full my-5 py-2 text-black" href="/" onClick={goLogin}>Already a member? Sign in now!</button>
            </form>
            </div>
            </div>
	);
}

