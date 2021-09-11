import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Pharmacy from "./Pages/Pharmacy";
import VideoCall from "./Pages/VideoCall";
import Owner from "./Pages/Owner";
import LandingPage from "./Pages/landingPage";
export default function App() {
	const [pharmacies, setPharmacies] = useState([]);
	const [items, setItems] = useState({});
	const [cart, setCart] = useState({});
	const [user, setUser] = useState(null);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			fetch(
				`/api/pharmacy?latitude=${encodeURIComponent(
					position.coords.latitude
				)}&longitude=${encodeURIComponent(position.coords.longitude)}`,
				{
					credentials: "include",
					mode: "same-origin",
				}
			)
				.then((res) => res.json())
				.then((res) => {
					res.nearby_pharmacies = Array.from(res.nearby_pharmacies);
					setPharmacies(res.nearby_pharmacies);
					for (let pharmacy of res.nearby_pharmacies) {
						for (let item of pharmacy.items) {
							items[item.pk] = item;
						}
					}
					setItems(items);
				});
		});
	}, []);

	return (
		<div className="app">
			<Router>
				<Navbar
					items={items}
					cart={cart}
					setCart={setCart}
					user={user}
					setUser={setUser}
				></Navbar>
				<Route exact path="/login">
					<Login user={user} setUser={setUser} />
				</Route>
				<Route exact path="/cart">
					<Cart
						user={user}
						items={items}
						cart={cart}
						setCart={setCart}
					/>
				</Route>
				{pharmacies.map((pharmacy) => (
					<Route exact path={`/pharmacy/${pharmacy.eLoc}`}>
						<Pharmacy
							pharmacy={pharmacy}
							cart={cart}
							setCart={setCart}
						/>
					</Route>
				))}
				<Route exact path="/pharmacy">
					<Home pharmacies={pharmacies} />
				</Route>
				<Route exact path="/video/" component={VideoCall} />
				{pharmacies.map((pharmacy) => (
					<Route exact path={`/owner/${pharmacy.eLoc}`}>
					<Owner
						pharmacy={pharmacy}
						setPharmacies={setPharmacies}
						cart={cart}
						setCart={setCart}
					/>
				 </Route>
				))}
				<Route exact path="/">
					<LandingPage />
				</Route>
			</Router>
		</div>
	);
}
