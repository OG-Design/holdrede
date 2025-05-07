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

app.get('/userinfo', requireLogin, ( req , res ) => {
    const username = req.session.user.username; 
    // debug
    console.log(username);
    const user = db.prepare("SELECT * FROM user WHERE username = ?").get(username);
    // req.session.user = {id: user.uid, firstname: user.firstname, username: user.username }
    res.json(user);
});

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

// send user dashboard info
app.get( '/userinfo' , requireLogin , ( req , res ) => {
    const uid = req.session.user.id;
    const username = req.session.user.username;
    
    // debug
    console.log('User logged in')
    console.log('userid( uid ): ' , uid);
    console.log('username: ' , username);

    const user = db.prepare('SELECT * FROM user WHERE uid = ? ').get(uid);
});



// 
// NOTES START
// note app START
app.get( '/simpleNotes', requireLogin , ( req , res ) => {
    res.sendFile(__dirname+"/private/noteApp/simpleNotesApp.html");
});

// get all notes from db where uid = session uid
app.get("/simpleNotesGET", requireLogin, (req, res) => {
    try {
        // get user notes
        const notes = db.prepare("SELECT noteID, noteTitle, noteContent, uid FROM notes WHERE uid = ?").all(req.session.user.id);
        res.json(notes);
    } catch (error) {
        console.error("error fetching data: ", error.message);
        return res.status(500).json({ message: "internal server error" });
    }
});


// create new note
app.post("/simpleNotesNewPOST", requireLogin, (req, res) => {
    try {
        const { title, content } = req.body;
        const uid = req.session.user.id;
        // insert new note
        const statement = db.prepare("INSERT INTO notes (noteTitle, noteContent, uid) VALUES (?, ?, ?)");
        statement.run(title, content, uid);
        res.json({ message: "note created" });
    } 
    catch (error) {
        console.error("error posting data: ", error.message);
        return res.status(500).json({ message: "internal server error" });

    }

});

// alter note content title
app.post("/simpleNotesAlterPOST", requireLogin, (req, res) => {
    try {
        const { title, content, noteID } = req.body;
        const uid = req.session.user.id;
        // insert new note
        const statement = db.prepare("UPDATE notes SET noteTitle = ?, noteContent = ? WHERE uid = ? AND noteID = ?");
        statement.run(title, content, uid, noteID);
        res.json({ message: "note updated" });
    } 
    catch (error) {
        console.error("error posting data: ", error.message);
        return res.status(500).json({ message: "internal server error" });

    }
});
// NOTES END 
// 

// 
// costApp Start
app.get("/costs", requireLogin, (req, res) => {
    try {
        res.sendFile(__dirname+"/private/costsApp/costApp.html")
    } catch (error) {
        console.error("error sending file: /costs")
        res.status(500).json({message: "internal server error"})
    }
}); 

app.get("/kostnadAlle", requireLogin, (req, res) => {
    
    try {
        const finnKostAlle = db.prepare("SELECT kjopID, tittel, beskrivelse, dato, kostnad, uid FROM kostnader WHERE uid = ?").all(req.session.user.id);
        res.json(finnKostAlle);
        console.log(finnKostAlle);
    } catch (error) {
        console.error("error getting kostnad from user with uid:" + " " + req.session.user.id);
        res.status(500).json({message: "internal server error"});
    };
});

app.post("/kostNyPOST", requireLogin, (req, res) => {
    try {
        // request 
        const { tittel , dato , kostnad } = req.body;
        const uid = req.session.user.id;

        // make query and run statement 
        const statement = db.prepare("INSERT INTO kostnader (tittel , dato , kostnad , uid) VALUES ( ? , ? , ? , ? ) ").get(uid);
        statement.run(tittel , dato , kostnad , uid);
    } catch (error) {
        console.error("error inserting new data:", error)
        res.status(500).json({ message: "internal server error" });
    }
});

// WIP non functional
app.post("/kostSlettPOST", requireLogin, ( req , res ) => {
    try {
        const uid = req.session.user.id;
        const statement = db.prepare("").get(uid)
    } catch ( error ) {
        console.error("error deleting data: ", error);
        res.status(500).json({ message: "internal server error" });
    }
});
// costApp End
// 





// open port
app.listen( PORT , () => {
    console.log(`%cserver is running on:`,`color:#ff0000`, `http://localhost:${PORT}`);
});