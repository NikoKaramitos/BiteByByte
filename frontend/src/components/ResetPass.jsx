import React, { useState } from "react";
import stoveTop from "../assets/stovetop.gif";
import Footer from "./Footer";

export default function ForgotPass() {
	var resetCode;
	var newPassword;
	var confirmPass;
	const [message, setMessage] = useState("");

	const app_name = "bitebybyte-9e423411050b";
	function buildPath(route) {
		if (process.env.NODE_ENV === "production") {
			return "https://" + app_name + ".herokuapp.com/" + route;
		} else {
			return "http://localhost:5001/" + route;
		}
	}

	// let _rc = localStorage.getItem("ResetCode");
	// let rc = JSON.parse(_rc);
	// let email = rc.email;
	// let actualCode = rc.code;

	const doReset = async (event) => {
		event.preventDefault();

		let _rc = localStorage.getItem("ResetCode");
		let rc = JSON.parse(_rc);
		let email = rc.email;
		let actualCode = rc.code;
		console.log("Actual code:", actualCode);
		console.log("Input code:", resetCode.value);

		if (!resetCode.value) {
			setMessage("Reset Code field required");
			return;
		}

		if (!newPassword.value) {
			setMessage("New Password field required");
			return;
		}

		if (newPassword.value !== confirmPass.value) {
			setMessage("Passwords do not match");
			return;
		}

		if (actualCode !== parseInt(resetCode.value)) {
			setMessage("Invalid Reset Code");
			return;
		}

		var obj = {
			email: email,
			newPassword: newPassword.value,
		};
		var js = JSON.stringify(obj);

		try {
			const response = await fetch(buildPath("api/changePassword"), {
				method: "POST",
				body: js,
				headers: { "Content-Type": "application/json" },
			});

			var res = JSON.parse(await response.text());

			if (res.error) {
				setMessage(res.error.toString());
				return;
			}
			setMessage("");
			localStorage.removeItem("ResetCode");
		} catch (e) {
			alert(e.toString());
			return;
		}
		window.location.href = "/login";
	};

	return (
		<div className="relative w-full h-screen bg-zinc-600/90">
			<img
				className="absolute w-full h-full object-cover mix-blend-overlay"
				src={stoveTop}
				alt=""
			/>
			<div className="relative flex justify-center items-center h-full">
				<form className="max-w-[400px] w-full rounded 2xl shadowl border-4 border-black 2xl mx-auto bg-white p-10">
					<h2 className="text-2xl font-bold text-center py-4 ">
						BITEbyBYTE
					</h2>
					<p className="mb-6 text-xs text-center text-gray-500 dark:text-gray-600">
						Enter code to Reset Password
					</p>

					<div className="flex flex-col mb-4 text-sm">
						<label>Reset Code</label>
						<input
							id="ResetCode"
							type="text"
							name="ResetCode"
							className="relative block px-3 py-2 rounded-lg w-full
							bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none peer"
							required
							pattern="[0-9]"
							placeholder=" "
							ref={(c) => (resetCode = c)}
						/>
					</div>

					<div className="flex flex-col text-sm">
						<label>
							New Password
							<input
								id="NewPassword"
								className="relative block px-3 py-2 mb-2 rounded-lg w-full
                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none
                            invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
								type="password"
								placeholder=" "
								required
								pattern=".{7,}"
								ref={(c) => (newPassword = c)}
							/>
							<span className="mt-2 hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
								Password must contain one uppercase and at least
								one digit.
							</span>
						</label>
					</div>
					<div className="flex flex-col text-sm">
						<label>
							Confirm Password
							<input
								id="ConfirmPassword"
								className="relative block px-3 py-2 mb-2 rounded-lg w-full
                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
								type="password"
								placeholder=" "
								required
								pattern=".{7,}"
								ref={(c) => (confirmPass = c)}
							/>
						</label>
					</div>
					<span className="text-xs text-red-500" id="Email">
						{message}
					</span>

					<a
						href="#_"
						className="relative flex flex-col items-center py-2 mt-3 mb-3 overflow-hidden font-medium text-black border-2 border-orange-500 rounded-full hover:text-white group hover:bg-gray-50"
					>
						<span className="absolute left-0 block w-full h-0 transition-all bg-orange-500 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
						<span className="absolute right-0 flex-col items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
								/>
							</svg>
						</span>
						<button className="relative" onClick={doReset}>
							Reset Password
						</button>
					</a>
					<span
						className="text-xs text-red-500"
						id="emailResult"
					></span>
				</form>
			</div>
			<Footer />
		</div>
	);
}
