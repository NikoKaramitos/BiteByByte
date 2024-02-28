import React, { useState } from "react";

function Register() {
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
			return "http://localhost:5000/" + route;
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
		<div id="loginDiv">
			<form onSubmit={doLogin}>
				<span id="inner-title">PLEASE LOG IN</span>
				<br />
				<input
					type="text"
					id="loginName"
					placeholder="Username"
					ref={(c) => (loginName = c)}
				/>
				<br />
				<br />
				<input
					type="password"
					id="loginPassword"
					placeholder="Password"
					ref={(c) => (loginPassword = c)}
				/>
				<br />
				<br />
				<input
					type="submit"
					id="loginButton"
					class="buttons"
					value="Do It"
					onClick={doLogin}
				/>
			</form>
			<span id="loginResult">{message}</span>
		</div>
	);
}

export default Login;
