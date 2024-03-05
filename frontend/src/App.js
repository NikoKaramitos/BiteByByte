import React from "react";
import "./App.css";
import Navbar from "./components/navbar";

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
	return (
		<BrowserRouter>
			<Navbar/>
		</BrowserRouter>
	);
}

export default App;
