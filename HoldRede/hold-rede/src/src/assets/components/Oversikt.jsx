import React from "react";


const grafArray = ["Innskudd", "Kostnader"];

const Graf = (props) => {

    const { graf } = props;

    return (
        // grafArray map(returnerer array, graf) 
        grafArray.map( (grafer) => {

            // returnerer canvas med id grafer etter grafer sin lengde(grafArray[length of items])
            return (
                <div className="grafContainer">
                    
                    <p>{grafer}</p>

                    <canvas id={grafer}>

                    </canvas>
                
                </div>
            )

        })
        
        
    )
}

export const Oversikt = () => {
    return (
        
        
    
    
    <div>
        <p>oversiktside</p>
        <p>tre chart js grafer som viser "Innskudd, kostnader, sum"</p>

        <div>
            <Graf />

        </div>
    </div>

    
    )
}