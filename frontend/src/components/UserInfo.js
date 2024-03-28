import React, {useState, useEffect} from 'react';

function UserInfo() {
    var firstName;
    var lastName;
    var email;
    var password;
    
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        const fetchUserData = async() => {
            try {
                const res = await fetch('');
                if(!res.ok) {
                    console.log("Can't access UserInfo API. ", res.error);
                }
                const data = await res.json();

                setUserData ({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: data.password
                })
            } catch (error) {
                console.error("Can't retrieve user info for UserInfo.js. ", error);
            }
        };

        fetchUserData();
    })

    return (
        <div>
            <h2>Profile</h2>
            <p>First Name: {userData.firstName}</p>
            <p>Last Name: {userData.lastName}</p>
            <p>Email: {userData.email}</p>
            <p>Password: {userData.password}</p>
        </div>
    )
}

export default UserInfo;