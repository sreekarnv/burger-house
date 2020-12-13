import React from "react";
import { NavLink } from "react-router-dom";

// import VegImage from "./../../../assets/images/gallery-1.jpg";

const DietCard = (props) => {
	const { className, veg, to } = props;

	return (
		<NavLink
			to={to}
			className={`diet-card ${
				veg ? "diet-card--veg" : "diet-card--non-veg"
			} ${className}`}>
			<p>{veg ? "Vegetarian" : "Non Vegetarian"}</p>
		</NavLink>
	);
};

export default DietCard;
