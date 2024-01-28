// GridContainer.js
import React, { useEffect, useState } from 'react';
import './Deshboard.css'; // Import your CSS file for styling
import axios from 'axios';
import './registered_data.css'
import { Link } from 'react-router-dom';
const Registered_Data = () => {
  const [records, setRecords] = useState([])
  
  useEffect(()=>{
     axios.get('http://localhost:3000/data')
     .then(res=>{
        setRecords(res.data)
     })
     .catch(err=>console.log(err));
  },[])
  return (
    <>   
        <div className="grid-item">
          <table>
            <thead>
              <tr>
                <th><h3>Name</h3></th>
                <th><h3>Phone</h3></th>
                <th><h3>Email</h3></th>
                <th><h3>profession</h3></th>
                <th><h3>Action</h3></th>
              </tr>
            </thead>
            <tbody>
                {records.map((d,i)=>{
                    return  <tr key={i}>
                    <td>{d.name}</td>
                    <td>{d.phone}</td>
                    <td>{d.email}</td>
                    <td>{d.profession}</td>
                    <td>
                        <Link style={{ color:"green", backgroundColor:"rgb(6, 255, 22)"}}>Add</Link>:
                        <Link style={{ color:"green", backgroundColor:"rgb(6, 255, 22)"}}>Delete</Link>
                    </td>
                  </tr>
                })}
            </tbody>
          </table>
        </div>
    </>
  );
};

export default Registered_Data;
