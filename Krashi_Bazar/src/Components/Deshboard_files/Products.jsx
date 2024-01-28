import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
    const [product, setProduct] = useState([]); 
    const [search, setSearch] = useState('');
    axios.defaults.withCredentials= true;
    useEffect(() => {
        axios.get('http://localhost:3000/user/GetProducts')
            .then(res => {
                setProduct(res.data.data);
            })
            .catch(err => console.log(err));
    }, []);

    const AddToCart = async (Product) => {
        try {
            const { product_name, quantity_in_stock, price, pimage, product_id } = Product;
            const response = await axios.post('http://localhost:3000/user/AddToCart',
               { 
                product_name, 
                quantity_in_stock, 
                price, 
                pimage,
                product_id });
                if (response.status >= 200 && response.status < 300) {
                    toast.success('Item added to cart successfully!', {
                      position: 'top-right',
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  } else {
                    console.error('Failed to add item to cart. Server returned:', response);
                    toast.error('Failed to add item to cart. Please try again.', {
                      position: 'top-right',
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  }
                
        } catch (err) {
            console.log(err);
            toast.error('Error while adding item to cart. Please try again.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
    }

   
    

    return (
        <div>

          <div className='Cart_heading' style={{display:'flex', alignItems:'center', justifyContent:'space-between' ,backgroundColor:'#4caf50', height:'70px', top:'0', width:'100%', position:'fixed'}}>
            <div>
              <Link to="/Deshboard">
                <FaArrowLeftLong /> Go back to Profile
              </Link>
            </div>
            <div >
              <input style={{width:'100%', outline:'none', border:'none' ,backgroundColor:'white'}} type="search" name="search" placeholder='Search Items' onChange={(e)=>setSearch(e.target.value)} />
             </div>
            <div>
              <Link to="/Cart">
                <FaShoppingCart style={{ cursor: 'pointer' }} />
              </Link>
            </div>
          </div>
         
    <div className='table_Content' style={{marginTop:'80px'}}>
      <hr />
      <table id="customers">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Add To Cart</th>
          </tr>
        </thead>
        <tbody>           
            {product.length === 0 ? (
                <p>No Product. will update soon.....</p>
            ) : (
              Array.isArray(product) && product.filter((item)=>{
                return search.toLowerCase() === '' ? item : item.product_name.toLowerCase().includes(search)
              }).map((item, i)=>{
                return(
                  <tr key={i}>
                    <td>
                      <img src={`../src/ImagesAg/${item.pimage}`} alt={item.product_name} width={"250px"} />
                    </td>
                    <td>
                      <h3 style={{marginBottom:'0', fontSize:'25px', fontWeight:'500'}}>{item.product_name}</h3>
                      <p style={{ fontSize: '15px', color: 'black', marginTop:'0' }}>{item.description}</p>
                    </td>
                    <td>
                      {`Rs. ${item.price}`} 
                    </td>
                    <td>
                      <button className='button button-cart' onClick={() => AddToCart(item)}>
                        Add to Cart
                      </button>                    
                    </td>
                  </tr> 
                )})
            )}
        </tbody>
      </table>
      <hr />
    </div>
  </div>
);
      
}

export default Products;
