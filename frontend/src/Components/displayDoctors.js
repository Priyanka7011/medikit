import React from "react";
import "../CSS/Video.css"
import doctor1 from '../sample-images/doctor1.jpg'
import doctor2 from '../sample-images/doctor2.png'
import doctor3 from '../sample-images/doctor3.png'

export default function displayDoctors(){

    return(
        <div class='doctors' style={{'padding-top':'100px'}}>
        <div class='doctor-card'>
            <img src={doctor1}></img>
            <div>
                <p style={{'font-weight':'bold'}}>Dr. Rahul Gupta </p>
                <p>Physiologist</p>
                <p>Id:</p>
            </div>
        </div>
        <div class='doctor-card'>
            <img src={doctor2}></img>
            <div>
                <p style={{'font-weight':'bold'}}>Dr. Arvind Sharma </p>
                <p>Orthologist</p>
                <p>Id:</p>
            </div>
        </div>
        <div class='doctor-card'>
            <img src={doctor3}></img>
            <div>
                <p style={{'font-weight':'bold'}}>Dr. Ruchi Kumari </p>
                <p>Gynecologist</p>
                <p>Id:</p>
            </div>
        </div>
 </div>
    )

}