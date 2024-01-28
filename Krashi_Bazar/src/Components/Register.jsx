import React, { useState } from 'react'
import "./Register.css"
import { Link, useNavigate } from 'react-router-dom'
import Reg_Validation from './Register_validation'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
  const [Values, setValues] = useState({
    username:'',
    phone:'',
    email:'',
    password:'',
    address:'',
    role:'',
  });
  
  const navigate = useNavigate();
  const [Errors, setErrors] = useState({});

  const handleInput = (e)=>{
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async(e)=>{
     e.preventDefault();
     setErrors(Reg_Validation(Values));
     if(Errors.name === "" && Errors.phone === "" &&  Errors.email === "" && Errors.password === "" && Errors.role===""){
       await axios.post("http://localhost:3000/user/register",Values)
      .then(res =>{
        if(res.data.status === true){
            toast.success('Registration successful!', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          navigate("/Login");
        }
      })
      .catch(err => {
        console.log('Error during registration:', err);
      })
     } 
   }

  return (
    <>
    <div className="Reg_container">
      <div className="image-container">
        <img src="src/WhatsApp Image 2024-01-05 at 01.17.07_429b7da1.jpg"
        alt="tachnical" width="350px" />
      </div>
      <div className="form-container">
        
        <form action='' onSubmit={handleSubmit}>
          <label className="Head"> Sign up  </label>

          <label htmlFor="name">Full Name:</label>
          <input type="text" name='username' placeholder="Enter Full Name" onChange={handleInput} />
          {Errors.name && <span className='Errors'>{Errors.name}</span>}

          <label htmlFor="phone">Phone:</label>
          <input type="number" name='phone' placeholder="Enter Phone" onChange={handleInput} />
          {Errors.phone && <span className='Errors'>{Errors.phone}</span>}

          <label htmlFor="email">Email:</label>
          <input type="email" id="username" name="email" placeholder="Enter Email" onChange={handleInput}/>
          {Errors.email && <span className='Errors'>{Errors.email}</span>}
          
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" placeholder="Enter address" onChange={handleInput}/>
          {Errors.address && <span className='Errors'>{Errors.address}</span>}

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" placeholder="Enter Password" onChange={handleInput}/>
          {Errors.password && <span className='Errors'>{Errors.password}</span>}
          
          <label >
            Role:
            <input type="radio" value="farmer" name="role" onChange={handleInput} checked={Values.role === "farmer"} /> farmer
            <input type="radio" value="cunsumer" name="role" onChange={handleInput} checked={Values.role === "cunsumer"} /> cunsumer
            {Errors.role && <span className='Errors'>{Errors.role}</span>}
          </label>

          <button type="submit"><strong>Register</strong></button>
        
        </form>
        <p style={{color:'white'}}>If you are Register, click Login button</p>
          <Link to="/Login">
            <button className="btn" type="submit"><strong>Login</strong></button>
          </Link>
      </div>
    </div>
    </>
  );
}

export default Register