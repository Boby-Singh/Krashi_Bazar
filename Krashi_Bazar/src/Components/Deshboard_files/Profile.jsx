import React, { createContext, useEffect,  useState } from 'react';
import axios from 'axios';
import ContextProfile from './ContextProfile';
export const createProfileContext = createContext({
  auth: false,
  profileData: {},
});
const Profile = () => {
  const [auth, setAuth] = useState(false);  
  axios.defaults.withCredentials= true;
  const [profileData, setProfileData] = useState([]);

  useEffect(()=>{
       axios.get("http://localhost:3000/user/auth")
      .then(res =>{
        if(res.data.status === 'success'){
          setAuth(true);
        }
        else{
          setAuth(false);
        }
      })
      .catch(err => {
        console.log('Error during registration:', err);
      })
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/profile');
        if (response.data.status === true) {
          setProfileData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
     <createProfileContext.Provider value={{auth, profileData}}>
       <ContextProfile/>
     </createProfileContext.Provider>
  );
  
}

export default Profile