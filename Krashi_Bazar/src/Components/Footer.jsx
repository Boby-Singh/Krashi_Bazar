import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <>
    <div className='Footer_block'>
        <div className='Footer_block_cont'>
            <h3 className='F_title'>Explore Krashi_Bazar</h3>
            <hr />
            <ul>
                <li className='link'>Privacy Policy and Terms of Service:<Link style={{fontSize:'0.8rem'}}>term & condition</Link></li>
                <li className='link'>FAQ or Help Center Link:<Link to='/Contact' style={{fontSize:'0.8rem'}}>contact</Link></li>
                <li className='link'>Copyright © 2024 Boby Singh. All Rights Reserved.</li>
            </ul>            
        </div>
        <div className='Footer_block_cont'>
            <h3 className='F_title'>Explore Krashi_Bazar</h3>
            <hr />
            <ul>
                 <li className='link'>Address: Porsa Morena Madhya Pradesh</li>
                <li className='link'>Latest News or Blog Feed</li>
                <li className='link'>Social Media: 
                <Link style={{fontSize:'0.8rem'}}>Facebook</Link>
                <Link style={{fontSize:'0.8rem'}}>linkden</Link>
                </li>
            </ul>            
        </div>
    </div>
    </>
  );
}

export default Footer