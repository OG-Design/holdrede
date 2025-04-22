// req / imports
const express = require('express');
const session = require('express-session');

// for password hashing / encryption-decryption
const bcrypt = require('bcrypt');

// database 
const Database = require('better-sqlite3');
const db = new Database('./database/database.db');


// app & express setup / open port
const app = express();
const PORT = 3000;

// middleware
app.use(express.static('public'));
app.use(express.json());

// add view engine for render??? ejs? 

// session
app.use(
    session({
            secret: "somethingIDK123123123",
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false } // http/s
    })
);

// login requirement
function requireLogin ( req , res , next ) {
    // if session expires redir to login page
    if ( ! req.session.user ) {
        return res.redirect('./login.html')
    }
    next();
};

// middleware END

// backend

// login system
app.post('/login', async ( req , res ) => {
    const wrong = 'Wrong mail or password';
    

    const rb = req.body;
    const email = rb;
    const password = rb;

    // select mail & password from db
    const login = db.prepare('SELECT email, password FROM user WHERE email = ?').get(email);

    // if any input wrong \/
    if ( ! user ) {
        return res.status(401).json({ message: wrong });
    };
    if ( ! passwordVerify ) {
        return res.status(401).json({ message: wrong });
    };

    req.session.user = { id: user.uid, firstname: user.firstname, username: user.username, email: user.email };

    res.json({message: 'success'});
});

// logout system
app.post('/logout', ( req , res ) => {
    req.session.destroy();

    res.redirect('/');
});