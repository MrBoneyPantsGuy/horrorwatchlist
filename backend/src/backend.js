/*
    This file acts as the entrypoint for node.js backend
 */

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const multer = require('multer');
const crypto = require("crypto");
const upload = multer();
const storage = require('./services/storage');
const config = require('../../data/config.json');
const auth = require('../../data/auth.json');
const app = express();
app.use(express.json()); //adds support for json encoded bodies
app.use(express.urlencoded({extended: true})); //adds support url encoded bodies
app.use(upload.array()); //adds support multipart/form-data bodies
app.use(session({
    secret: crypto.randomBytes(32).toString('hex'),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    }
}));
app.use(cors({origin: 'http://localhost:63342', credentials: true}));
const apiRouter = require('./routes/api-routes');

app.use('/api', apiRouter);
app.set('movieList', storage.loadConfig(config));
app.set('auth', storage.loadAuth(auth));

app.listen(8080, () => { //start webserver
    console.log('Webserver started.');
});