const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path"); // test
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
app.use(express.static(path.join(__dirname, "frontend/build")));
app.use(cors());
app.use(bodyParser.json());

// Use an environment variable for the MongoDB URI
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

// Connect to MongoDB outside of the request/response cycle
client
	.connect()
	.then(() => console.log("Successfully connected to MongoDB"))
	.catch((err) => console.error("Failed to connect to MongoDB", err));

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

app.get("/", (req, res) => {
	res.send("Hello World!");
});

const PORT = process.env.PORT || 5001;
app
	.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	})
	.on("error", (err) => {
		console.error("Express failed to start");
		console.error(err);
	});

app.post("/api/register", async (req, res, next) => {
	// incoming: firstName, lastName, email, username, password
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
	}

	var ret = { id: id, firstName: fn, lastName: ln, error: "" };
	res.status(200).json(ret);
});
