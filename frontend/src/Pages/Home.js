import React from "react";
import CardTiles from "../Components/CardTiles";
import "../CSS/Home.css";

export default function Home({ pharmacies, user }) {
	if (user)
		return (
			<div className="home-container">
				{pharmacies &&
					pharmacies.map((pharmacy) => (
						<CardTiles pharmacy={pharmacy} />
					))}
			</div>
		);
	else
		return (
			<div className="login-error">
				<h4>Login to continue.</h4>
			</div>
		);
}
