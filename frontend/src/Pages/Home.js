import React from "react";
import CardTiles from "../Components/CardTiles";
import "../CSS/Home.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home({ pharmacies }) {
	const { isAuthenticated } = useAuth0();

	if (isAuthenticated)
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
