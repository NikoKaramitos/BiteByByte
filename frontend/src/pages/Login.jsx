import React, { useState } from "react";

import aroundWorld from '../assets/around-world.jpg'

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
                <form className="max-w-[400px] w-full mx-auto bg-white p-8">
                    <h2 className="text-4xl font-bold text-center py-6 ">BITEbyBYTE.</h2>
                    <div className="flex flex-col mb-4">
                        <label>Username</label>
                        <input id="loginName" className="border relative p-2" type="text" ref={(c) => (loginName = c)} />
                    </div>
                    <div className="flex flex-col">
                        <label>Password</label>
                        <input id="loginPassword" className="border relative p-2 " type="password" ref={(c) => (loginPassword = c)}/>
                    </div>
                    <button id="loginButton" className="w-full py-3 mt-8 bg-indigo-600 hover: bg-indigo-500 relative text-white" onClick={doLogin}>Sign In</button>
                        <p className="flex items-center mt-2 relative"><input className="mr-2" type="checkbox" /> Remember Me </p>
                        <button id="registerButton" className="relative w-full my-5 py-2 text-black" onClick={doLogin}>Not a member? Sign up now!</button>
                    <span id="loginResult">{message}</span>
                </form>
            </div>
        </div>
    )
}