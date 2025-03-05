import React from "react";
import { Graf } from './Graf.jsx'

const grafArray = ["Innskudd", "Kostnader"];



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