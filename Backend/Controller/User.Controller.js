const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const stripe = require('stripe')('sk_test_51O5EZ3SEs1DUtTiCK9Ut940ABoObNjjCEu5sBraNYRvJ9aKLXrkRDr75sJfNKqXLaqWsb3Y1vlE6FDcdOYkBr6Xe005vx4OoyD')

const saltRounds = 10;
const path = require('path');
const { json } = require('body-parser');

const uploadsFolder = path.join(__dirname, "src/ImagesAg");


const register = async(req, res) => {
    try {
        if (!req.body.password) {
            return res.status(400).json({ error: 'Password is required' });
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const password = await bcrypt.hash(req.body.password.toString(), salt);
        const VALUES = [
            req.body.username,
            req.body.phone,
            req.body.email,
            password,
            req.body.address,
            req.body.role,
            salt // Save the salt in the database
        ];
        const sql = "INSERT INTO `users` (`username`, `phone`, `email`, `password`, `address`, `role`, `salt`) VALUES (?)";
        const [data] = await db.query(sql, [VALUES]);
        res.status(200).json({ status: true, msg: 'Registration has been successful', data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const Login = async(req, res) => {
    try {
        const sql = "SELECT *FROM `users` WHERE `email`=?";
        const [data] = await db.query(sql, [req.body.email]);
        if (data.length > 0) {
            const passwordMatch = await bcrypt.compare(req.body.password.toString(), data[0].password);
            if (!passwordMatch) {
                res.status(404).json({ status: false, msg: 'User password is incorrect' });
            } else {
                const username = data[0].username;
                const user_id = data[0].user_id;
                const token = jwt.sign({ username, user_id }, "jwt_secret_key", { expiresIn: "1d" });
                res.cookie('token', token);
                res.status(200).json({ status: true, msg: 'User logged in Successfully' });
            }
        } else {
            res.status(404).json({ status: false, msg: 'User not found' });
        }
    } catch (error) {
        console.error(err);
        res.status(500).json({ status: false, error: 'Internal Server Error' });
    }
};

const changepassword = async(req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const username = req.username;
        const [userData] = await db.query('SELECT * FROM `users` WHERE username = ?', [username]);
        if (userData.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const { password, salt } = userData[0];
        const passwordMatch = await bcrypt.compare(oldPassword, password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid old password' });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);
        const sql = 'UPDATE `users` SET `password` = ?  WHERE `username` = ?;';
        const [data] = await db.query(sql, [hashedNewPassword, username]);
        res.status(200).json({ status: true, msg: 'Password has been changed successfully', data });
    } catch (error) {
        console.error('Error during password change:', error);
        res.status(500).json({ status: false, error: 'Internal Server Error' });
    }
};

const uploadProducts = async(req, res) => {
    const { pimage } = req.files;
    const user_id = req.user_id;
    const { username, product_name, description, price, quantity_in_stock } = req.body;
    try {
        pimage.mv(path.join(uploadsFolder, pimage.name));
        const VALUES = [username, product_name, description, price, quantity_in_stock, pimage.name, user_id]
        const sql = "INSERT INTO `products` (`farmer_name`, `product_name`, `description`, `price`, `quantity_in_stock`, `pimage`, `user_id`) VALUES (?)";
        const [data] = await db.query(sql, [VALUES]);
        res.status(200).json({ status: true, msg: 'product uploaded successfully', data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error: 'Internal Server Error' });
    }
};

const GetProducts = async(req, res) => {
    try {
        const sql = "SELECT *FROM `products`";
        const [data] = await db.query(sql);
        const imagePath = data[0].pimage;
        res.sendFile(path.join(__dirname, imagePath));
        res.status(200).json({ status: true, msg: 'These are your Products', data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const AddToCart = async(req, res) => {
    try {
        const username = req.username;
        const { product_name, quantity_in_stock, price, pimage, product_id } = req.body;
        if (!username || !product_name || !quantity_in_stock || !price || !pimage || !product_id) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const VALUES = [username, product_name, quantity_in_stock, price, pimage, product_id];
        const sql = "INSERT INTO `mycart` (`username`, `product_name`, `quantity_in_stock`, `price`, `pimage`, `product_id`) VALUES (?)";
        const [data] = await db.query(sql, [VALUES]);
        res.status(200).json({ status: true, msg: 'Data inserted successfully', data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding to cart' });
    }
};


const myCart = async(req, res) => {
    try {
        const userName = req.username;
        const sql = "SELECT * FROM `mycart` WHERE `username`=?";
        const [data] = await db.query(sql, [userName]);

        if (data && data.length > 0) {
            const imagePath = data[0].pimage;
            res.sendFile(path.join(__dirname, imagePath));
            // Send the JSON response separately
            res.status(200).json({ status: true, msg: 'Data fetched successfully', data });
        } else {
            res.status(404).json({ error: 'No data found for the specified farmer_name' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateCart = async(req, res) => {
    try {
        const { cart_id } = req.params;
        const { quantity } = req.body;
        let updateValue = 0;
        if (quantity === 'inc') {
            updateValue = 1;
        } else if (quantity === 'dec') {
            updateValue = -1;
        }
        const sql = 'UPDATE `mycart` SET quantity_in_stock = quantity_in_stock + ? WHERE cart_Id = ?';
        const [data] = await db.query(sql, [updateValue, cart_id]);
        res.status(200).json({ status: true, msg: 'Data fetched successfully', data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteCartItem = async(req, res) => {
    try {
        const { cart_id } = req.params;
        const sql = 'DELETE FROM `mycart` WHERE cart_Id = ?';
        await db.query(sql, [cart_id]);
        res.status(200).json({ status: true, msg: 'Item deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const create_checkout_session = async(req, res) => {
    try {
        const { products, userId } = req.body;
        if (products.length === 0) {
            return res.status(400).json({ error: 'Products array is empty.' });
        }
        // Calculate the total amount of the purchase
        const totalAmount = products.reduce((acc, product) => {
            return acc + product.price * product.quantity_in_stock;
        }, 0); // Convert to cents
        // Calculate the total amount of the purchase
        const totalquantity = products.reduce((acc, product) => {
            return acc + product.quantity_in_stock;
        }, 0); // Convert to cents
        // Create line items for the Stripe session
        const lineItems = products.map((product) => ({
            price_data: {
                currency: 'INR',
                product_data: {
                    name: product.product_name,
                },
                unit_amount: product.price,
            },
            quantity: product.quantity_in_stock,
        }));
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel',
        });
        const sql = "INSERT INTO `orders` (`user_id`, `product_id`, `quantity`, `amount`, `session_id`) VALUES (?,?,?,?,?)";
        const values = [userId, products[0].product_id, totalquantity, totalAmount, session.id];
        const [data] = await db.query(sql, values);
        console.log('Payment record inserted:', data);
        res.json({ id: session.id, status: 'success', message: 'Payment completed successfully.' });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const orders = async(req, res) => {
    try {
        const user_id = req.user_id;
        const sql = "SELECT *FROM `orders` WHERE `user_id`=?";
        const [data] = await db.query(sql, [user_id]);
        if (data && data.length > 0) {
            res.status(200).json({ status: true, msg: 'Data fetched successfully', data });
        } else {
            res.status(404).json({ error: 'No data found for the specified farmer_name' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const profile = async(req, res) => {
    try {
        const userName = req.username;
        const sql = "SELECT *FROM `users` WHERE `username` = ?";
        const [data] = await db.query(sql, [userName]);
        res.status(200).json({ status: true, msg: 'data has selected successful', data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    register,
    uploadProducts,
    Login,
    GetProducts,
    AddToCart,
    myCart,
    updateCart,
    deleteCartItem,
    create_checkout_session,
    orders,
    profile,
    changepassword,
};