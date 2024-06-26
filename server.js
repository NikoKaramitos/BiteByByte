const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ObjectId } = require("mongodb");

const path = require("path");
const PORT = process.env.PORT || 5001;

const app = express();

app.set("port", process.env.PORT || 5001);

app.use(cors());
app.use(bodyParser.json());

/**********************************************************************************
 *
 * DATABASE
 *
 **********************************************************************************/

require("dotenv").config();
const url = process.env.MONGODB_URI;
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(url);
client.connect(console.log("mongodb connected"));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PATCH, DELETE, OPTIONS"
	);
	next();
});

/**********************************************************************************
 *
 * API Section
 *
 **********************************************************************************/

const nodemailer = require("nodemailer");
const { google } = require("googleapis");

app.post("/api/addcard", async (req, res, next) => {
	//===========================================
	// incoming: userId, color
	// outgoing: error
	//===========================================

	const { userId, card } = req.body;

	const newCard = { Card: card, UserId: userId };
	var error = "";

	try {
		const db = client.db("Users");
		const result = db.collection("users").insertOne(newCard);
	} catch (e) {
		error = e.toString();
	}

	cardList.push(card);

	var ret = { error: error };
	res.status(200).json(ret);
});

app.post("/api/register", async (req, res, next) => {
	//===========================================
	// incoming: firstName, lastName, email, login, password
	// outgoing: id, error
	//===========================================

	const { firstName, lastName, email, username, password, code } = req.body;
	const levels = { Italian: 0, Mexican: 0, French: 0, Chinese: 0 };

	const newUser = {
		FirstName: firstName,
		LastName: lastName,
		Email: email,
		Login: username,
		Password: password,
		TokenKey: code,
		Verified: false,
		CurrCuisine: null,
		Levels: levels,
	};
	var id = -1;
	var fn = "";
	var ln = "";
	var error = "";
	// Check for duplicate users
	try {
		const db = client.db("Users");
		const duplicateUser = await db
			.collection("users")
			.find({ Login: username })
			.toArray();

		if (duplicateUser.length > 0) {
			return res.status(409).json({ error: "Username taken" });
		}

		const duplicateEmail = await db
			.collection("users")
			.find({ Email: email })
			.toArray();

		if (duplicateEmail.length > 0) {
			return res
				.status(409)
				.json({ error: "That email has been used in another account" });
		}

		const result = await db.collection("users").insertOne(newUser);
		id = result.insertedId;
		fn = firstName;
		ln = lastName;
	} catch (e) {
		error = e.toString();
	}

	var ret = { id: id, firstName: fn, lastName: ln, error: error };
	res.status(error ? 500 : 200).json(ret);
});

app.post("/api/login", async (req, res, next) => {
	//===========================================
	// incoming: login, password
	// outgoing: everything in the user document, error
	//===========================================

	var error = "";

	const { login, password } = req.body;

	const db = client.db("Users");

	const usernames = await db
		.collection("users")
		.find({ Login: login })
		.toArray();
	if (usernames.length == 0) {
		error = "Username not found";
		return res.status(409).json({ error: error });
	}
	const passwords = await db
		.collection("users")
		.find({ Password: password })
		.toArray();
	if (passwords.length == 0) {
		error = "Password not found";
		return res.status(409).json({ error: error });
	}

	const results = await db
		.collection("users")
		.find({ Login: login, Password: password })
		.toArray();

	var id = -1;
	var fn = "";
	var ln = "";
	var email = "";
	var code = -1;
	var verified = false;
	var currCuisine = null;
	var levels = "";

	if (results.length > 0) {
		id = results[0]._id;
		fn = results[0].FirstName;
		ln = results[0].LastName;
		email = results[0].Email;
		code = results[0].TokenKey;
		verified = results[0].Verified;
		currCuisine = results[0].CurrCuisine;
		levels = results[0].Levels;
	} else {
		error = "No Record Found";
	}

	var ret = {
		id: id,
		firstName: fn,
		lastName: ln,
		email: email,
		code: code,
		verified: verified,
		currCuisine: currCuisine,
		levels: levels,
		error: error,
	};
	res.status(200).json(ret);
});

app.post("/api/searchcards", async (req, res, next) => {
	//===========================================
	// incoming: userId, search
	// outgoing: results[], error
	//===========================================

	var error = "";

	const { userId, search } = req.body;

	var _search = search.trim();

	const db = client.db("Users");
	const results = await db
		.collection("Cuisines")
		.find({ Card: { $regex: _search + ".*", $options: "i" } })
		.toArray();

	var _ret = [];
	for (var i = 0; i < results.length; i++) {
		_ret.push(results[i].Card);
	}

	var ret = { results: _ret, error: error };
	res.status(200).json(ret);
});

app.post("/api/deleteUser", async (req, res, next) => {
	//===========================================
	// incoming: userId
	// outgoing: error
	//===========================================
	const { userId } = req.body;
	var error = "";
	try {
		const db = client.db("Users");
		var user = await db
			.collection("users")
			.findOneAndDelete({ _id: new ObjectId(userId) });
		if (!user) {
			error = "User not found";
			return res.status(409).json({ error: error });
		}
	} catch (e) {
		error = e.toString();
	}

	res.status(200).json({ error: error });
});

app.post("/api/changePassword", async (req, res, next) => {
	// ==========================================
	// incoming: email, newPassword
	// outgoing: error
	// ==========================================

	const { email, newPassword } = req.body;
	var error = "";

	try {
		const db = client.db("Users");
		var updatedUser = await db
			.collection("users")
			.findOneAndUpdate(
				{ Email: email },
				{ $set: { Password: newPassword } }
			);
		if (!updatedUser) {
			error = "User not found";
			return res.status(409).json({ error: error });
		}
	} catch (e) {
		error = e.toString();
	}

	res.status(200).json({ error: error });
});

app.post("/api/setCuisine", async (req, res, next) => {
	// ==========================================
	// incoming: userId, cuisine
	// outgoing: currCuisine, newLevel, error
	// ==========================================

	const { userId, cuisine } = req.body;
	var error = "";
	let updatedCuisine;
	let newLevel;
	let levels;
	try {
		const db = client.db("Users");
		const user = await db
			.collection("users")
			.findOne({ _id: new ObjectId(userId) });

		if (!user) {
			error = "user not found";
			return res.status(409).json({ error: error });
		}
		levels = user.Levels;
		newLevel = Math.max(levels[cuisine], 10);

		updatedCuisine = await db.collection("users").updateOne(
			{ _id: new ObjectId(userId) },
			{
				$set: {
					CurrCuisine: cuisine,
					["Levels." + cuisine]: newLevel,
				},
			}
		);

		if (updatedCuisine.matchedCount === 0) {
			error = "Update failed";
			return res.status(500).json({ error: error });
		}
	} catch (e) {
		error = e.toString();
	}

	var ret = {
		currCuisine: cuisine,
		newLevel: newLevel,
		error: error,
	};
	res.status(200).json(ret);
});

app.post("/api/setLevel", async (req, res, next) => {
	// ==========================================
	// incoming: userId, xp
	// outgoing: currCuisine, newLevel, error
	// ==========================================

	const { userId, xp } = req.body;
	var error = "";
	let updatedLevel;
	let newLevel;
	let currCuisine;
	let levels;
	var user;
	try {
		const db = client.db("Users");
		user = await db
			.collection("users")
			.findOne({ _id: new ObjectId(userId) });

		if (!user) {
			error = "user not found";
			return res.status(409).json({ error: error });
		}
		levels = user.Levels;
		currCuisine = user.CurrCuisine;
		newLevel =
			(levels[user.CurrCuisine] + xp) % 10 == 3
				? levels[user.CurrCuisine] + 8
				: levels[user.CurrCuisine] + xp;

		updatedLevel = await db.collection("users").updateOne(
			{ _id: new ObjectId(userId) },
			{
				$set: {
					["Levels." + user.CurrCuisine]: newLevel,
				},
			}
		);

		if (updatedLevel.matchedCount === 0) {
			error = "Update failed";
			return res.status(500).json({ error: error });
		}
		user = await db
			.collection("users")
			.findOne({ _id: new ObjectId(userId) });
	} catch (e) {
		error = e.toString();
	}

	var newUser = {
		_id: user._id,
		firstName: user.FirstName,
		lastName: user.LastName,
		email: user.Email,
		login: user.Login,
		password: user.Password,
		tokenKey: user.tokenKey,
		verified: user.Verified,
		currCuisine: user.CurrCuisine,
		levels: user.Levels,
	};

	var ret = {
		currCuisine: currCuisine,
		newLevel: newLevel,
		user: newUser,
		error: error,
	};
	res.status(200).json(ret);
});
app.post("/api/getRecipes", async (req, res, next) => {
	//===========================================
	// incoming: cuisine
	// outgoing: recipes, error
	//===========================================

	var error = "";
	var recipes = "";

	const { cuisine } = req.body;

	try {
		const db = client.db("Users");
		const results = await db
			.collection("Cuisines")
			.findOne({ Name: cuisine });

		// console.log("Results: ", results);
		if (!results) {
			error = "No Cuisine Found";
			return res.status(409).json({ error: error });
		}

		recipes = results.Recipes;
	} catch (e) {
		error = e.toString();
	}

	var ret = {
		recipes: recipes,
		error: error,
	};
	res.status(200).json(ret);
});

app.post("/api/searchRecipe", async (req, res, next) => {
	//===========================================
	// incoming: cuisine, search
	// outgoing: recipes, error
	//===========================================

	var error = "";
	var recipes = "";

	const { cuisine, search } = req.body;

	var _search = search.trim();

	try {
		const db = client.db("Users");
		const results = await db
			.collection("Cuisines")
			.findOne({ Name: cuisine });

		// console.log("Results: ", results);
		if (!results) {
			error = "No Cuisine Found";
			return res.status(409).json({ error: error });
		}

		recipes = results.Recipes;
	} catch (e) {
		error = e.toString();
	}

	var _ret = [];
	for (var i = 0; i < recipes.length; i++) {
		if (recipes[i].toLowerCase().indexOf(_search.toLowerCase()) != -1) {
			_ret.push(recipes[i]);
		}
	}

	var ret = {
		recipes: _ret,
		error: error,
	};
	res.status(200).json(ret);
});

app.post("/api/recipe", async (req, res, next) => {
	//===========================================
	// incoming: recipe
	// outgoing: ingredients, instructions, difficulty, error
	//===========================================

	var error = "";
	var ingredients = "";
	var instructions = "";
	var difficulty = -1;

	const { recipe } = req.body;

	try {
		const db = client.db("Users");
		const recipes = await db
			.collection("Recipes")
			.findOne({ Name: recipe });

		// console.log("Recipe: ", recipes);
		if (!recipes) {
			error = "No Recipe Found";
			return res.status(409).json({ error: error });
		}

		ingredients = recipes.Ingredients;
		instructions = recipes.Instructions;
		difficulty = recipes.Difficulty;
	} catch (e) {
		error = e.toString();
	}

	var ret = {
		ingredients: ingredients,
		instructions: instructions,
		difficulty: difficulty,
		error: error,
	};
	res.status(200).json(ret);
});

app.post("/api/getQuestions", async (req, res, next) => {
	//===========================================
	// incoming: recipe, level
	// outgoing: array of question objects, error
	//===========================================
	const { recipe, level } = req.body;
	var error = "";
	try {
		const db = client.db("Users");
		var questions = await db
			.collection("Questions")
			.find({ Level: level, Recipe: recipe })
			.toArray();
		if (questions.length == 0) {
			error = "Could not find questions";
			return res.status(409).json({ error: error });
		}
	} catch (e) {
		error = e.toString();
	}

	var ret = { questions: questions, error: error };
	res.status(200).json(ret);
});

app.post("/api/findUser", async (req, res, next) => {
	//===========================================
	// incoming: userId
	// outgoing: error
	//===========================================

	var error = "";

	const { userId } = req.body;

	const db = client.db("Users");

	const results = await db
		.collection("users")
		.find({ _id: new ObjectId(userId) })
		.toArray();

	var id = -1;
	var fn = "";
	var ln = "";
	var email = "";
	var code = -1;
	var verified = false;
	var currCuisine = null;
	var levels = "";

	if (results.length > 0) {
		id = results[0]._id;
		fn = results[0].FirstName;
		ln = results[0].LastName;
		email = results[0].Email;
		code = results[0].TokenKey;
		verified = results[0].Verified;
		currCuisine = results[0].CurrCuisine;
		levels = results[0].Levels;
	} else {
		error = "No Record Found";
	}

	var ret = {
		id: id,
		firstName: fn,
		lastName: ln,
		email: email,
		code: code,
		verified: verified,
		currCuisine: currCuisine,
		levels: levels,
		error: error,
	};
	res.status(200).json(ret);
});

app.post("/api/findEmail", async (req, res, next) => {
	//===========================================
	// incoming: email
	// outgoing: error
	//===========================================

	var error = "";

	const { email } = req.body;

	const db = client.db("Users");

	const emails = await db
		.collection("users")
		.find({ Email: email })
		.toArray();

	if (emails.length == 0) {
		error = "Email not found";
		return res.status(409).json({ error: error });
	}

	res.status(200).json({ error: error });
});

app.post("/api/email", async (req, res, next) => {
	//===========================================
	// incoming: emailTo, message, subject
	// outgoing: error
	//===========================================

	var error = "";
	const { emailTo, message, subject } = req.body;

	const OAuth2 = google.auth.OAuth2;

	const oauth2Client = new OAuth2(
		process.env.CLIENT_ID, // ClientID
		process.env.CLIENT_SECRET, // Client Secret
		process.env.REDIRECT_URIS
		// Redirect URL
	);

	oauth2Client.setCredentials({
		refresh_token: process.env.REFRESH,
	});

	const accessToken = oauth2Client.getAccessToken();

	const smtpTransport = nodemailer.createTransport({
		service: process.env.SERVICE,
		auth: {
			type: process.env.TYPE,
			user: process.env.USERBBB,
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			refreshToken: process.env.REFRESH,
			accessToken: accessToken,
		},
	});

	const mailOptions = {
		from: process.env.FROM,
		to: emailTo,
		subject: subject,
		generateTextFromHTML: true,
		html: `<div><p>${message}</p></div>`,
	};

	smtpTransport.sendMail(mailOptions, (error, response) => {
		let ret = error
			? { response: "", error: error.message }
			: { response: "Success", error: "" };
		res.status(200).json(ret);
		smtpTransport.close();
		//return error ? "error in email" : "";
	});
});

app.post("/api/verify", async (req, res, next) => {
	//===========================================
	// incoming: code
	// outgoing: error
	//===========================================
	// const { token } = req.params;
	const { code } = req.body;

	try {
		// Find the user in the database by the verification token
		const db = client.db("Users");
		var user = await db
			.collection("users")
			.findOneAndUpdate(
				{ TokenKey: code },
				{ $set: { Verified: true, TokenKey: null } }
			);

		if (user == null) {
			return res.status(404).json("Invalid Code");
		}

		res.status(200).json(
			"Email verification successful. You can now log in."
		);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.toString() });
	}
});

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("frontend/build"));
	app.get("*", (req, res) => {
		res.sendFile(
			path.resolve(__dirname, "frontend", "build", "index.html")
		);
	});
}

// PORTING
app.listen(PORT, () => {
	console.log("Server listening on port " + PORT);
});

app.post("/api/loadUser", async (req, res, next) => {
	// incoming userID
	// outgoing user information
	const db = client.db("Users");
	const users = database.collection("users");
	const user = await users.findOne({ _id: userId });
	const { userId } = req.body;

	try {
		if (user) {
			const {
				_id,
				FirstName: FirstName,
				LastName: LastName,
				Email: Email,
				Password: Password,
			} = user;
			res.status(200).json({ _id, FirstName, LastName, Email, Password });
		} else {
			res.status(404).json({ message: "User was not found" });
		}
	} catch (error) {
		console.log("Error:", error);
		res.status(500).json("Issue loading the user information.");
	}
});

app.post("/api/profile-settings", async (req, res) => {
	try {
		const user = await user.findById(req.query.userId);
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// API endpoint to update user data
app.post("/api/update-profile-settings", async (req, res) => {
	try {
		const { userId, ...updateData } = req.body;
		const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
			new: true,
		});
		res.json(updatedUser);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
