import React, { useState } from "react";
//import aroundWorld from '../assets/around-world2.jpeg';
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import kitchen from "../assets/kitchen.gif";
import sendEmail from "../functions/SendEmail";

export default function Register() {
	var firstName;
	var lastName;
	var email;
	var username;
	var password;

	const [message, setMessage] = useState("");

	const navigate = useNavigate();

	const app_name = "bitebybyte-9e423411050b";
	function buildPath(route) {
		if (process.env.NODE_ENV === "production") {
			return "https://" + app_name + ".herokuapp.com/" + route;
		} else {
			return "http://localhost:5001/" + route;
		}
	}

	const doRegister = async (event) => {
		event.preventDefault();
		let code = Math.floor(100000 + Math.random() * 900000);

		var obj = {
			firstName: firstName.value,
			lastName: lastName.value,
			email: email.value,
			username: username.value,
			password: password.value,
			code: code,
		};
		var js = JSON.stringify(obj);
		if (
			!firstName.value ||
			!lastName.value ||
			!email.value ||
			!username.value ||
			!password.value
		) {
			setMessage("All fields are required.");
			return;
		}

		try {
			const response = await fetch(buildPath("api/register"), {
				method: "POST",
				body: js,
				headers: { "Content-Type": "application/json" },
			});

			var res = JSON.parse(await response.text());

			if (res.error === "Username taken") {
				setMessage("Username is already taken.");
				return;
			}
			if (res.error === "That email has been used in another account") {
				setMessage(
					"That email has been used in another account. \n Use Forgot Password"
				);
				return;
			} else {
				var user = {
					firstName: res.firstName,
					lastName: res.lastName,
					email: res.email,
					username: res.username,
					password: res.password,
					id: res.id,
					levels: res.levels,
				};
				localStorage.setItem("user_data", JSON.stringify(user));

				setMessage(
					"Registration succesful! Check your email for confirmation"
				);

				//	window.location.href = "/login";
			}
		} catch (e) {
			alert(e.toString());
			return;
		}

		sendEmail(email.value, code, "verify");
		window.location.href = "/verify";
	};

	return (
		<div className="relative w-full h-screen bg-zinc-900/90">
			<img
				className="absolute w-full h-full object-cover mix-blend-overlay"
				src={kitchen}
				alt=""
			/>
			<div className="relative flex justify-center items-center h-full">
				<form
					className="max-w-[400px] w-full rounded 2xl shadowl 2xl border-4 border-black mx-auto bg-white p-10"
					noValidate
				>
					<h2 className="text-2xl font-bold text-center py-6 ">
						BITEbyBYTE.
					</h2>

					<div className="flex flex-col mb-4 text-sm">
						<label>
							First Name
							<input
								id="firstName"
								input="text"
								className="relative 2text-md block px-3 py-2 rounded-lg w-full
                    bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md
                    invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
								ref={(c) => (firstName = c)}
								placeholder=" "
								type="text"
								required
								pattern="^(?=.*[a-zA-Z])[^\d]+$"
							/>
							<span class="mt-2 hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
								Name cannot contain numbers
							</span>
						</label>
					</div>

					<div className="flex flex-col mb-4 text-sm">
						<label>
							Last Name
							<input
								id="lastName"
								className="relative 2text-md block px-3 py-2 rounded-lg w-full
                    bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none peer
                    invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
								placeholder=" "
								type="text"
								required
								pattern="^(?=.*[a-zA-Z])[^\d]+$"
								ref={(c) => (lastName = c)}
							/>
							<span class="mt-2 hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
								Name cannot contain numbers
							</span>
						</label>
					</div>

					<div className="flex flex-col mb-4 text-sm">
						<label>
							Email
							<input
								id="email"
								type="email"
								name="email"
								className="peer relative 2text-md block px-3 py-2 rounded-lg w-full
                    bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none
                    invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
								ref={(c) => (email = c)}
								placeholder=" "
								required
								pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
							/>
							<span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
								Enter a valid email address
							</span>
						</label>
					</div>

					<div className="flex flex-col mb-4 text-sm">
						<label>
							Username
							<input
								id="username"
								className="peer relative 2text-md block px-3 py-2 rounded-lg w-full
                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none
                            invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
								placeholder=" "
								required
								pattern="^[a-zA-Z0-9_]{5,}$"
								type="text"
								ref={(c) => (username = c)}
							/>
							<span className="mt-2 hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
								Username must be longer than 5 characters
								including numbers and underscores
							</span>
						</label>
					</div>

					<div className="flex flex-col text-sm">
						<label>
							Password
							<input
								id="password"
								className="relative block px-3 py-2 mb-2 rounded-lg w-full
                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none
                            invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
								type="password"
								placeholder=" "
								required
								pattern=".{7,}"
								ref={(c) => (password = c)}
							/>
							<span class="mt-2 hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
								Password must contain one uppercase and at least
								one digit.
							</span>
						</label>
					</div>

					<a
						href="#_"
						className="relative flex flex-col items-center px-12 py-3 mt-2 overflow-hidden font-medium text-black border-2 border-orange-500 rounded-full hover:text-white group hover:bg-gray-50 text-sm"
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
						<button
							className="relative"
							type="submit"
							onClick={doRegister}
						>
							Register
						</button>
					</a>
					<span className="text-xs text-red-500" id="registerResult">
						{message}
					</span>
					<p className="flex items-center mt-2 relative text-sm">
						<input className="mr-2 mt-3  mb-3" type="checkbox" />{" "}
						Forgot Password?{" "}
					</p>
					<span
						id="signinButton"
						className="relative text-sm w-full my-5 py-3 mt-4 text-black"
						onClick={() => navigate("/login")}
					>
						Already a member? Sign in now!
					</span>
				</form>
			</div>
			<Footer />
		</div>
	);
}
