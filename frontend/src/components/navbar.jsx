import React from "react";
import bear from "../assets/bear.png";
import { NavLink, useNavigate, useLocation} from "react-router-dom";
import '../App.css';

const Navbar = () => {
	return (
		<div className="nav navbar bg-orange-50 border-gray-200 sticky top-0">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<a
					href="https://github.com/NikoKaramitos/BiteByByte"
					className="flex items-center space-x-3 rtl:space-x-reverse"
				>
					<img src={bear} className="h-14" alt="BiteByByteLogo" />
					<span className="self-center text-xl font-semibold whitespace-nowrap ">
						BiteByByte
					</span>
				</a>
				<div
					className="hidden w-full md:block md:w-auto"
					id="navbar-default"
				>
					<ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
						<li>
							<NavLink to="about">About</NavLink>
						</li>
						<li>
							<NavLink to="settings">Settings</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
