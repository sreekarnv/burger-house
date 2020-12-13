import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Burger from "./Burger/Burger";
import IngredientControls from "./Ingredients/IngredientControls";

import * as ingredientActions from "../../../store/actions/ingredientActions";
import * as customBurgerActions from "../../../store/actions/customBurgerActions";
import * as cartActions from "../../../store/actions/cartActions";
import { Redirect, useRouteMatch } from "react-router-dom";
import Alert from "../Alert/Alert";

const NewCustomBurger = (props) => {
	const { foodType, ingredients, hideCta } = props;
	const dispatch = useDispatch();
	const route = useRouteMatch();
	const [showAlert, setShowAlert] = useState(false);

	const admin = route.path === "/dashboard/manage-menu/:slug";

	// redux state
	const burgerPrice = useSelector((state) => state.customBurger.burgerPrice);
	const serverIngredients = useSelector(
		(state) => state.ingredients.ingredients
	);
	const customBurgerIngredients = useSelector(
		(state) => state.customBurger.ingredients
	);
	const serverIngredientsError = useSelector(
		(state) => state.customBurger.ingredientsError
	);

	// clear all values and display state
	const resetIngredients = () => {
		dispatch(customBurgerActions.resetIngredients());
	};

	// Add burger to cart
	const addToCart = async () => {
		let id = "";
		const ingredients = [...customBurgerIngredients];

		customBurgerIngredients.forEach((el) => {
			if (el.amount !== 0) id += `${el.name}-${el.amount}-`;
		});

		// adding an items field
		ingredients.forEach((el) => {
			el["items"] = el.amount;
		});

		let burger = {
			name: "Custom Burger",
			price: burgerPrice,
			id,
			ingredients,
			isVegetarian: foodType === "vegetarian" ? true : false,
		};

		dispatch(cartActions.addBurgerToCart(burger));
		setShowAlert(true);
	};

	useEffect(() => {
		let filter = { foodType };
		// Get ingredients from server
		// if (admin) {
		dispatch(ingredientActions.getIngredients(filter));
		// }
	}, [dispatch, foodType, serverIngredients.length, admin]);

	useEffect(() => {
		// init ingredients in custom burger reducers
		if (serverIngredients.length) {
			dispatch(
				customBurgerActions.initCustomBurgerIngredients(serverIngredients)
			);
		}

		if (admin) {
			dispatch(customBurgerActions.initCustomBurgerIngredients(ingredients));
		}
	}, [serverIngredients, dispatch, admin, ingredients]);

	useEffect(() => {
		// Cleanup alert
		let timer;
		if (showAlert) {
			timer = setTimeout(() => setShowAlert(false), [2000]);
		}

		return () => {
			if (timer) {
				clearTimeout(timer);
			}
		};
	}, [showAlert]);

	useEffect(() => {
		// reset ings
		return () => dispatch(customBurgerActions.resetIngredients());
	}, [dispatch]);

	if (serverIngredientsError) {
		return <Redirect to='/something-went-wrong' />;
	}

	return (
		<>
			{showAlert && <Alert variant='success'>Added Burger To Cart</Alert>}
			<div className='custom-burger__create'>
				<Burger ingredients={customBurgerIngredients} />
				<IngredientControls ingredients={customBurgerIngredients} />
				<div className='custom-burger__create-cta'>
					{!hideCta && (
						<h3 className='custom-burger__create-cta-price'>
							Burger Price: Rs {burgerPrice}
						</h3>
					)}
					<div className='custom-burger__create-cta-btns'>
						{!hideCta && (
							<button
								disabled={burgerPrice > 250 ? false : true}
								onClick={resetIngredients}
								type='reset'
								className={`btn ${
									burgerPrice === 250
										? "btn__disabled--outline"
										: "btn__dark--outline"
								}`}>
								Reset
							</button>
						)}
						{!hideCta && (
							<button
								onClick={addToCart}
								disabled={burgerPrice > 250 ? false : true}
								type='submit'
								className={`btn ${
									burgerPrice === 250
										? "btn__disabled--outline"
										: "btn__success--outline"
								}`}>
								Add to Cart
							</button>
						)}
					</div>
					)
				</div>
			</div>
		</>
	);
};

export default NewCustomBurger;
