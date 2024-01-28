import React from 'react'
import './About.css'
import { Link } from 'react-router-dom';
const about = () => {
  return (
    <div className='Container_about'>
        <div className='Cont_heading'>
            <h1>About Krashi Bazar</h1>
            <Link to="/" className='ab_go_back_btn'>Go back</Link>
        </div>
        <hr />
        <div>
            <img src="src/image/banner.jpg" alt="Wallpaper" width={"100%"}  height={"350px"}/>
        </div>
        <hr />
        <div className='content'>
        <span>
            <p>My Name is <b>Boby Singh</b> from Morena Madhya Pradesh. Currently I am Pursuing
                <b> B-TECH (Bachelor Of Technology) in Electrical Engineering</b> from 
                Shri Govindram Seksaria Institute of Technology and Science,
                Indore was established in 1952. SGSITS is recognized as a leading
                institute in the state of Madhya Pradesh and the western region consistently
                during its glorious journey of seventy years. It has been ranked in National
                Institutional Ranking Framework (NIRF) on national level (including IITs and NITs) by MHRD.              
                Further looking to its credentials, All India Council for Technical Education (AICTE)
                and University Grant Commission (UGC), New Delhi, has declared the institute as autonomous in 1989. 
                Under the autonomous state, the institute is affiliated to the Rajiv Gandhi Prodyogiki Vishwavidhyalaya (university of technology of M.P.) Bhopal.</p>
        </span>
        <span>
            <p> Presently, I am Looking for Job as Software Developer. My Skills are I am 
                Programmer as well as Web-developer skills:- HTML5, CSS, JavaScript, React Js, Node Js
                DataBase Menegment System (DBMS), Structured Query Language (SQL), DSA, C++ language,
                Ms Excel, Ms Word. </p>
        </span>
        <span>
            <p>Apart from that I am a person, who is very quiqe learner and I am always qurius 
                to learn new things and rigth now I am learning Mobile Software Developing.
                spacious class rooms and well equipped laboratories, the campus of the institute 
                encompasses four boys hostels, three girls hostel, one transit hostel and 44 faculty quarters. 
                Institute has central library which has vast collection of books, reference library and a large number 
                of subscribed online and print journals. In addition, institute also houses various amenities such 
                as Play ground, Gymnasium, Indoor Sports Complex, Guest House, a branch of Punjab National Bank, 
                a branch of Institution of Engineers, Xerox and general Stores, Canteen, Dinning Hall, Auditorium, Ladies Common Room, 
                Dispensary and office of SGSITS Alumni Association.</p>
        </span>
        </div>
        <div>
            <h3><b>Eng. Boby Singh</b></h3>
            <h3><b>Owner</b></h3>
        </div>
    </div>
  );
}

export default about