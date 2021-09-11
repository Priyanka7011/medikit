import React from "react";
import { Link } from "react-router-dom";
import CartItem from "../Components/CartItem";
import "../CSS/Pharmacy.css";

export default function Pharmacy({ pharmacy, cart, setCart }) {
	return (
		<div className="pharmacy-container">
			<div className="container-left">
				{pharmacy &&
					pharmacy.items.map((medItem) => (
						<CartItem
							cart={cart}
							item={medItem}
							setCart={setCart}
						/>
					))}
			</div>
			<div className="container-right">
				<div className="pharmacy-details-container">
					<span className="pharmacy-details-name">
						{pharmacy && pharmacy.placeName}
					</span>
					<div className='color-band'>
						<p></p>
					</div>
					<span className="pharmacy-details-medicine">
						{pharmacy && pharmacy.distance} meters from you
					</span>
					<span className="pharmacy-details-medicine">
						{pharmacy && pharmacy.placeAddress}
					</span>
				</div>
				<div className="goto-cart">
					<Link to="/cart">
						<button style={{'margin-top':'10px','padding':'15px','backgroundColor':'orange',
					'color':'white','fontWeight':'600','fontFamily':'Poppins','borderRadius':'40px','width':'200px','fontSize':'18px'}} className="custBtn">Go To Cart</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
