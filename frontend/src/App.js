import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Title from "./pages/Title";
import Body from "./pages/Body";


function App() {
	return (
		<div>
			<Navbar/>
			<Title/>
			<Body/>
		</div>
	);
}

export default App;
