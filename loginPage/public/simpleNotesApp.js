// This is a simple notes script that allows users to create, edit, and delete notes.

const getRoot = document.getElementById('noteRoot');

const container = document.getElementById('notesContainer');



async function getNotes()
    {
    const res = await fetch('/simpleNotesGET', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();

    console.log("notes response: ", data);

    if (res.ok) {
        

        await data.forEach( element => {

            let note = document.createElement('div');
            let titleID = element.noteTitle+element.noteID;
            let contentID = element.noteContent+element.noteID;
            note.innerHTML = `<div class="notepad">
            <input id="${titleID}" class="titleIn" onClick="" value="${element.noteTitle}" placeholder="title"></input>
            <textarea id="${contentID}" class="content" onClick="" placeholder="content">${element.noteContent}</textarea>
            
            <button id="${titleID+"_del"}" class="delButton" onClick="deleteNote()">Delete</button>
            </div>`;
            
            container.appendChild(note);
        });
    }

}

let newtitleID = "ntID";
let newcontentID = "ncID";

function noteSkeli() {
    let note = document.createElement('div');
    note.innerHTML = `
    <div class="notepad">
    <input class="titleIn" onClick="" id="${newtitleID}" value="" placeholder="title"></input>
    <textarea class="content" onClick="" id="${newcontentID}" placeholder="content"></textarea>
    <button class="delButton" id="saveBtn" onClick="postNewNote(true)">Add</button>
    </div>`;
    
    container.appendChild(note);

}


// functions run
getNotes();
noteSkeli();

async function postNewNote() {
    const title = document.getElementById(newtitleID).value;
    const content = document.getElementById(newcontentID).value;
    const a = await fetch('/simpleNotesNewPOST', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            content
        })

    });
    const data = await a.json();
       
    window.location.reload();
};

// async function postAlterNote() {
//     const res = await fetch("/simpleNotesGET", {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
        
//     });

//     const data = await res.json();

//     await data.forEach( element => {
//         let titleID = element.noteTitle+element.noteID;
//         let contentID = element.noteContent+element.noteID;

//         async function post() {
            
//             const title = document.getElementById(titleID).value;
//             const content = document.getElementById(contentID).value;



//             const res = await fetch('/simpleNotesAlterPOST', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     title,
//                     content
//                 })
//             });
//             console.log("notes response: ", title, content);
//         }
//         post();

        
//     });
// }

async function postAlterNote(trueForReLoad) {
    
    
    const res = await fetch("/simpleNotesGET", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        
    });
    const data = await res.json();
    

    await data.forEach( element => {
        async function a() {
            let title = document.getElementById(element.noteTitle+element.noteID).value;
            let content = document.getElementById(element.noteContent+element.noteID).value;
            let uid = element.uid; // change if other people access these notes

            const res = await fetch("/simpleNotesAlterPOST", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({
                    title,
                    content,
                    uid,
                    noteID: element.noteID
                })
            });
            

        }
        a();
    });

    
    window.location.reload();
    
    

}


// document.addEventListener('click', function(event) {
//     event.preventDefault();
    
//     if (event.target.classList.contains('titleIn') || event.target.classList.contains('content')) {
//         event.preventDefault();
//         postAlterNote();

//     }
// });