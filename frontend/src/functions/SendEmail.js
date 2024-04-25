const app_name = "bitebybyte-9e423411050b";

function buildPath(route) {
	if (process.env.NODE_ENV === "production") {
		return "https://" + app_name + ".herokuapp.com/" + route;
	} else {
		return "http://localhost:5001/" + route;
	}
}
async function sendEmail(email, code, type) {
	//===========================================
	// incoming: email, code, type(verify, password)
	//===========================================
	let mail = {
		emailTo: email,
		message: "Please enter the following code: " + code,
		subject:
			type === "verify"
				? "Email Verification Code"
				: "Reset Password Code",
	};
	let js = JSON.stringify(mail);
	try {
		const mailing = await fetch(buildPath("api/email"), {
			method: "POST",
			body: js,
			headers: { "Content-Type": "application/json" },
		});
		// console.log("Mailing: " + JSON.stringify(mailing));

		let res = JSON.parse(await mailing.text());

		if (res.error) {
			console.log(res.error);
		}
		// else {
		// 	window.location.href = "/verify";
		// }
	} catch (e) {
		console.log("Mail error");
		alert(e.toString());
		return;
	}
}
export default sendEmail;
