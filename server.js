const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

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

app.post("/api/addcard", async (req, res, next) => {
	// incoming: userId, color
	// outgoing: error

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
	// incoming: firstName, lastName, email, login, password
	// outgoing: error

	const { firstName, lastName, email, login, password } = req.body;

	const newUsers = {
		FirstName: firstName,
		LastName: lastName,
		Email: email,
		Login: login,
		Password: password,
	};

	var error = "";

	try {
		const db = client.db("Users");
		let duplicate = await db
			.collection("users")
			.find({ Login: login })
			.toArray();

		if (duplicate.length > 0) {
			return res.status(409).json("Username taken");
		} else {
			const result = await db.collection("users").insertOne(newUsers);
		}
	} catch (e) {
		error = e.toString();
	}

	var ret = { error: error };
	res.status(200).json(ret);
});

app.post("/api/login", async (req, res, next) => {
	// incoming: login, password
	// outgoing: id, firstName, lastName, error

	var error = "";

	const { login, password } = req.body;

	const db = client.db("Users");
	const results = await db
		.collection("users")
		.find({ Login: login, Password: password })
		.toArray();

	var id = -1;
	var fn = "";
	var ln = "";

	if (results.length > 0) {
		id = results[0]._id;
		fn = results[0].FirstName;
		ln = results[0].LastName;
	} else {
		error = "No Record Found";
	}

	var ret = { id: id, firstName: fn, lastName: ln, error: results };
	res.status(200).json(ret);
});

app.post("/api/searchcards", async (req, res, next) => {
	// incoming: userId, search
	// outgoing: results[], error

	var error = "";

	const { userId, search } = req.body;

	var _search = search.trim();

	const db = client.db("Users");
	const results = await db
		.collection("cuisine")
		.find({ Card: { $regex: _search + ".*", $options: "i" } })
		.toArray();

	var _ret = [];
	for (var i = 0; i < results.length; i++) {
		_ret.push(results[i].Card);
	}

	var ret = { results: _ret, error: error };
	res.status(200).json(ret);
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
