// middleware/verifyUser.js

const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }
        jwt.verify(token, "jwt_secret_key", (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized: Invalid token' });
            }
            req.username = decoded.username;
            req.user_id = decoded.user_id;
            next();
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error: 'Internal Server Error' });
        next(error);
    }
};

module.exports = { verifyUser };