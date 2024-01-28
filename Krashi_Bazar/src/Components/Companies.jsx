import React from 'react'
import './Companies.css'
const Companies = () => {
  return (
    <>
    <div>
        <marquee  direction="left"> 
         <h3>Welcome all here.   This is Created by Boby Singh</h3>
        </marquee>
    </div>
    <div className='comp_block'>
        <div className='comp_block_cont'>
            <div className='scrolling-image'>
                <h1 style={{textAlign:"center",color:"black", textDecoration:"none",fontSize:"35px", margin:"0"}}>50+</h1>
                <p style={{fontSize:"18px", margin:"0", color:"black" }}>Registered Farmers</p>
            </div>
            <div className='scrolling-image'>
                <h1 style={{textAlign:"center",color:"black", textDecoration:"none",fontSize:"35px", margin:"0"}}>100+</h1>
                <p style={{fontSize:"18px", margin:"0", color:"black" }}>Registered Custumers</p>  
            </div>
            <div className='scrolling-image'>
                 <h1 style={{textAlign:"center",color:"black", textDecoration:"none",fontSize:"35px", margin:"0"}}>150+</h1>
                <p style={{fontSize:"18px", margin:"0", color:"black" }}>Well Know Developers</p>            
            </div>
            <div className='scrolling-image'>
                <h1 style={{textAlign:"center",color:"black", textDecoration:"none",fontSize:"35px", margin:"0"}}>10+</h1>
                <p style={{fontSize:"18px", margin:"0", color:"black" }}>States</p>            
            </div>
            <div className='scrolling-image'>
                <h1 style={{textAlign:"center",color:"black", textDecoration:"none",fontSize:"35px", margin:"0"}}>24/7</h1>
                <p style={{fontSize:"18px", margin:"0", color:"black" }}>Service</p> 
           </div>

        </div>
    </div>
    </>
  );
}

export default Companies