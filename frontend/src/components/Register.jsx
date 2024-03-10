import React, { useState } from "react";
import Footer from "../pages/Footer";
//import aroundWorld from '../assets/around-world2.jpeg';
//import LoginPage from "../pages/LoginPage";


export default function Register()
{
	var firstName;
	var lastName;
    var email;
    var username;
    var password;

	const app_name = "bitebybyte-9e423411050b";
	function buildPath(route) {
		if (process.env.NODE_ENV === "production") {
			return "https://" + app_name + ".herokuapp.com/" + route;
		} else {
			return "http://localhost:5001/" + route;
		}
	}

	const [message, setMessage] = useState("");

	const doRegister = async (event) => {
		event.preventDefault();

		var obj = { firstName: firstName.value, lastName: lastName.value, email: email.value, username: username.value, password:password.value };
		var js = JSON.stringify(obj);

		try {
			const response = await fetch(buildPath('api/register'), {
				method: "POST",
				body: js,
				headers: { "Content-Type": "application/json" },
			});

			var res = JSON.parse(await response.text());

            if (res.error === "Username taken") {
				setMessage("Username is already taken.");
                return;
			}
            if (res.error === "That email has been used in another account") {
				setMessage("That email has been used in another account. \n Use Forgot Password");
                return;
			}
			
            else {
				var user = {
					firstName: res.firstName,
					lastName: res.lastName,
                    email: res.email,
                    username: res.username,
                    password: res.password,
					id: res.id
				};
				localStorage.setItem("user_data", JSON.stringify(user));

				setMessage("Registration succesful! Check your email for confirmation");
                
			//	window.location.href = "/login";
			}
		} catch (e) {
			alert(e.toString());
			return;
		}
	};

    function goLogin (event){
		event.preventDefault();
		window.location.href = "/login";
	};
    

    //This function is to check that empty inputs are not submitted
  /*  function validate(){
        

        const FirstName = document.getElementById('firstName').value
        const email = document.getElementById('email').value
        const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
        try {
            if(!regex.test(email)) {
                setMessage("Invalid email!")
              }
              else if(FirstName.length === 0)
              {
                  setMessage("Must enter a first name")
              }
            
        } catch (e) {
            alert(e.toString());
			return;
        }
    }*/
    //<img className="absolute w-full h-full object-cover mix-blend-overlay" src= {aroundWorld} alt=""/>
	return (
            <div className="relative w-full h-screen">

            <div className="flex justify-center items-center h-full">
                <form className="max-w-[400px] w-full rounded 2xl shadowl 2xl mx-auto bg-emerald-300 p-10 border border-black" >
                    <h2 className="text-2xl font-bold text-center py-6 ">BITEbyBYTE.</h2>

                    <div className="flex flex-col mb-4 text-sm">
                    <label>First Name</label>    
                        <input id="firstName" input="text" className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                         ref={(c) => (firstName = c)} placeholder=" " required />
                </div>


                <div className="flex flex-col mb-4 text-sm">
                    <label>Last Name</label>
                    <input id="lastName" className="relative 2text-md block px-3 py-2 rounded-lg w-full
                    bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none peer
                    invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                    type="text" required
                    ref={(c) => (lastName = c)} />
                    

                </div>

               
                <div className="flex flex-col mb-4 text-sm">
                    <label>Email</label>
                    <input id="email" type="email" name="email" className="peer relative 2text-md block px-3 py-2 rounded-lg w-full
                    bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none
                    invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                    placeholder="" required pattern="/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;"
                    ref={(c) => (email = c)} />
                
                </div>
                
                <div className="flex flex-col mb-4 text-sm">
                    <label>Username</label>
                    <input id="username" className="peer relative 2text-md block px-3 py-2 rounded-lg w-full
                        bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none
                        invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 "
                        required type="text" ref={(c) => (username = c)} />
                    <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        Enter a Username
                    </span>
                </div>


                <div className="flex flex-col text-sm">
                    <label>Password</label>
                    <input id="password" className="peer relative block px-3 py-2 mb-2 rounded-lg w-full
                        bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none
                        invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 "
                        type="password"  required pattern=".{7,}" ref={(c) => (password = c)}/>
                </div>


                    <a href="#_" className="relative flex flex-col items-center px-12 py-3 mt-2 overflow-hidden font-medium text-black border-2 border-orange-500 rounded-full hover:text-white group hover:bg-gray-50 text-sm">
                        <span className="absolute left-0 block w-full h-0 transition-all bg-orange-500 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                        <span className="absolute right-0 flex-col items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                        <span className="relative"onClick={doRegister}>Register</span>
                        
                    </a>
                    <span className="text-xs text-red-500" id="registerResult">{message}</span>
                    <p className="flex items-center mt-2 relative text-sm"><input className="mr-2 mt-3  mb-3" type="checkbox" /> Forgot Password? </p>
                    <span id="signinButton"className="relative text-sm w-full my-5 py-3 mt-4 text-black" onClick={goLogin} href="/login" >Already a member? Sign in now!</span>
            </form>
            </div>
            <Footer/>
            </div>
	);
}

