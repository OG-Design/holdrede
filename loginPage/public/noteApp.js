console.log("notesApp running");


async function getNotes() {
    


    console.log("running: getNotes")
    const res = await fetch("/noteDisplayOwn", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    
    return res.json()
        .then( ( data ) => {
            console.log("Data:");
            console.log(data);
            console.log("-----------");
            for (let i = 0; i< data; i++){
                console.log(data.title[i]);
                const elem = document.createElement("div");
                elem.innerHTML=data.title[i];
                document.getElementById('noteDisplay').appendChild(elem);
            }
        })
    
    
        
}

getNotes()