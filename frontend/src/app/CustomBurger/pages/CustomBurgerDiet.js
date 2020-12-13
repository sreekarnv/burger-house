import React from "react";
import { useRouteMatch } from "react-router-dom";

import DietCard from "./../components/DietCard";

const CustomBurgerDiet = () => {
	const route = useRouteMatch();

	return (
		<div className='custom-burger__diet'>
			<h4 className='custom-burger__diet-heading'>Choose your diet</h4>
			<div className='custom-burger__diet-card-container'>
				<DietCard
					to={`${route.path}/veg`}
					veg
					className='custom-burger__diet-card--veg'
				/>
				<DietCard
					to={`${route.path}/non-veg`}
					className='custom-burger__diet-card--nonveg'
				/>
			</div>
		</div>
	);
};

export default CustomBurgerDiet;
