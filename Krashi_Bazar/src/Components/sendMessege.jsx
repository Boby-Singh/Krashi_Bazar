import React, { useState,useEffect } from 'react'
import './send_messege.css'
import { Link } from 'react-router-dom'; 
import { MdEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import axios from 'axios'
const sendMessege = () => {
  const [input, setInput] = useState({
    name:'',
    email:'',
    comment:'',
  })  

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

useEffect(() => {
  if (auth && profileData.length > 0) {
    setInput({
      name: profileData[0].username,
      email: profileData[0].email,
    });
  }
}, [auth, profileData]);

  const handleInput =(e)=>{
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  return (
    <div className="container">
      <div className="social_icons-container">
        <p className='social_icons'><FaPhoneVolume className='social_icons'/> Contact Number: +91-7828908522.</p>
        <p className='social_icons'><MdEmail className='social_icons' /> Email: bobysinghsaini236@gmail.com</p>
        <p className='social_icons'><b>Contact with us</b></p>
            <Link className='social_icons' to="/"><GrInstagram /> </Link>
            <Link className='social_icons' to="/"><FaLinkedin /> </Link>
            <Link className='social_icons' to="/"><FaFacebook /> </Link>
      </div>
      <div className="form-container">
        
        <form action="mailto:bobysinghsaini236@gmail.com" method="GET">

          <label htmlFor="name"><strong>Name:</strong></label>
          <input type="text" id="name" name="name" placeholder="Enter Name" value={input.name} onChange={handleInput}/>

          <label htmlFor="email"><strong>Username:</strong></label>
          <input type="email" name="email" placeholder="Enter Email" value={input.email} onChange={handleInput}/>
          

          <label htmlFor="password"><strong>Messege:</strong></label>
          <textarea rows="4" cols="50" name="comment" form="usrform" placeholder='Enter text here...' value={input.comment} onChange={handleInput}>
          </textarea><br />
                   

          <button type="submit"><strong>Send Messege</strong></button>
        </form>
      </div>
    </div>
  );
}

export default sendMessege