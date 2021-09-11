import React from "react";
import "../CSS/CartItem.css";

export default function CartItem({ cart, item, setCart }) {
	const handleOnChange = async (e) => {
		if (e.target.value == 0) {
			if (item.pk in cart) {
				delete cart[item.pk];
			}
		} else cart[item.pk] = e.target.value;
		setCart(cart);
	};

	return (
		<div className="cartitem">
			<div className="cartitem__image">
				<img
					src={item.image_url}
					alt="Product"
					className="cart__image"
				/>
			</div>

			<p className="cartItem__name">{item.name}</p>

			<p className="cartitem__price">&#8377; {item.price.toFixed(2)}</p>
			<select
				className="cartItem__select"
				defaultValue={cart[item.pk]}
				onChange={(e) => handleOnChange(e)}
			>
				{[...Array(item.amount + 1).keys()].map((x) => (
					<option key={x} value={x}>
						{x}
					</option>
				))}
			</select>
		</div>
	);
}
