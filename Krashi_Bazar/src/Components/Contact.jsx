import React from 'react'
import { Link } from 'react-router-dom';
import './Contact.css'
import { MdEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { GrInstagram } from "react-icons/gr";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
const Contact = () => {
  return (
    <div className='Container_Cont'>
      <div className='Cont_heading'>
            <h1>Contact Us</h1>
            <Link to="/" className='Con_go_back_btn'>Go back</Link>
      </div>
        <hr />
        <div style={{paddingLeft:'20px'}}>
        <p><CiLocationOn /> Address: vill. Budhara Porsa Morena Madhya Pradesh, 476115.</p>
        <p><FaPhoneVolume /> Contact Number: +91-7828908522.</p>
        <p><MdEmail /> Email: bobysinghsaini236@gmail.com</p>
        <p><b>Contact with us</b></p>
            <Link to="/"><GrInstagram /> </Link>
            <Link to="/"><FaLinkedin /> </Link>
            <Link to="/"><FaFacebook /> </Link>
        <hr />
        </div><br />
        <marquee behavior="alternate" direction="right">
            <h3>Copyright © 2024 Boby Singh. All Rights Reserved.</h3>
        </marquee>
        
    </div>
  )
}

export default Contact