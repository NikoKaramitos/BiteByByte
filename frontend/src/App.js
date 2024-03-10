import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Title from "./pages/Title";
import Body from "./pages/Body";
import Footer from "./pages/Footer"


function App() {
	return (
		<div>
			<Navbar/>
			<Title/>
			<Body/>
			<Footer/>
		</div>
	);
}

export default App;
