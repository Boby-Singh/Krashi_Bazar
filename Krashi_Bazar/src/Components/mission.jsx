import React from 'react'
import './mission.css'
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
const mission = () => {
  return (
    <div className="Container_mission">
        <div className='Cont_heading'>
            <h1>Vision & Mission</h1>
            <Link to="/" className='mis_go_back_btn'>go back</Link>
        </div>
        <hr />
        <div>
            <h2>Vision</h2>
            <p><FaQuoteLeft /> A front-line institute in science and technology making significant contributions to human resource 
                development envisaging dynamic needs of the society.<FaQuoteRight /></p>
        </div>
        <div>
            <h2>Mission</h2>
            <p><FaQuoteLeft /> To generate experts in science and technology akin to society for its accelerated socioeconomic growth in 
                professional and challenging environment imparting human values.<FaQuoteRight /></p>
        </div>
    </div>
  );
}

export default mission