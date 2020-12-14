import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import Alert from "./../Alert/Alert";
import AddOrRemoveButton from "./../Buttons/AddOrRemoveButton";

const CardMenu = (props) => {
	const { burger, addBurger, removeBurger, admin } = props;
	const {
		name,
		photoUrl,
		ingredients,
		price,
		isVegetarian,
		slug,
		itemsInCart,
	} = burger;

	const [showAlert, setShowAlert] = useState(false);
	const [alertType, setAlertType] = useState();

	useEffect(() => {
		if (showAlert) {
			let timer = setTimeout(() => {
				setShowAlert(false);
				setAlertType(null);
			}, 2000);

			return () => clearTimeout(timer);
		}
	}, [showAlert]);

	const route = useRouteMatch();
	const history = useHistory();

	return (
		<>
			{showAlert && (
				<Alert variant={alertType}>
					{alertType === "success" && "Added Burger To Cart"}
					{alertType === "danger" && "Removed Burger From Cart"}
				</Alert>
			)}
			<div className='card-menu'>
				<div className='card-menu__image'>
					<img src={photoUrl} alt={name} />
				</div>

				<h4 className='card-menu__name'>{name}</h4>
				<p
					className={`card-menu__foodtype ${
						isVegetarian ? "u-text-success" : "u-text-danger"
					}`}>
					{isVegetarian ? "vegetarian" : "non-vegetarian"}
				</p>
				<div className='card-menu__ingredients'>
					{ingredients.map((el, i) => {
						return (
							<div key={el._id + `${i}`} className='card-menu__ingredient'>
								<span>{el.ingredient.name}</span>&nbsp;
								<span>X&nbsp; {el.amount}</span>
							</div>
						);
					})}
				</div>

				<p className='card-menu__price'>Rs {price}</p>
				{!admin && itemsInCart === 0 && (
					<button
						onClick={() => {
							addBurger(burger);
							setShowAlert(true);
							setAlertType("success");
						}}
						className='btn btn__primary--outline card-menu__cta'>
						add to cart
					</button>
				)}

				{!admin && itemsInCart > 0 && (
					<AddOrRemoveButton
						addItem={() => {
							addBurger(burger);
							setShowAlert(true);
							setAlertType("success");
						}}
						removeItem={() => {
							removeBurger(burger);
							setShowAlert(true);
							setAlertType("danger");
						}}
						lg
						color='secondary-50'
						className='card-menu__cta'>
						{itemsInCart}
					</AddOrRemoveButton>
				)}

				{admin && (
					<button
						onClick={() => history.push(`${route.path}/${slug}`)}
						className='btn btn__primary--outline card-menu__cta'>
						Update Burger
					</button>
				)}
			</div>
		</>
	);
};

export default CardMenu;
