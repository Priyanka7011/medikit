import React, { useEffect, useState } from "react";
import { Avatar, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Link } from "react-router-dom";
import "../CSS/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFirstAid } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ items, cart, setCart, user, setUser }) {
	const [options, setOptions] = useState(Object.values(items));

	const handleLogout = () => {
		localStorage.getItem("token") && localStorage.removeItem("token");
		setUser(null);
	};

	const onSearchBarChange = (_event, item) => {
		if (item == null) return;
		if (item.pk in cart) return;
		cart[item.pk] = 1;
		setCart(cart);
	};

	const onSearchBarFocus = () => {
		setOptions(Object.values(items));
	};

	return (
		<div className="navbar">
			<input type="checkbox" id="nav-check"></input>
			<Link to="/" className="home-link">
				<div className="logo">MEDIKIT</div>
				<FontAwesomeIcon
					size="1x"
					color="white"
					icon={faFirstAid}
				></FontAwesomeIcon>
			</Link>
			<Autocomplete
				className="searchbar"
				options={options}
				getOptionLabel={(item) => item.name}
				onChange={onSearchBarChange}
				onFocus={onSearchBarFocus}
				renderInput={(params) => (
					<TextField {...params} label="Search" variant="outlined" />
				)}
			/>
			<label for="nav-check">
				<span></span>
				<span></span>
				<span></span>
			</label>
			<div className="button-container">
				{user ? (
					<>
						<div className="avatar">
							<Avatar>A</Avatar>
						</div>
						<Link to="/video">
							<button className="login-btn">
								Consult Doctor
							</button>
						</Link>
						<button className="login-btn" onClick={handleLogout}>
							LogOut
						</button>
					</>
				) : (
					<>
						<Link to="/login">
							<button className="login-btn">Log In</button>
						</Link>
						<Link to="owner/C7U7PT">
							<button className="login-btn">My Pharmacy</button>
						</Link>

						<Link to="/video">
							<button className="login-btn">
								Consult Doctor
							</button>
						</Link>
					</>
				)}
			</div>
		</div>
	);
}
