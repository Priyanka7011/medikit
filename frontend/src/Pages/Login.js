import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../CSS/Login.css";
import Sawo from "sawo";

export default function Login({ user, setUser }) {
	const history = useHistory();

	useEffect(() => {
		var config = {
			containerID: "sawo-container",
			identifierType: "phone",
			apiKey: "1becc7cb-07ea-4477-8d7f-2c4f4581febb",
			onSuccess: (payload) => {
				sessionStorage.setItem("token", payload.verification_token);
				setUser(payload.identifier);
				history.push("/");
			},
		};
		let sawo = new Sawo(config);
		sawo.showForm();
	}, []);

	return (
		<div className="containerStyle">
			<section>
				<h2 className="login-title">Medikit Login</h2>
				{user ? (
					<div className="loggedin">
						<h2>User Logged In</h2>
					</div>
				) : (
					<div className="formContainer" id="sawo-container"></div>
				)}
			</section>
		</div>
	);
}
