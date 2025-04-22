// user system
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const Database = require('better-sqlite3');
const db = new Database('./database/user.db');



// app setup
const app = express();
const PORT = 3000;


// middleware start
app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// session setup
app.use(
    session({

        secret: "securekeyoifdmnjonfosdnmfojdsmf#¤moasmodmasomkfodd+dmskmfkdm009==9mkokm",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false } // http/https

    })
);

function requireLogin( req , res , next ) {
    if ( ! req.session.user ) {
        return res.redirect("./login.html");
    };
    next();
};
// middleware end

app.post('/login', async ( req , res ) => {

    let wrong = "Wrong username or password.";

    const { email , password, firstname } = req.body;
    const user = db.prepare('SELECT * FROM user WHERE email = ?').get(email);
    // response if user or password is wrong
    if ( ! user ) {
        return res.status(401).json({ message: wrong });
    };
    const passwordVerify = await bcrypt.compare(password, user.password);
    if ( ! passwordVerify ) {
        return res.status(401).json({ message: wrong });
    };

    

    req.session.user = {id: user.uid, firstname: user.firstname, username: user.username, email: user.email };
    
    res.json({ message: "login success" });
});

app.post('/logout', ( req , res ) => {
    req.session.destroy();
    // res.json({message: "logout success"});
    res.redirect('../login.html');
});

app.post('/register', async (req, res) => {
    const {
        email,
        username,
        firstname,
        lastname,
        password
    } = req.body;

    // hash bcrypt
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // Correctly pass parameters as a list
    try {
        const statement = db.prepare("INSERT INTO user (email, username, firstname, lastname, password) VALUES (?, ?, ?, ?, ?)");
        const info = statement.run(email, username, firstname, lastname, hashPassword);
        res.json({ message: "User registered successfully" });
    } catch (error) {

        console.error('Error inserting data:', error.message, "if login fails try to verify your account");
        return res.status(500).json({ message: 'the email adress is already registered.' });
    }
    

    
});

app.get('/home', requireLogin, ( req , res ) => {
    res.sendFile(__dirname+"/private/dashboard.html")    
});

app.get('/userinfo', requireLogin, ( req , res ) => {
    const username = req.session.user.username; 
    // debug
    console.log(username);
    const user = db.prepare("SELECT * FROM user WHERE username = ?").get(username);
    // req.session.user = {id: user.uid, firstname: user.firstname, username: user.username }
    res.json(user);
});

app.get('/noteApp', requireLogin, ( req , res ) => {
    res.sendFile(__dirname+"/private/noteApp/noteApp.html");
    
    
});

app.get('/noteTitle', requireLogin, ( req , res ) => {
    
    

    // const notesOwn = db.prepare(`SELECT * FROM listRole WHERE listRole.uid = ?`).all(req.session.user.id);
    try {
        const noteTitle = db.prepare(`SELECT list.title, list.listID FROM list INNER JOIN listRole ON list.listID = listRole.listID WHERE listRole.uid = ?`).all(req.session.user.id);
        console.log(noteTitle);    
    
        if ( ! noteTitle ) {
            return res.status(404).json({ message: "Titles not found" });
    
        } else {
            res.json(noteTitle);
        }

        req.session.list = noteTitle.listID;
        console.log(req.session.list.json());
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
    // const notesOwn = db.prepare(`SELECT * FROM listRole INNER JOIN listItem ON listRole.uid = ? WHERE listRole.role = 'owner'`).all(req.session.user.id);
    
    
});

app.get('/noteItem', requireLogin, ( req , res ) => {
    try {
        const noteContent = db.prepare(`SELECT listItem.listID, listItem.listItemID, listItem.content FROM listItem WHERE listItem.listID = ?`).all(req.session.list);
        console.log(noteContent);
        if ( ! noteContent ) {
            return res.status(404).json({ message: "noteItems not found" });
        } else {
            res.json(noteContent);
        }
} catch (error) {
        console.error('error fetching noteItem:', error.message);
        return res.status(500).json({ message: 'Internal server error' });  
    }

});

app.listen(PORT, () => {
    console.log(`server is running on: http://localhost:${PORT}`);
});
