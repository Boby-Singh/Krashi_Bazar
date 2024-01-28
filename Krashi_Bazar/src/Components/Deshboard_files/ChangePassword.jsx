// ChangePasswordForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ChangePassword.css';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState(null);
const navigate =useNavigate();
  const handleSubmit = async (e) => {
    axios.defaults.withCredentials= true;
    e.preventDefault();  
    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match');
      return;
    }  
    try {
      const response = await axios.post('http://localhost:3000/user/changepassword', {
        oldPassword,
        newPassword,
      });  
      if (response.data.status === true) {
        navigate('/Login');
      } else {
        setError('Failed to change password. Please try again.');
      }
    } catch (error) {
      console.error('Error during password change:', error);
      setError('Failed to change password. Please try again.');
    }
  };
  

  return (
    <div className="change-password-form">
        <form action='' onSubmit={handleSubmit}>
            <label htmlFor="">Old Password:</label>
            <input type="password" value={oldPassword}  onChange={(e) => setOldPassword(e.target.value)}  />
           
            <label htmlFor="">New Password:</label>
            <input type="password"  value={newPassword}  onChange={(e) => setNewPassword(e.target.value)} />
           
            <label htmlFor="">Confirm New Password:</label>
            <input type="password" value={confirmNewPassword}  onChange={(e) => setConfirmNewPassword(e.target.value)} />

            {error && <p className="error-message">{error}</p>}
             <div style={{display:"flex", justifyContent:"space-between"}}>
                <button type="submit">Submit</button>
                <button><Link to="/Deshboard" style={{color:"white"}}>Back</Link></button>
             </div>
        </form>
    </div>
  );
};

export default ChangePassword;
