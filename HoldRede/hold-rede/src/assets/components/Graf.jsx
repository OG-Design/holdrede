import React from "react";
import Chart from "chart.js/auto";


const grafArray = ["Innskudd", "Kostnader", "Sum"];


function chart () {

    let data = [
        {dato: "01/01/25" , verdi: 100},

        {dato: "08/01/25" , verdi: 5300}
    ];

    const chart = new Chart(document.getElementById(grafer), {
        type: 'line',
        data: data,
        options: {

        },
    });

}


export const Graf = (props) => {

    // const { graf } = props;

    return (
        // grafArray map(returnerer array, grafer) 
        grafArray.map( (grafer) => {

            


            // returnerer canvas med id grafer etter grafer sin lengde(grafArray[length of items])
            return (
                <div className="grafContainer" key={grafer.toString()}>
                    
                    <p>{grafer}</p>

                    <canvas id={grafer}>

                    </canvas>
                
                </div>
            )

        })
        
        
    )
}