import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CardPage from "./pages/CardPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import Dash from "./pages/Dash";
import { ThemeProvider } from "@material-tailwind/react";


function App() {
	return (
		<BrowserRouter>
				<Routes>
					<Route path="/" index element={<LandingPage/>} />
					<Route path="/login" index element={<LoginPage/>} />
					<Route path="/register" index element={<RegisterPage/>} />
					<Route path="/cards" index element={<CardPage/>} />
					<Route path="/dash" index element={<Dash/>} />
				</Routes>
			</BrowserRouter>
	);
}

export default App;
