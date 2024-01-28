// GridContainer.js
import React, { useEffect, useState } from 'react';
import './Deshboard.css';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import Login from './Login';
import axios from 'axios';
import Profile from './Deshboard_files/Profile';

const Deshboard = () => {
  const [auth, setAuth] = useState(false);
  axios.defaults.withCredentials= true;
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
  
  const navigate = useNavigate();
  const handleLogout = ()=>{
    axios.get('http://localhost:3000/user/logout')
    .then(res =>{
      location.reload(true);
      navigate('/');
    }).catch(err => console.log(err));
  };

  const handleLinkClick = (path) => {
    navigate(path);
  };

  

  return (
    <div>
    {auth ? (
      <>
      <div className="grid-container">
        <div className="grid-item">
          <span><Link to="/" style={{color:'white', fontSize:'15px'}}><FaArrowLeftLong />  Go back</Link></span>
          <ul>
            <li className='List-item'></li>
            <li className='List-item' style={{ fontSize: "25px" }}><h4>Dashboard</h4></li>
            <li className='List-item'><Link to="#" ><CgProfile /> Profile</Link></li>
            <li className='List-item'><Link to="/ChangePassword" >Change Password</Link></li>
            <li className='List-item'><Link to="/Cart" > Your Product</Link></li>
            <li className='List-item'><Link to="/UpLoadProduct" > UpLoad Product</Link></li>
            <li className='List-item'><Link to="/orders" > Orders</Link></li>
            <li className='List-item'><Link to="/" onClick={handleLogout}><IoMdLogOut /> Logout</Link></li>
          </ul>
        </div>
        <div className="grid-item">
          <Routes>
            <Route path="/" element={ProfileContent()} />
            <Route path="/" element={UpdateContent()} />
            <Route path="/" element={SettingContent()} />
            <Route path="/" element={ReviewsContent()} />
          </Routes>
        </div>
      </div>
    </>
    ) : (
      <div>
        <Login/>
      </div>
    )}
  </div>
  );
};
const ProfileContent = () => <Profile/>;
const UpdateContent = () => <div>Update Content</div>;
const SettingContent = () => <div>Setting Content</div>;
const ReviewsContent = () => <div>Reviews Content</div>;

export default Deshboard;

