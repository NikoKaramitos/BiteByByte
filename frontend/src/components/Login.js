//DEMO

import React from "react";

const app_name = 'bitebybyte-731c91aa3cb3'
function buildPath(route)
{
if (process.env.NODE_ENV === 'production')
{
return 'https://' + app_name + '.herokuapp.com/' + route;
}
else
{
return 'http://localhost:5001/' + route;
}
}

function Login() {
	const doLogin = async (event) => {
		event.preventDefault();

		alert("doIt()");
	};

	return (
		<div id="loginDiv">
			<form onSubmit={doLogin}>
				<span id="inner-title">PLEASE LOG IN</span>
				<br />
				<input type="text" id="loginName" placeholder="Username" />
				<br />
				<input
					type="password"
					id="loginPassword"
					placeholder="Password"
				/>
				<br />
				<input
					type="submit"
					id="loginButton"
					class="buttons"
					value="Do It"
					onClick={doLogin}
				/>
			</form>
			<span id="loginResult"></span>
		</div>
	);
}

export default Login;
