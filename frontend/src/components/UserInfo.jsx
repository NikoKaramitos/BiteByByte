import React, { useState, useEffect } from 'react';
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';
import bearpic1 from '../assets/bearpic1_enalrged_adjusted.png';
import minibear from '../assets/bear 2.png'
const app_name = "bitebybyte-9e423411050b";

function buildPath(route) {
  return process.env.NODE_ENV === "production"
    ? `https://${app_name}.herokuapp.com/${route}`
    : `http://localhost:5001/${route}`;
}

function UserInfo() {

  const [userData, setUserData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    Levels: '',
    Verified: '',
    CurrCuisine: ''
  });
  const [doEdit, setEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(userData.Password);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    setConfirmPassword(userData.Password); 
  }, []);

  const updateUserData = async(event) => {
    event.preventDefault();
    if (userData.Password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try{
      const response = await fetch(buildPath('/api/update-profile-settings'), {
        method: 'PUT', 
        body: JSON.stringify(userData),
        headers: {'Content-Type': 'application/json'}
    });

    if (!response.ok) {
        console.log("Error updating user info: ", response.statusText);
        return;
    }

    const info = await response.json();
    setEdit(false);
    console.log(info);
    } catch (error) {
      console.error("Error fetching user info: ", error);
    }
  }

  const editMode = () => {
    setEdit(!doEdit);
    if(!doEdit) {
      setConfirmPassword(userData.Password);
    }
  };

  const fetchUserData = async () => {
    try {
        const response = await fetch(buildPath('/api/profile-settings'), {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        
        if (!response.ok) {
            console.log("Can't access UserInfo API. ", response.statusText);
            return;
        }

        const data = await response.json();
        setUserData(data);
    } catch (error) {
        console.error("Error fetching user info: ", error);
    }
  };

  useEffect(() => {   
    fetchUserData();
  }, []);

  const changeSettings = (event) => {
    const {name, value} = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <img className="absolute top-0 left-0 w-full h-full object-cover" src={bearpic1} alt='Background' />
      <div class="flex w-full items-center justify-start h-screen pl-60">
        <div className="relative z-10 p-10 sm:p-20 bg-white rounded-2xl shadow-2xl max-w-3xl w-full">
          <img className="absolute top-0 left-1/2 transform -translate-x-1/2 max-w-md" src={minibear} alt='bear'></img>
          <h3 className="text-xl font-medium border-b-2 border-black mb-4">Profile Settings</h3>
          <form onSubmit={updateUserData}>
            {Object.keys(userData).map((key, index) => (
              <React.Fragment key={index}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-lg sm:text-xl font-bold mb-4 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    type={key !== 'Password' ? 'text' : (showPassword ? 'text' : 'password')}
                    name={key}
                    value={userData[key]}
                    onChange={changeSettings}
                    className={`shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline 
                                ${!doEdit || ['CurrCuisine', 'Verified', 'Levels'].includes(key) ? 'bg-gray-200 opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!doEdit || ['CurrCuisine', 'Verified', 'Levels'].includes(key)}
                  />
                    {doEdit && key === 'Password' && (
                    <button onClick={togglePasswordVisibility} type="button" className="ml-2 text-sm text-blue-500">
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  )}
                </div>
                {doEdit && (key === 'Password' || key === 'confirmPassword') && (
                  <div className="mb-4">
                    <label className="block text-gray-700 text-lg sm:text-xl font-bold mb-4 capitalize">
                      Confirm Password
                    </label>
                    <input
                     type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline"
                      required={!!userData.Password}
                    />
                    <button onClick={toggleConfirmPasswordVisibility} type="button" className="ml-2 text-sm text-blue-500">
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                )}
              </React.Fragment>
            ))}
            <button
              type="button"
              onClick={editMode}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 text-lg rounded-lg focus:outline-none focus:shadow-outline
              ${userData.Password !== confirmPassword ? 'bg-gray-200 opacity-40 cursor-not-allowed' : ''}`}
              disabled={userData.Password !== confirmPassword}>
              {doEdit ? 'Save Changes' : 'Edit'}
            </button>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default UserInfo;