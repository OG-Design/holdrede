console.log("notesApp running");

// get notes
async function resJSON(res) {
    const data = await res.json();
    console.log("data response: ", data);
    data.forEach(elem => {
        // debug
        console.log(" ")
        console.log("LIST ");
        console.log("title: ", elem.title);
        console.log("listID: ", elem.listID);
        console.log("uid: ", elem.uid);
        console.log("role: ", elem.role);
    
    });
}

async function getNotes() {
    


    console.log("running: getNotes")
    const res = await fetch("/noteDisplayOwn", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    
    

    resJSON(res)
   
    
        
}

getNotes()