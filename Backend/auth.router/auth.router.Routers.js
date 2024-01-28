const express = require('express'),
    router = express.Router();

const db = require('../db')
const {
    register,
    Login,
    changepassword,
    uploadProducts,
    GetProducts,
    AddToCart,
    profile,
    myCart,
    updateCart,
    deleteCartItem,
    create_checkout_session,
    orders,
} = require('../Controller/User.Controller');
const { verifyUser } = require('../middleware/verifyUser.middleware');

router.post('/register', async(req, res) => {
    try {
        await register(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async(req, res) => {
    try {
        await Login(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/changepassword', verifyUser, async(req, res) => {
    try {
        await changepassword(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ status: 'success' });
})


router.get('/profile', verifyUser, async(req, res) => {
    try {
        await profile(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/uploadProducts', verifyUser, async(req, res) => {
    try {
        await uploadProducts(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/GetProducts', async(req, res) => {
    try {
        await GetProducts(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/AddToCart', verifyUser, async(req, res) => {
    try {
        await AddToCart(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/myCart', verifyUser, async(req, res) => {
    try {
        await myCart(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/updateCart/:cart_id', async(req, res) => {
    try {
        await updateCart(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.delete('/deleteCartItem/:cart_id', async(req, res) => {
    try {
        await deleteCartItem(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/create_checkout_session', async(req, res) => {
    try {
        await create_checkout_session(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/orders', verifyUser, async(req, res) => {
    try {
        await orders(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


router.get('/auth', verifyUser, (req, res) => {
    res.json({
        status: 'success',
        message: 'Authenticated successfully',
        username: req.username,
        user_id: req.user_id
    });
});








module.exports = router;