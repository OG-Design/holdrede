// get id
const root = document.getElementById('costRoot');

// get costs
async function getCosts () {
    const res = await fetch('/kostnadAlle', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    console.log("response: ", data)


    data.forEach(element => {
        // debug
        console.log(element);


        
        // contents definition
        const kjopPos = data.indexOf(element)+1;
        const kjopTittel = element.tittel;
        const kjopKostnad = element.kostnad;

        // listItemID
        const kjopID=element.kjopID+kjopTittel;
        const kjopIDKostnad=kjopID+kjopKostnad;

        const listItem = document.createElement('div');
        listItem.innerHTML=`
        
        <div>${kjopPos}</div>
        <input id="${kjopID}" type="text" value="${kjopTittel}"></input>
        <input id="${kjopIDKostnad}" type="text" value="${kjopKostnad}"></input>
        <button onClick="deleteCost">del</button>
        `;
        root.appendChild(listItem)

    });


}

getCosts();



const nyTittelID = "tittel";
const nyDatoID = "dato";
const nyKostnadID = "kostnad";
const leggTilKnappID = "leggTilKostnad";
const formID = "formID";
function costSkeli () {
    const costAdd = document.createElement('div');
    costAdd.innerHTML += `
    <form id="${formID}">
    <label for="${nyTittelID}">Purchase</label>
    <input id="${nyTittelID}" type="text" required></input>
    <label for="${nyDatoID}">Date</label>
    <input id="${nyDatoID}" type="text" required></input>
    <label for="${nyKostnadID}">Amount</label>
    <input id="${nyKostnadID}" type="text" required></input>
    <button id="${leggTilKnappID}" type="submit">add</button>
    </form>
    `;
    root.appendChild(costAdd);
     
}


costSkeli();

document.getElementById(formID).addEventListener("submit", costPost);

// WIP POST NO BACKEND YET
async function costPost(event) {
    event.preventDefault();
    const tittel = document.getElementById(nyTittelID).value;
    const dato = document.getElementById(nyDatoID).value;
    const kostnad = document.getElementById(nyKostnadID).value;
    const leggTil = document.getElementById(leggTilKnappID);

    const a = await fetch('/kostNyPOST', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tittel,
            dato,
            kostnad

        })

    });
    const data = await a.json();
       
    window.location.reload();
    
};
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// delete
async function delCost() {
    const postDel = fetch('/namehere', {
        method: 'POST',
        headers: {
            'method': 'application/json'
        },
        body: JSON.stringify({
            
        })
    });
};
=======
=======
>>>>>>> Stashed changes

async function deleteCost () {

    data.forEach(element => {
        
    });

    const postDel = await fetch('/kostSlettPOST', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tittel,
            dato,
            kostnad,
        })
    });
    const data = await postDel.json();
};
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
