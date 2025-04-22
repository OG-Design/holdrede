console.log("notesApp running");


async function getNotes() {
    
    async function getNoteContent() {
        const res = await fetch("/noteItem", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.json().then((data) => {
            
            
        })
    }


    console.log("running: getNotes")
    const res = await fetch("/noteTitle", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.json()
        .then((data) => {
            // debug
            console.log(data);
            data.forEach(ele => {

                // debug
                console.log("element: ",data.indexOf(ele)," ");
                
                const listContainer = document.createElement("div");
                listContainer.innerHTML = `
                <ul>
                    <li class="subtitle"> ${ele.title}</li>
                    <ul id=${ele.title}>
                    
                        
                    
                    
                    
                    </ul>
                    </ul>
                </ul>`;
                document.getElementById("listShow").appendChild(listContainer);



            });

            getNoteContent()    
            
        })
        .catch((error) => {
            console.error("Error fetching notes:", error);
        });
        
        
}

getNotes()