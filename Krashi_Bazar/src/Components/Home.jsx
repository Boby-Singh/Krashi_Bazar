import React, { useEffect, useState } from 'react'
import './Home.css'
import { SlArrowLeft } from "react-icons/sl";
import { SlControlPause } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { image } from './image';

const Home = () => {
   const [Activeindex, setActiveindex] = useState(0)
   const HandalprevClick =()=>{
    setActiveindex(!Activeindex ? image.length-1 :Activeindex-1);
   };

   const HandalnextClick=()=>{
    setActiveindex((Activeindex+1) % image.length);
   };

   useEffect(()=>{
      const timer = setTimeout(()=>{
        HandalnextClick();
      },5000);

      return ()=>{
        clearTimeout(timer);
      };
   },[Activeindex]);

   
  return (
    <>
    <div className="title">
      <SlArrowLeft className='Prev' onClick={HandalprevClick} style={{cursor:'pointer'}} />

      {image.map((url,i)=>
       Activeindex===i && <img key={i} src={url} 
        alt="Wallpaper" className='Slide_image' />
      )}    
            
      <SlArrowRight className='Next' onClick={HandalnextClick} style={{cursor:'pointer'}} />
    </div>
    <hr />
    </>
  );
}

export default Home