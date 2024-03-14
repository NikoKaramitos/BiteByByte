import React, { useState } from "react";
//import Register from "../components/Register";
import kitchen from "../assets/kitchen.gif";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import sendEmail from "../functions/SendEmail";

export default function Login() {
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

		if (!loginName.value || !loginPassword.value) {
			setMessage("All fields are required.");
			return;
		}

		try {
			const response = await fetch(buildPath("api/login"), {
				method: "POST",
				body: js,
				headers: { "Content-Type": "application/json" },
			});

			var res = JSON.parse(await response.text());

			if (res.error === "Username not found") {
				setMessage("Username not found. Create an account now!");
				return;
			}
			if (res.error === "Password not found") {
				setMessage(
					"Seems to be the wrong password. \n Use Forgot Password"
				);
				return;
			} else {
				var user = {
					firstName: res.firstName,
					lastName: res.lastName,
					id: res.id,
				};
				localStorage.setItem("user_data", JSON.stringify(user));
				// console.log("verified?: ", res.verified);
				if (res.verified) {
					setMessage("");
					window.location.href = "/cards";
				} else {
					setMessage("Verified your email first. Check your email");
					sendEmail(res.email, res.code, "verify");
					window.location.href = "/verify";
				}
			}
		} catch (e) {
			alert(e.toString());
			return;
		}
	};

	const navigate = useNavigate();

	return (
		<div className="relative w-full h-screen bg-zinc-900/90">
			<img
				className="absolute w-full h-full object-cover mix-blend-overlay"
				src={kitchen}
				alt=""
			/>
			<div className=" flex justify-center items-center h-full">
				<form className="max-w-[400px] w-full rounded 2xl shadowl border-4 border-black 2xl mx-auto bg-white p-8">
					<h2 className="text-2xl font-bold text-center py-6 ">
						BITEbyBYTE
					</h2>
					<div className="flex flex-col mb-4 text-sm">
						<label>Username</label>
						<input
							id="loginName"
							className="relative block px-3 py-2 rounded-lg w-full
							bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none peer"
							required
							type="text"
							placeholder=" "
							ref={(c) => (loginName = c)}
						/>
						<span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
							Enter a Username
						</span>
					</div>
					<div className="flex flex-col mb-4 text-sm">
						<label>Password</label>
						<input
							id="loginPassword"
							className="peer relative 2text-md block px-3 py-2 rounded-lg w-full
							bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none
							invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
							type="password"
							placeholder=" "
							required
							ref={(c) => (loginPassword = c)}
						/>
					</div>
					<a
						href="#_"
						className="relative flex flex-col items-center py-2 mt-3 mb-3 overflow-hidden font-medium text-black border-2 border-orange-500 rounded-full hover:text-white group hover:bg-gray-50"
					>
						<span className="absolute left-0 block w-full h-0 transition-all bg-orange-500 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
						<span className="absolute right-0 flex-col items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
							<svg
								className="w-5 h-5"
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
						<button className="relative" onClick={doLogin}>
							Sign In
						</button>
					</a>
					<span className="text-xs text-red-500" id="loginResult">
						{message}
					</span>
					<p className="flex items-center mt-2 relative text-sm">
						<input className="mr-2 mt-3  mb-3" type="checkbox" />{" "}
						Forgot Password?{" "}
					</p>

					<button
						id="registerButton"
						className="w-full py-3 mt-4 bg-orange-500 hover: relative text-white"
						onClick={() => navigate("/register")}
					>
						Register
					</button>
				</form>
			</div>
			<Footer />
		</div>
	);
}
