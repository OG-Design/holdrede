let list = ["list0","list1","list2"];

let app = document.getElementById("app");

// input for å legge til liste
function listInput() {

    let leggtilknapp = document.createElement("button");

    leggtilknapp.id="leggtilknappid"

    leggtilknapp.innerHTML="legg til";

    
    let listInput = document.createElement("input")
    listInput.id="inputid";
    listInput.placeholder="skriv ...";
    listInput.style.overflow="scroll";

    document.getElementById("app").appendChild(listInput);
    document.getElementById("app").appendChild(leggtilknapp);

    document.getElementById("leggtilknappid").addEventListener("click", leggtilfunksjon);
}


listInput();
// function lag og vis liste.
function lagogvis() {

    

    // lag liste samt slett function per liste element.
    for ( i=0; i<list.length ; i++ ) {
    
        // def id til liste
        let listid = list[i];
    
        

        if (document.getElementById(listid) == null){

            // lag liste element per list.length
            let li = document.createElement("li");
            li.innerText=list[i];
            li.id=listid+"_listtext";
            app.appendChild(li);

            
            
            // lag slett knapp
            let button = document.createElement("button");
            button.id=listid;
            button.innerHTML="del item";
            li.appendChild(button);


        } else {

            document.getElementById("app").removeChild(document.getElementById(listid+"_listtext"))
        
            // lag liste element per list.length
            let li = document.createElement("li");
            li.innerText=list[i];
            li.id=listid+"_listtext";
            app.appendChild(li);

            
            
            // lag slett knapp
            let button = document.createElement("button");
            button.id=listid;
            button.innerHTML="del item";
            li.appendChild(button);

        }
        
        

        function get(val) {
        return function() {del(val)}
        }

        
    document.getElementById(listid).addEventListener("click", get(i));

    }

    function del(val) {
        let listid = list[val];
        document.getElementById(listid+"_listtext",listid).style.display="none";
        document.getElementById(listid).style.display="none";
    }


}

lagogvis();


function leggtilfunksjon() {

    let input = document.querySelector("#inputid").value;
    
    if ( input == '' ) {
    } else {
        list.push(input)
    }
    
    // debug
    console.log("test")

    

    console.log(list)

    lagogvis()   

}