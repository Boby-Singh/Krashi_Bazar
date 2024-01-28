import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './UpLoadProduct.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpLoadProduct = () => {
    const [formData, setFormData] = useState({
        username: '',
        product_name: '',
        description: '',
        price: '',
        quantity_in_stock: '',
        pimage: null,
      });

    
    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
      setFormData({
          ...formData,
          pimage: e.target.files[0],
      });
  };
  
    
    const navigate = useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
        formDataToSend.append(key, formData[key]);
        }
        
        axios.post("http://localhost:3000/user/uploadProducts",formDataToSend,)
        .then(res => {
            if(res.data.status === true){
              navigate("/Products");
            }
        })
        .catch(err => {console.log("Axious error",err)});
    }
  return (
    <div className=' Container'>
        <form action="" onSubmit={handleSubmit} className='Container_Content' encType="multipart/form-data">
            <label htmlFor="username">Username</label>
            <input type="text" name='username' placeholder='username' onChange={handleChange} />

            <label htmlFor="product_name">Product</label>
            <input type="text" name='product_name' placeholder='product name' onChange={handleChange} />

            <label htmlFor="category">description</label>
            <input type="text" name='description' placeholder='description' onChange={handleChange} />

            <label htmlFor="price">price</label>
            <input type="text" name='price' placeholder='price' onChange={handleChange} />

            <label htmlFor="quantity_in_stock">quantity</label>
            <input type="number" name='quantity_in_stock' placeholder='quantity_in_stock' onChange={handleChange} />

            <label htmlFor='pimage'>Image</label>
            <input type='file' name='pimage'  onChange={handleImageChange} />
            
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <button type="submit">Submit</button>
                <button><Link to="/Deshboard" style={{color:"white"}}>Back</Link></button>
             </div>
            
        </form>

    </div>
  )
}

export default UpLoadProduct