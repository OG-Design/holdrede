function notesApp () {
    const getAppRoot = document.getElementById('noteRoot');
    const list () => {
        const noteList = document.createElement('div');
        getAppRoot.appendChild(noteList);
        
        noteList.innerHTML={`
            <listTitle>${note.title}</listTitle>
            `};
        
    } 
}