import React, { useState, useEffect } from 'react';
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';
import bearpic1 from '../assets/bearpic1_enalrged_adjusted.png';
import minibear from '../assets/minisettingsbear.png'
import peepoBear from '../assets/croppedPeepoBear.png'

const app_name = "bitebybyte-9e423411050b";

function buildPath(route) {
  return process.env.NODE_ENV === "production"
    ? `https://${app_name}.herokuapp.com/${route}`
    : `http://localhost:5001/${route}`;
}

function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function UserInfo() {

  const [userData, setUserData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    Levels: '',
    Verified: ''
  });
  const [doEdit, setEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(userData.Password);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [emailInput, setEmailInput] = useState(userData.Email);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

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
    
    const passwordValidationErrors = validatePassword(userData.Password);
    setPasswordErrors(passwordValidationErrors);

    if (confirmPasswordError && passwordValidationErrors.length > 0) {
      alert('Please correct the password errors before submitting:\n' + passwordValidationErrors.join('\n'));
      return;
    }


    if (userData.Password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (passwordErrors.length > 0) {
      alert('Please correct the password errors before submitting:\n' + passwordErrors.join('\n'));
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
    } else {
    setShowPassword(false);
    setShowConfirmPassword(false);
    }
  };
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push('Your password must be at least 8 characters.');
    if (!password.match(/[A-Z]/)) errors.push('Your password must contain at least one uppercase letter.');
    if (!password.match(/[a-z]/)) errors.push('Your password must contain at least one lowercase letter.');
    if (!password.match(/[0-9]/)) errors.push('Your password must contain at least one digit.');
    if (!password.match(/[!@#$%^&*()_+\-=\[\]{};:'"\\|,.<>\/?]/)) errors.push('Your password must contain at least one special character.');
    //if (!password.match(/[\!\@\#\$\%\^\&\*\(\)\_\+\-\=\[\]\{\}\;\:\'\"\\\|\,\<\.\>\/\?]/)) errors.push('Your password must contain at least one special character.');
    if (password.match(/(.)\1\1/)) errors.push('Your password must not contain sequences of three or more repeated characters.');
    if (password.length > 32) errors.push('Your password must not be longer than 32 characters.');
    return errors;
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
    if (name === 'Password') {
      const errors = validatePassword(value);
      setPasswordErrors(errors);
      setConfirmPasswordError(errors);

      if (userData.Password !== value) {
        setConfirmPasswordError('Passwords do not match.');
      } else {
        setConfirmPasswordError('');
      }
      if (confirmPassword !== value) {
        setConfirmPasswordError('Passwords do not match.');
      } else {
          setConfirmPasswordError('');
      }
    }

    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    if (emailInput === userData.Email) {
      setUserData(prevState => ({ ...prevState, Verified: 'yes' }));
    } else {
      setUserData(prevState => ({ ...prevState, Verified: 'no' }));
    }
  }, [emailInput]);

  const handleEmailChange = (event) => {
    setEmailInput(event.target.value);
  };




const handleConfirmPasswordChange = (event) => {
  const { value } = event.target;
  setConfirmPassword(value);
  if (userData.Password !== value) {
      setConfirmPasswordError('Passwords do not match.');
  } else {
      setConfirmPasswordError('');
  }
};

// Optionally, you can set the field as touched on blur:
const handleConfirmPasswordBlur = () => {
  setConfirmPasswordTouched(true);
};

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <img className="absolute top-0 left-0 w-full h-full object-cover" src={bearpic1} alt='Background' />
      <div class="flex w-full items-center justify-start h-screen pl-60">
        <img className="absolute max-w-sm top-46 left-10 object-cover" src={peepoBear} alt='bear'></img>
        <div className="relative z-10 p-10 sm:p-20 bg-white rounded-2xl shadow-2xl max-w-3xl w-full">
        <img className="absolute max-w-sm top-0 left-0 object-cover" src={minibear} alt='bear'></img>
          <h3 className="text-xl font-medium border-b-2 border-black mb-4">{capitalize(userData.FirstName)}'s Profile</h3>
          <form onSubmit={updateUserData}>
            {Object.keys(userData).map((key, index) => (
              <React.Fragment key={index}>
              {/*Adds each fields of the userData*/}
                <div className="mb-4">
                  <label className="block text-gray-700 text-lg sm:text-xl font-bold mb-4 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()} </label>
                  <input
                    type={key !== 'Password' ? 'text' : (showPassword ? 'text' : 'password')}
                    name={key}
                    value={key === 'Email' ? emailInput : userData[key]}
                    onChange={key === 'Email' ? handleEmailChange : changeSettings}
                    className={`shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline 
                                ${!doEdit || ['CurrCuisine', 'Verified', 'Levels'].includes(key) ? 'bg-gray-200 opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!doEdit || ['CurrCuisine', 'Verified', 'Levels'].includes(key)}
                  />
                    {/* Password change visibility toggle*/}
                    {doEdit && key === 'Password' && (
                    <>
                      <button onClick={togglePasswordVisibility} type="button" className="ml-2 text-sm text-blue-500">
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                      <div className = "text-red-500 text-sm mt-2">
                        {passwordErrors.map((error,idx) => <p key={idx}>{error}</p>)}
                      </div>
                    </>
                  )}
                </div>
                {/*User confirmation for password changes */}
                {doEdit && (key === 'Password' || key === 'confirmPassword') && (
                  <div className="mb-4">
                    <label className="block text-gray-700 text-lg sm:text-xl font-bold mb-4 capitalize">
                      Confirm Password
                    </label>  
                    <input
                     type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={e => {
                        setConfirmPassword(e.target.value)
                        handleConfirmPasswordChange(e);
                    }}
                      onBlur={handleConfirmPasswordBlur}
                      className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline"
                      required={!!userData.Password}
                    />
                    {/*Confirm password change visibility toggle*/}
                    <button onClick={toggleConfirmPasswordVisibility} type="button" className="ml-2 text-sm text-blue-500">
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </button>
                    {confirmPasswordTouched && confirmPasswordError && (
                        <div className="text-red-500 text-sm mt-2">{confirmPasswordError}</div>
                    )}
                  </div>
                )}
              </React.Fragment>
            ))}
            {/*edit button*/}
            <button
              type="button"
              onClick={editMode}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 text-lg rounded-lg focus:outline-none focus:shadow-outline
              ${userData.Password !== confirmPassword ? 'bg-gray-200 opacity-40 cursor-not-allowed' : ''}`}
              disabled={passwordErrors.length > 0 || userData.Password !== confirmPassword}>
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