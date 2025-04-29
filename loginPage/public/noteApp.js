console.log("notesApp running");

// get notes
async function resJSON(res) {
    const data = await res.json();
    console.log("data response: ", data);
    // data.forEach(elem => {
    //     // debug
    //     console.log(" ")
    //     console.log("LIST ");
    //     console.log("title: ", elem.title);
    //     console.log("listID: ", elem.listID);
    //     console.log("uid: ", elem.uid);
    //     console.log("role: ", elem.role);
    
    // });
    console.log(data)
}

const getRoot = document.getElementById('noteRoot');
let listIDDOM = "listIDDOM";
let lid = listIDDOM+"_content";
async function getNotesContent() {
    const res = await fetch("/noteDisplayOwnContent", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    // resJSON(res)

    const data = await res.json();

    // set of titles
    const titles = new Set();

    // desired listID
     

    await data.forEach(element => {
        let { listItemID, content, listID, title } = element;
        
        // const desiredListID = data.length > 0 ? data[element] : null;

        // display only one title per item in list
        if (!titles.has(listID)) {
            titles.add(listID);
            console.log("title: ", title);

            // temp save for reversion
            let listIDDOM_TMP = listIDDOM;

            // add listID to listIDDOM for unique id
            listIDDOM = listIDDOM + listID;
            
            
            getRoot.innerHTML += `
            <div id="${listIDDOM}">
            <h3>${title}</h3>
            
            <div id="${lid}" class="${listID}"></div>
            
            </div>`
            
            // if (element == listID) {
            //     // add content to listIDDOM
            //     document.getElementById(lid).innerHTML += `
            //         <p id="${listItemID}">${content}</p>
            //     `;
            // }
        
            

            // assign to original listIDDOM
            listIDDOM = listIDDOM_TMP;

                  

        }


        for (i=0; i <= listID; i++) {
            if (listID != document.getElementsByClassName(listID)) {
                
            } else {
                console.log("as")
                document.getElementsByClassName(listID).innerHTML += `
                 <p id="${listItemID}">${content}</p>
             `;
            }
        }    
        
        
        
        
        

    

        
        // if( itemID == desiredListID ) {
            
        // }
        


        console.log("listItem", element.content)
        // console.log("listItemID", element.listItemID, " content:", element.content, " listId", element.listID, " title:", element.title);
    });

    // let itemID ="";

    // await data.forEach(element => {
    //     const { listItemID, content, listID, title } = element;
        
    //     let a = document.getElementById();

    //     if ( element == listID ) {
    
    //         document.getElementById(lid).innerHTML += `
    //             <p id="${itemID}">${content}</p>
    //         `;
            
    //     }
    // });

    
}



getNotesContent();