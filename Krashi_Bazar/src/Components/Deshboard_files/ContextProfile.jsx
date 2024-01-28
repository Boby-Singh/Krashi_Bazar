import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import './Profile.css'
import {createProfileContext} from './Profile'
const ContextProfile = () => {

    const {auth, profileData} =  useContext(createProfileContext);
    
  return (
    <div className='Pro_container'>
    {auth ? (
      profileData.map((url, i) => (
        <div key={i} className="user-profile-container">
          <div className="profile-info">
            <div className="profile-picture">
              <img src="/src/Images/profileImages/profile0.png" alt="profile" />
              <h5 style={{ fontSize: "22px", color: "white" }}>{url.username}</h5>
            </div>
            <div>
              <div style={{ display: "flex", gap: "10rem", fontSize: "22px", marginTop: "20px", color: "white" }}>
                <h5>User Name: {url.username}</h5>
                <h5>Email ID: {url.email} </h5>
              </div>
              <div style={{ display: "flex", gap: "10rem", fontSize: "22px", color: "white" }}>
                <h5>User phone: {url.phone} </h5>
                <h5>User Profession: {url.role} </h5>
              </div>
            </div>
            <div style={{ display: "flex", gap: "10rem", fontSize: "22px", color: "white" }}>
              <h5>User Address: {url.address} </h5>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div>
        <h3>Login Now</h3>
        <Link to="/Login"> Login </Link>
      </div>
    )}
   
  </div>
  )
}

export default ContextProfile