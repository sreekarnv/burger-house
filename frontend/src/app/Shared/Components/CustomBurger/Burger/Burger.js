import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Ingredient from "./../Ingredients/Ingredient";

const Burger = (props) => {
	const { ingredients } = props;

	// Just used to display
	const displayIngredients = useSelector(
		(state) => state.customBurger.displayIngredients
	);

	useEffect(() => {}, [ingredients]);
	return (
		<div className='burger'>
			<div className='burger-top-bun'></div>
			{displayIngredients
				.map((el, i) => {
					return (
						<Ingredient
							key={el.ingId + `${i}`}
							color={el.display.color}
							height={`${el.display.height}rem`}
							width={el.display.width || "100%"}
						/>
					);
				})
				.reverse()}
			<div className='burger-bottom-bun'></div>
		</div>
	);
};

export default Burger;
