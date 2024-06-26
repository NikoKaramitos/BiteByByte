import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";

import VerifyPage from "./pages/VerifyPage";
import ForgotPassPage from "./pages/ForgotPassPage";
import CuisinePage from "./pages/CuisinePage";
import ResetPassPage from "./pages/ResetPassPage";
import Dash from "./pages/Dash";
import CookBook from "./pages/CookBookPage";
import UserInfo from "./components/UserInfo";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" index element={<LandingPage />} />
				<Route path="/login" index element={<LoginPage />} />
				<Route path="/register" index element={<RegisterPage />} />
				<Route path="/cuisines" index element={<CuisinePage />} />
				<Route path="/forgotPass" index element={<ForgotPassPage />} />
				<Route path="/resetPass" index element={<ResetPassPage />} />
				<Route path="/verify" index element={<VerifyPage />} />
				<Route path="/dash/:cuisine" element={<Dash />}/>
				<Route path="/cookbook" index element={<CookBook />} />
                <Route path="/profile-settings" index element={<UserInfo />} /> 
			</Routes>
		</BrowserRouter>
	);
}

export default App;
