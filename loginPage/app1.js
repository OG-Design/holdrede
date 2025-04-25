// req / imports
const express = require('express');
const session = require('express-session');

// for password hashing / encryption-decryption
const bcrypt = require('bcrypt');

// database 
const Database = require('better-sqlite3');
const db = new Database('./database/user.db');


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

// login to user
app.post( '/login' , async ( req , res ) => {
    const wrong = 'Wrong mail or password';
    
    const {
        email , password 
    } = req.body;

    // select mail & password from db
    const user = db.prepare('SELECT * FROM user WHERE email = ?').get(email);

    const passwordVerify = await bcrypt.compare(password, user.password)
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
app.post( '/logout' , ( req , res ) => {
    req.session.destroy();

    res.redirect('/');
});


// register new user
app.post( '/register' , async ( req , res ) => {
    const {
        email,
        username,
        firstname,
        lastname,
        password,
    } = req.body;

    // password hashing
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash( password , saltRounds );
      
    // pass data
    try {
        
        const statement = db.prepare("INSERT INTO user (email, username, firstname, lastname, password) VALUES (?, ?, ?, ?, ?)")
        
        const info = statement.run(email , username , firstname , lastname , hashPassword );
    
    } catch ( error ) {
    
        console.error('Error inserting registration: ', error.message, 'if fail persists contact administrator.');
    
        return res.status(500).json({ message: 'a parameter such as email may allready be registered.'})
    
    };

    
});


// send user dashboard files
app.get( '/dashboard' , requireLogin , ( req , res ) => {

    res.sendFile( __dirname + '/private/dashboard.html');

});

app.get( '/userinfo' , requireLogin , ( req , res ) => {
    const uid = req.session.user.id;
    const username = req.session.user.username;
    
    // debug
    console.log('User logged in')
    console.log('userid( uid ): ' , uid);
    console.log('username: ' , username);

    const user = db.prepare('SELECT * FROM user WHERE uid = ? ').get(uid);
});




// note app START
app.get( '/notes', requireLogin , ( req , res ) => {
    res.sendFile(__dirname+"/private/noteApp/noteApp.html");
});




app.get( '/noteTitle', requireLogin , ( req , res ) => {
    try {
        const note = db.prepare('SELECT list.listID, list.title, listRole.uid FROM list INNER JOIN listRole ON list.listID = listRole.listID WHERE listRole.uid = ?').all(req.session.user.id);
        
        //debug
        console.log(note);
    
        if ( ! note) {
            return res.status(404).json({message: 'Titles not found'});
        } else {
            res.json(note)
        }
        
        req.session.list.listID = noteTitle.listID

    } catch (error) {
        console.error('error fetching data:', error.message)
        res.status(500).json({message: 'internal server error'});
    };

});

app.get( '/noteDisplayOwn', requireLogin , ( req , res ) => {
    
    try {
        
        const noteDisplay = db.prepare("SELECT list.listID, list.title, listRole.uid FROM list INNER JOIN listRole ON list.listID = listRole.listID WHERE listRole.uid = ?").get(req.session.user.id);
        console.log(noteDisplay)
        res.json(noteDisplay);
        

    } catch ( error ) {
        console.error('error fetching data: ', error.message);
        return res.status(500).json({message: 'internal server error'})
    }
    
});




// note app END





app.listen( PORT , () => {
    console.log(`server is running on: http://localhost:${PORT}`);
});