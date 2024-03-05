import React, { useState } from "react";
import RegisterPage from "../pages/RegisterPage";
import aroundWorld from '../assets/around-world2.jpeg'

export default function Login()
{
    var loginName;
	var loginPassword;

	const app_name = "bitebybyte-9e423411050b";
	function buildPath(route) {
		if (process.env.NODE_ENV === "production") {
			return "https://" + app_name + ".herokuapp.com/" + route;
		} else {
			return "http://localhost:5001/" + route;
		}
	}

	const [message, setMessage] = useState("");

	const doLogin = async (event) => {
		event.preventDefault();

		var obj = { login: loginName.value, password: loginPassword.value };
		var js = JSON.stringify(obj);

		try {
			const response = await fetch(buildPath('api/login'), {
				method: "POST",
				body: js,
				headers: { "Content-Type": "application/json" },
			});

			var res = JSON.parse(await response.text());

			if (res.id <= 0) {
				setMessage("User/Password combination incorrect");
			} else {
				var user = {
					firstName: res.firstName,
					lastName: res.lastName,
					id: res.id,
				};
				localStorage.setItem("user_data", JSON.stringify(user));

				setMessage("");
				window.location.href = "/cards";
			}
		} catch (e) {
			alert(e.toString());
			return;
		}
	};


    return (
        <div className="relative w-full h-screen bg-zinc-900/90">
                <img className="absolute w-full h-full object-cover mix-blend-overlay" src= {aroundWorld} alt=""/>

            <div className="flex justify-center items-center h-full">
                <form className="max-w-[400px] w-full rounded 2xl shadowl 2xl mx-auto bg-white p-8">
                    <h2 className="text-4xl font-bold text-center py-6 ">BITEbyBYTE.</h2>
                    <div className="flex flex-col mb-4">
                        <label>Username</label>
                        <input id="loginName" className="border relative p-2" type="text" ref={(c) => (loginName = c)} />
                    </div>
                    <div className="flex flex-col">
                        <label>Password</label>
                        <input id="loginPassword" className="border relative p-2" type="password" ref={(c) => (loginPassword = c)}/>
                    </div>
                        <a href="#_" className="relative flex flex-col items-center px-12 py-3 mt-2 overflow-hidden font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50">
                            <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                            <span className="absolute right-0 flex-col items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span class="relative"onClick={doLogin}>Sign In</span>
                        </a>
                        <p className="flex items-center mt-2 relative"><input className="mr-2" type="checkbox" /> Remember Me </p>
                        
                        <button id="registerButton" className="w-full py-3 mt-8 bg-indigo-600 hover: bg-indigo-500 relative text-white" onClick={RegisterPage}>Register</button>
                    <span id="loginResult">{message}</span>
                     <span id="loginResult">{message}</span>
                </form>
            </div>
        </div>
    )
}