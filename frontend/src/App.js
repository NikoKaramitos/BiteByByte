import React from "react";
import "./App.css";
import Navbar from "./components/navbar";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import CardPage from "./pages/CardPage";

function App() {
	return (
		<BrowserRouter>
			<Navbar/>
			<Routes>
				<Route path="/" index element={<LoginPage />} />
				<Route path="/cards" index element={<CardPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
