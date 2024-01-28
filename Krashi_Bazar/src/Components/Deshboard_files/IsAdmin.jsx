import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './IsAdmin.css'
const IsAdmin = () => {
    const [records, setRecords] = useState([]);
    useEffect(()=>{
     axios.get('http://localhost:3000/data')
     .then(res => {
        setRecords(res.data);
     })
     .catch(err => console.log(err));
    },[]);
  return (
    <div className='container'>
       <table>
          <thead>
            <tr>
                <th style={{fontSize:"22px"}}>Name</th>
                <th style={{fontSize:"22px"}}>Phone Number</th>
                <th style={{fontSize:"22px"}}>Email</th>
                <th style={{fontSize:"22px"}}>Password</th>
                <th style={{fontSize:"22px"}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((d,i)=>{
                return <tr key={i}>
                    <td>{d.name}</td>
                    <td>{d.phone}</td>
                    <td>{d.email}</td>
                    <td>{d.password}</td>
                    <td><button style={{backgroundColor:"brown"}}>Delete</button></td>
                </tr>
            })}
          </tbody>
       </table>
    </div>
  )
}

export default IsAdmin