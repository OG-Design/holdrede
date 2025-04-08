console.log("ComponentsScriptRunning");
document.getElementById('notesAppBtn').addEventListener("click", notesApp)

function showUserName () {
    let username;
}

function homeApp () {

}


function notesApp () {
    console.log("running: notesApp")
    const getAppRoot = document.getElementById('noteRoot');
    getAppRoot.style.display="block";
   
}