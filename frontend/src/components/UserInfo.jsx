import React, {useState, useEffect} from 'react';
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';
import kitchenwares from '../assets/kitchenwares.jpg';
import bearpic1 from '../assets/bearpic1_enalrged_adjusted.png';
import e from 'express';

const findUser = () => {

}




const app_name = "bitebybyte-9e423411050b";
function buildPath(route) {
  if (process.env.NODE_ENV === "production") {
    return "https://" + app_name + ".herokuapp.com/" + route;
  } else {
    return "http://localhost:5001/" + route;
  }
}

function UserInfo() {
  var FirstName;
  var LastName;
  var Email;
  var Password;
  var Levels;
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

  const updateUserData = async(event) => {
    event.preventDefault();
    try{
      const response = await fetch(buildPath('/api/update-profile-settings'), {
        method: 'POST', // Or 'PUT', depending on your API and how you want to handle updates
        body: JSON.stringify(userData),
        headers: {'Content-Type': 'application/json'}
    });

    if (!response.ok) {
        console.log("Error updating user info: ", response.statusText);
        return;
    }

    const info = await response.json();

    } catch (error) {
      console.error("Error fetching user info: ", error);
    }
  }

  const editMode = () => {
    if(doEdit) {
      updateUserData();
    }
    setEdit(!doEdit);
  };

  const fetchUserData = async () => {
    try {
        const response = await fetch(buildPath('/api/profile-settings'), {
            method: 'POST',
            body: JSON.stringify(userData), 
            headers: {'Content-Type': 'application/json'}
        });
        
        if (!response.ok) {
            console.log("Can't access UserInfo API. ", response.statusText);
            return;
        }

        const data = await response.json();

        setUserData({
            FirstName: data.FirstName,
            LastName: data.LastName,
            Email: data.Email,
            Password: data.Password,
        });
        
    } catch (error) {
        console.error("Error fetching user info: ", error);
    }
  };

  useEffect(() => {   
    fetchUserData();
      
  }, []);
  return (
      <div>
          <div className="relative flex items-center h-screen">
            <img className="absolute top-0 left-0 w-full h-full object-cover" src={bearpic1} alt='BEARS' />
            <div className="flex flex-col h-screen">
              <div className="flex-1 flex items-center justify-start pl-40 z-10">
                <div className="z-10 p-10 bg-white rounded-xl shadow-xl max-h-sm max-w-sm  border-4 border-black space-x-2 space-y-10">
                  <div>
                    <h3 className="text-lg font-medium border-b-2 border-black">User Information</h3>
                  </div>
                  <div className="border-curve">
                    <input type="text" value ={FirstName} className="text-sm font-medium " 
                    disabled={!doEdit} onChange={(event) => ({
                      
                    })}></input>
                  </div>
                  <div>
                    <input type="text" value={LastName} className="text-sm font-medium "></input>
                  </div>
                  <div>
                    <input type="text" value={Password} className="text-sm font-medium "></input>
                  </div>
                  <div>
                  <input type="text" value={Email} className="text-sm font-medium "></input>
                  </div>
                  <button className="flex bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={editMode}>
                    {doEdit ? 'Save' : 'Edit'}
                  </button>
                </div>
              </div>
            </div>
            </div>
            <Footer/>
        </div>
      );
}

export default UserInfo;