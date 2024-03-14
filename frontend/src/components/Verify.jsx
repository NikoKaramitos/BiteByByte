import React, { useState } from "react";
import kitchen from "../assets/kitchen.gif";
// import { useNavigate } from "react-router-dom";
// import Footer from "../components/Footer";

function Verify() {
	let code;
	const [message, setMessage] = useState("");
	// const navigate = useNavigate();

	const app_name = "bitebybyte-9e423411050b";
	function buildPath(route) {
		if (process.env.NODE_ENV === "production") {
			return "https://" + app_name + ".herokuapp.com/" + route;
		} else {
			return "http://localhost:5001/" + route;
		}
	}

	const doVerify = async (event) => {
		event.preventDefault();
		var obj = { code: parseInt(code.value) };
		var js = JSON.stringify(obj);
		try {
			const response = await fetch(buildPath("api/verify"), {
				method: "POST",
				body: js,
				headers: { "Content-Type": "application/json" },
			});
			var res = JSON.parse(await response.text());
			if (res.error) {
				console.log(res.error);
				setMessage("Invalid Code");
				return;
			} else {
				setMessage("");
				window.location.href = "/login";
			}
		} catch (e) {
			setMessage(e.toString());
		}
	};

	return (
		<div
			id="Background-color"
			className="relative w-full h-screen bg-zinc-900/90 flex justify-center items-center"
		>
			<img
				id="Background-image"
				className=" absolute inset-0 w-full h-full object-cover mix-blend-overlay"
				src={kitchen}
				alt=""
			/>
			<div className="relative z-10">
				<form
					onSubmit={doVerify}
					className="max-w-[400px] w-full rounded 2x1 shadowl 2xl border-4 border-black mx-auto bg-white p-10"
					noValidate
				>
					<h2 className="text-2xl font-bold text-center py-6 ">
						BITEbyBYTE.
					</h2>
					<span id="title">Insert Code</span>
					<br />
					<input
						className="relative 2text-md block px-3 py-2 rounded-lg w-full
                    bg-white border-2 border-gray-300 placeholder-gray-300 shadow-md
                    invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
						type="text"
						id="code"
						required
						pattern="[0-9]"
						placeholder="123456"
						ref={(c) => (code = c)}
					/>
					<br />

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
							onClick={doVerify}
						>
							Submit
						</button>
					</a>
					<span id="codeResult">{message}</span>
				</form>
			</div>
		</div>
	);
}

export default Verify;
