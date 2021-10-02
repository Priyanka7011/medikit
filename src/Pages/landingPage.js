import React from "react";
import { Link } from "react-router-dom";
import CardTiles from "../Components/CardTiles";
import "../CSS/Landing.css";
import hero from "../sample-images/hero.png"
export default function LandingPage({ pharmacies }) {
	return (
	    <div class='LandingContainer'>
            <div class='Text'>
                <h1>One Stop for all <br></br> your Medical needs</h1>
                <p>We allow patient to consult with the doctor regarding the medicines availability and prices of medicine nearby the patient, and discuss the total cost of the prescription with the doctor. ( So that doctor can suggest better alternative )..</p>
                <Link to='/pharmacy'>
                <button class='custBtn'>Find Pharmacy</button>
                </Link>
            </div>
            <div class='Image'>
                <img src={hero}></img>
            </div>
        </div>
	);
}
