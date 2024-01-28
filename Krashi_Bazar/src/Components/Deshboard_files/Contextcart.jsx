import React, { useContext } from 'react'
import {Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { BiPlus , BiMinus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import {cartcontext} from './Cart';
import {loadStripe} from '@stripe/stripe-js';
import { jwtDecode } from "jwt-decode";
import './Cart.css'
import axios from 'axios'
const Contextcart = () => {  
  axios.defaults.withCredentials= true;
  const {Item, totalAmount, totalItems, incrementQuantity, decrementQuantity, deleteCartItem} = useContext(cartcontext);
  const handleIncrement = (cartId) => {
    incrementQuantity(cartId);
  };

  const handleDecrement = (cartId) => {
    decrementQuantity(cartId);
  };

  const handledelete =(cartId)=>{
    deleteCartItem(cartId);

  }


  //payment integration
  const MakePayment = async () => {
    try {
      
      const stripe = await loadStripe("pk_test_51O5EZ3SEs1DUtTiCA0QHZ3F7ypcgDv7S9oZ1sFzvRNXqKMppNvMnqAgLWp4y55VaPAe4F1AdPsFB8OiLQy4K8PkE00dP6VHa1s");
      // Get user ID from the cookie
      const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
      const userId = authToken ? jwtDecode(authToken).user_id : null;      
      
      const body = {
        userId: userId,
        products: Item
      };      
      const headers = {
        "Content-Type": "application/json",
      };      
      const response = await fetch('http://localhost:3000/user/create_checkout_session', {
        method:"post",
        withCredentials: true,
        headers: headers,
        body: JSON.stringify(body)
      });  
      if (!response.ok) {
        console.error('Failed to create checkout session:', response.statusText);
        return { error: 'Failed to create checkout session' };
      }  
      const session = await response.json();      
      const result = stripe.redirectToCheckout({
        sessionId: session.id
      });  
      if (result.error) {
        console.error('Error redirecting to checkout:', result.error);
        return { error: 'Error redirecting to checkout' };
      } else{
        const res = await axios.post('http://localhost:3000/user/purchase', {'payment_method': result.payment_method.id, 'userId':userId , 'products':Item});
        const {client_secret, status} = res.data;
        if(status === 'requires_action'){
          stripe.confirmCardPayment(client_secret).then((result)=>{
            if(result.error){
              console.log('there was an issue!');
              console.log(result.error);
            }else{
              console.log('You got the amount');
            }
          });
        }
      } 
      return { sessionId: session.id };
    } catch (error) {
      console.error('Error making payment:', error);
      return { error: 'An error occurred while processing payment.' };
    }
  };
  
  
  
  
  

  return (
    <div className='Cart_container'>
        
      <div className='Cart_heading'style={{backgroundColor:'#4caf50', height:'80px', top:'0', width:'100%', position:'fixed'}}>
        <h4 >
        <Link to="/Products">
            <FaArrowLeftLong /> Continue Shopping
        </Link>
        </h4>
        <h4 style={{marginRight:'15px', display:'flex', justifyContent:'space-around'}}><FaShoppingCart style={{cursor:'pointer'}} /><span style={{  borderRadius:'50%', padding:'5px'}}>{totalItems}</span></h4>
      </div>
      <hr style={{width:'90%'}} />
      <div style={{textAlign:'start', marginTop:'80px'}}>
        <p style={{color:'#454545', margin:'0', paddingLeft:'70px', fontSize:'22px', fontWeight:'650', paddingBottom:'0'}}>Shopping Cart</p>
        <p style={{color:'#454545', margin:'0', paddingLeft:'70px', fontSize:'15px', paddingTop:'0' }}>you have {totalItems} items in your Shopping Cart</p>
      </div>
      <div className='table_Content'>
      <table id="customers">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Remove</th>
          </tr>
        </thead>
      <tbody>           
            {Item.length === 0 ? (
                <span>Your cart is empty.</span>
            ) : (
            Item.map((item, i)=>{
                return(
                  <tr key={i}>
                    <td>
                      <img src={`../src/ImagesAg/${item.pimage}`} alt={item.product_name} width={"250px"} />
                    </td>
                    <td>
                      {item.product_name}
                    </td>
                    <td style={{alignItems:'center'}}>
                      <span className='styles_container'>
                        <BiMinus className='styles_icon'  onClick={() => handleDecrement(item.cart_id)} />
                        <span className='styles_count'>{item.quantity_in_stock}</span> 
                        <BiPlus className='styles_icon' onClick={() => handleIncrement(item.cart_id)}/>
                      </span>
                    </td>
                    <td>
                      {`Rs. ${item.price * item.quantity_in_stock}`} 
                    </td>
                    <td>
                      <MdDelete  style={{cursor:'pointer', color:'#ff0000', fontSize:'27px'}} onClick={()=> handledelete(item.cart_id)} />
                    </td>
                  </tr> 
                )})
            )}
    </tbody>
  </table>
  </div>
        <hr />
        <div className='Total_amt'>
            <h4 style={{fontSize:'20px', color:'white'}}>{`Total Amount: Rs. ${totalAmount} `}</h4>
            <div className='btns' >
               <button className='Check_btn' onClick={()=>{MakePayment()}}>PLACE ORDER</button>            
          </div>
        </div>
    </div>
  );
}

export default Contextcart