import React from "react";

const grafArray = ["Innskudd", "Kostnader"];

export const Graf = (props) => {

    const { graf } = props;

    return (
        // grafArray map(returnerer array, grafer) 
        grafArray.map( (grafer) => {

            // returnerer canvas med id grafer etter grafer sin lengde(grafArray[length of items])
            return (
                <div className="grafContainer">
                    
                    <p>{grafer}</p>

                    <canvas id={grafer} key={grafer.id}>

                    </canvas>
                
                </div>
            )

        })
        
        
    )
}