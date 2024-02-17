require('dotenv').config({ path: './env' });
const express = require('express');
const cors = require('cors');
const cookiparse = require('cookie-parser');
const bodyParser = require('body-parser');
const expressFileUpload = require('express-fileupload');
require('express-async-errors');
const app = express();
app.use(bodyParser.json());
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(expressFileUpload());
app.use(cookiparse());

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
}));

const db = require('./db'),
    user = require('./auth.router/auth.router.Routers')
app.use('/user', user);

app.get('/home', (req, res)=>{
    res.json('Hello')
})


const PORT = process.env.PORT || 3000;
db.query('SELECT 1')
    .then(() => {
        console.log('db connection successded');
        app.listen(PORT, () => {
            console.log(`server is running at ${PORT}`);
        })
    })
    .catch(err => console.log({ Error: err }));
