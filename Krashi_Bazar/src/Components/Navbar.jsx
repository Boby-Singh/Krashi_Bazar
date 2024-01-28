import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
import Home from './Home'
import Companies from './Companies'
import SendMessege from './sendMessege'
import Footer from './Footer'
import { FaShoppingCart } from "react-icons/fa";
import axios from 'axios'
const Navbar = () => {
   
  const [navbar, setNavbar] = useState(false);
 
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState('');
  axios.defaults.withCredentials= true;

  useEffect(()=>{
       axios.get("http://localhost:3000/user/auth")
      .then(res =>{
        if(res.data.status === 'success'){
          setAuth(true);
          setUser(res.data.username);
        }
        else{
          setAuth(false);
        }
      })
  }, []);
  
  const changebackground =()=>{
    if(window.scrollY >= 161){
      setNavbar(true);
    }else{
      setNavbar(false);
    }
  };

  window.addEventListener('scroll',changebackground);

  return (
    <>
    <div className="navbar_Head">
      <ul className="navbar_list_Head">
        <li className="link">
          <Link to="/">
            <img src="src/2604054c362fb96a331f0d52f7959c18.jpg" alt="Logo"  width="120px" />
          </Link>
        </li>
        <li>
            <div className="Heading">
              <h1 className='Heading_h1'> Department of Krashi Bazar Pvt. Ltd.</h1>
              <p className='Heading_p1'> Estd. In 2024 | Using React technology & Node Js</p>
            </div>
        </li>
      </ul> 
    </div>  
    {auth ?(
    <nav className={navbar ? 'navbar active' : 'navbar'}>  
      <ul className="navbar_list"> 
        <li className="link about">
          <Link to="/about">about</Link>
        </li>
        <li className="link ">
          <Link to="/Products">Products</Link>
        </li>
        <li className="link">
          <Link to="/Contact">Contact us</Link>
        </li>
        <li className="link ">
          <Link to="/Cart"><FaShoppingCart /> Cart</Link>
        </li>
        <li className="link">
          <Link to="/Deshboard">Dashboard: {user}</Link>
        </li>
      </ul>
    </nav>):(
      <nav className={navbar ? 'navbar active' : 'navbar'}>  
      <ul className="navbar_list"> 
        <li className="link about">
          <Link to="/about">about</Link>
        </li>
        <li className="link ">
          <Link to="/Products">Products</Link>
        </li>
        <li className="link">
          <Link to="/Contact">Contact us</Link>
        </li>
        <li className="link">
          <Link to="/Register">Sign up</Link>
        </li>
        <li className="link">
          <Link to="/Login">sign in</Link>
        </li>
      </ul>
    </nav>
)}
    <hr />
    <Home/>
    <Companies/>
    <SendMessege/>
    <Footer/>
  </>  
  );
}

export default Navbar