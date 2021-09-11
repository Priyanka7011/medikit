import { Link } from "react-router-dom";
import React from "react";
import "../CSS/CardTile.css";
import { MedicineBoxOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHospital} from '@fortawesome/free-solid-svg-icons'
export default function CardTiles({ pharmacy }) {
	const redirectLink = `/pharmacy/${pharmacy.eLoc}`;
	return (
		
		<div className="card-container">
		   <div className='color-card'>
		   <Link to={redirectLink} className="pharmacy-link">
					<span className="pharmacy-details pharmacy-name">
						{pharmacy.placeName}
					</span>
				</Link> 
			</div>
			
			<div class='detail-card'>
			
				<span className="pharmacy-details">
					<span className="pharmacy-details-distance">
						{pharmacy.distance}
					</span>{" "}
					meters away
				</span>
				<span className="pharmacy-details">{pharmacy.placeAddress}</span>
				<div style={{'margin-top':'20px','display':'flex','justifyContent':'flex-end'}}>
				<Link to={redirectLink} className="pharmacy-link">
					<button style={{'backgroundColor': 'orange',
	'color':'white',
	'font-weight':'500',
	'borderRadius': '80px'}}className='custBtn'>Browse store</button>
				</Link>
				</div>
			</div>
			
		</div>
		
	);
}
