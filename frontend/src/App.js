import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CardPage from "./pages/CardPage";
import RegisterPage from "./pages/RegisterPage";



function App() {
	return (
		<BrowserRouter>
				<Routes>
					<Route path="/" index element={<LoginPage />} />
					<Route path="/register" index element={<RegisterPage/>} />
					<Route path="/cards" index element={<CardPage />} />
				</Routes>
			</BrowserRouter>
	);
}

export default App;
