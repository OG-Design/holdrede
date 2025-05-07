
console.log("ComponentsScriptRunning");

document.getElementById('notesAppBtn').addEventListener("click", notesApp);
document.getElementById('homeAppBtn').addEventListener("click", homeApp);
document.getElementById('costAppBtn').addEventListener("click", costApp);

// default display
document.getElementById('homeRoot').style.display="block";
// document.getElementById('noteRoot').style.display="none";

const usernameId = "usernameId";



// check dom content loaded
document.addEventListener("DOMContentLoaded", showUserName);

// shows username on dash
async function showUserName () {
    // debug
    console.log("showUserName running")

    // fetch user info from server
    const response = await fetch('http://localhost:3000/userinfo');
    // debug
    // console.log(response);
    
    // check response
    if ( ! response.ok){
        throw new Error("userinfo not found")
    }

    // wait and convert to json
    const data = await response.json();
    
    // welcome message on home page
    document.getElementById(usernameId).innerHTML = `Welcome ${data.username}`;
};




// home / dashboard display
function homeApp () {
    console.log("running: homeApp");
    const getAppRoot = document.getElementById('homeRoot');
    
    if (getAppRoot.style.display=="none") {
        getAppRoot.style.display="block";
    } else if (getAppRoot.style.display=="block") {
        getAppRoot.style.display="none";
    };
};

// redirect to notesApp
async function notesApp () {
    console.log("running: notesApp");
    const getAppRoot = document.getElementById('noteRoot');
    window.location.href = "/simpleNotes";

    console.log(notesApp)
};

// redirect to costApp
async function costApp () {
    console.log("running costApp");
    window.location.replace("/costs")
};
