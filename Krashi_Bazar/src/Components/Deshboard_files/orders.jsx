import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
    axios.defaults.withCredentials = true;
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/user/orders', {
            withCredentials: true,
        })
        .then(res => {
            if (res.data.status === true) {
                setData(res.data.data);
            }
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <div style={{backgroundColor:'green'}}>
            {
                Array.isArray(data) && data.map((item, i) => (
                    <div key={i}>
                        <hr />
                        <ul>
                            <li>Your session_id: {item.session_id}</li>
                            <li>your product_id: {item.product_id}</li>
                            <li> Amount: {item.amount}</li>
                            <li>Quantity: {item.quantity}</li>
                            <li> Order Date: {item.order_date}</li>
                            <li> Product Status: {item.status}</li>
                        </ul>
                        <hr />
                    </div>
                ))
            }
        </div>
    );
};

export default Orders;
