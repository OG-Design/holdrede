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
            note.innerHTML = `
            <input onClick="" id="${titleID}" value="${element.noteTitle}" placeholder="title"></input>
            <textarea onClick="" id="${contentID}" placeholder="content">${element.noteContent}</textarea>
            <button id="${titleID+"_alt"}" onClick="postAlterNote()">Save Changes</button>
            <button id="${titleID+"_del"}" onClick="deleteNote()">Delete</button>`;
            
            container.appendChild(note);
        });
    }

}

let newtitleID = "ntID";
let newcontentID = "ncID";

function noteSkeli() {
    let note = document.createElement('div');
    note.innerHTML = `
    <input onClick="" id="${newtitleID}" value="" placeholder="title"></input>
    <textarea onClick="" id="${newcontentID}" placeholder="content"></textarea>
    <button id="saveBtn" onClick="postNewNote()">Add</button>`;
    container.appendChild(note);

}


// functions run
noteSkeli();
getNotes();

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
       
};

async function postAlterNote() {
    const res = await fetch("/simpleNotesGET", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        
    });

    const data = await res.json();

    await data.forEach( element => {
        let titleID = element.noteTitle+element.noteID;
        let contentID = element.noteContent+element.noteID;

        async function post() {
            
            const title = document.getElementById(titleID).value;
            const content = document.getElementById(contentID).value;

            const res = await fetch('/simpleNotesAlterPOST', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    content
                })
            });
            
        }
        post();

        
    });
}


