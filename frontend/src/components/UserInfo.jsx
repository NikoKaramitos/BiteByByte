import React, {useState, useEffect} from 'react';
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';

function UserInfo() {
    var firstName;
    var lastName;
    var email;
    var password;
    var level;
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        level: ''
    });

    const navigate = useNavigate;
    useEffect(() => {
        const fetchUserData = async() => {
            try {
                const res = await fetch('');
                if(!res.ok) {
                    console.log("Can't access UserInfo API. ", res.error);
                }
                const data = await res.json();

                setUserData ({
                    firstName: "Rick",
                    lastName: "Leinecker",
                    email: "RickL@COP.com",
                    password: "abc123",
                    level: "4"
                })
            } catch (error) {
                console.error("Can't retrieve user info for UserInfo.js. ", error);
            }
        };
    

        fetchUserData();
        
    })

    return (
        <div>
            <div className="flex justify-center items-center h-screen">
                <div className="relative bg-white p-10 rounded-xl shadow-lg max-w-sm w-full border-2 border-black rounded-full">
                    <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 ">User Information</h3>
                    </div>
                    <div className="border-curve">
                        <p className="text-sm font-medium text-gray-700 ">First Name: {firstName}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">Last Name: {lastName}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">Email: {email}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">Password: {password}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">Experience: {level}</p>
                    </div>
                    <button className="absolute bottom-2 right-0 mt-2 mr-2 bg-blue-500 text-white font-bold py-2 px-2 rounded">
                        Edit
                    </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
      );
}

export default UserInfo;