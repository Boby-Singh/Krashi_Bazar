import React, { useState } from 'react'
import "./Login.css"
import { Link, useNavigate} from 'react-router-dom'
import Validation from './login_Validation';
import axios from 'axios';
import Deshboard from './Deshboard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [Values, setValues] = useState({
    email:'',
    password:'',
    role:''
  })  

  const navigate = useNavigate();

  axios.defaults.withCredentials= true;

  const [Errors, setErrors] = useState({})
  const handleInput=(e)=>{
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handlesubmit=async (e)=>{
    e.preventDefault();
    setErrors(Validation(Values));
    if(Errors.email==="" && Errors.password===""){
      await axios.post("http://localhost:3000/user/login",Values)
      .then(res =>{
        if(res.data.status=== true){
          toast.success('Login successful!', {
            position: 'top-right',
            autoClose: 3000, // Set the auto-close time in milliseconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/Deshboard");
        }
      })
      .catch(error => {
        toast.error('Login failed. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
    }
  }

  

  return (
    <div className="log_container">
      <div className="image-container">
        <img src="src/WhatsApp Image 2024-01-05 at 01.17.07_429b7da1.jpg"
        alt="tachnical" width="350px" />
      </div>
      <div className="form-container">
        
        <form action='' onSubmit={handlesubmit}>
          <label className="Head"><strong>Sign in</strong>  </label>

          <label htmlFor="email"><strong>Email:</strong></label>
          <input type="email" id="username" name="email" placeholder="Enter Email" onChange={handleInput}/>
          {Errors.email && <span className='Errors'>{Errors.email}</span>}

          <label htmlFor="password"><strong>Password:</strong></label>
          <input type="password"id="password" name="password" placeholder="Enter Password" onChange={handleInput}/>
          {Errors.password && <span className='Errors'>{Errors.password}</span>}          

          <label>
            Role:
            <input type="radio" value="farmer" name="role" onChange={handleInput} checked={Values.role === "farmer"} /> farmer
            <input type="radio" value="cunsumer" name="role" onChange={handleInput} checked={Values.role === "cunsumer"} /> cunsumer
            {Errors.role && <span className='Errors'>{Errors.role}</span>}
          </label>

          <button type="submit"><strong>Login</strong></button>
        </form>
        <p style={{color:'white'}}>If you are Not Register, click Register button and Register your self</p>
          <Link to="/Register">
            <button className="btn" type="submit"><strong>Register</strong></button>
          </Link>
      </div>
    </div>
  );
}

export default Login