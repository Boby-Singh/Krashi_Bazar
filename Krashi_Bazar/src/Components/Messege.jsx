import React from 'react'
import { Link} from "react-router-dom";
import './Messege.css'
const Messege = () => {
   
    const handleClick=()=>{
        Navigate("/")
    }

    
  return (
    <div className='Container_Mess'>
        <div className='Cont_heading'>
            <h1>Messege will be Update as soon as.</h1>
            <Link to="/" className='go_back_btn'>go back</Link>
        </div>
        <hr />
    </div>
  )
}

export default Messege