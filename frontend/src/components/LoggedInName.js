import React from "react";

function LoggedInName() {
	var _ud = localStorage.getItem("user_data");
	var ud = JSON.parse(_ud);
	var userId = ud.id;
	var firstName = ud.firstName;
	var lastName = ud.lastName;

	const doLogout = (event) => {
		event.preventDefault();

		localStorage.removeItem("user_data");
		window.location.href = "/";
	};

	return (
		<div id="loggedInDiv">
			<span id="userName">
				{firstName} {lastName}
			</span>
			<br />
		</div>
	);
}

export default LoggedInName;
