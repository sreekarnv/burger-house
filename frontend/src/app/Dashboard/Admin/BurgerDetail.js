import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import FormInput from "./../../shared/components/Form/FormInput";

import axios from "axios";
import Loader from "../../shared/components/Loader/Loader";

import CustomBurger from "./../../shared/components/CustomBurger/CustomBurger";
import { useSelector } from "react-redux";

const BurgerDetail = () => {
	const params = useParams();
	const user = useSelector((state) => state.auth.user);
	const history = useHistory();

	useEffect(() => {
		if (user && user.role !== "admin") {
			return history.replace("/dashboard");
		}
	}, [history, user]);

	const [burgerInputstate, setBurgerInputState] = useState({
		name: {
			type: "text",
			label: "Name",
			required: true,
			value: "",
		},
		price: {
			type: "text",
			label: "Price",
			required: true,
			value: "",
		},
		photo: {
			type: "file",
			label: "photo",
			value: "",
			preview: "",
		},
	});

	const [burger, setBurger] = useState();
	const [loading, setIsLoading] = useState(false);

	const [burgerIngredients, setBurgerIngredients] = useState([]);

	useEffect(() => {
		if (!burger) {
			setIsLoading(true);
			const getBurger = async () => {
				try {
					const res = await axios({
						method: "GET",
						url: `/api/v2/burgers/${params.slug}`,
					});

					setBurger(res.data.data);
					setBurgerInputState({
						name: {
							...burgerInputstate.name,
							value: res.data.data.name,
						},
						price: {
							...burgerInputstate.price,
							value: res.data.data.price,
						},
						photo: {
							...burgerInputstate.photo,
							preview: res.data.data.photoUrl,
						},
					});

					let ingredients = [];
					res.data.data.ingredients.forEach((el) => {
						ingredients.push({ ...el.ingredient, amount: el.amount });
					});
					setBurgerIngredients(ingredients);
				} catch (err) {}

				setIsLoading(false);
			};
			getBurger();
		}
	}, [params.slug, burger, burgerInputstate]);

	if (loading) {
		return <Loader fullScreen />;
	}

	const updateBurger = async (e) => {
		e.preventDefault();
		let body = new FormData();

		if (burger.name !== burgerInputstate.name.value) {
			body.append("name", burgerInputstate.name.value);
		}

		if (burger.price !== burgerInputstate.price.value) {
			body.append("price", burgerInputstate.price.value);
		}

		if (burgerInputstate.photo.value !== "") {
			body.append("photo", burgerInputstate.photo.value);
		}

		let updatedIngs = [];
		[...burgerIngredients].forEach((el) => {
			updatedIngs.push({ ingredient: el._id, amount: el.amount });
		});

		let updatedIngredients = JSON.stringify(updatedIngs);
		body.append("ingredients", updatedIngredients);

		try {
			const res = await axios({
				method: "PATCH",
				url: `/api/v2/burgers/${params.slug}`,
				data: body,
			});

			setBurger(res.data.data);
			setBurgerInputState({
				name: {
					...burgerInputstate.name,
					value: res.data.data.name,
				},
				price: {
					...burgerInputstate.price,
					value: res.data.data.price,
				},
				photo: {
					...burgerInputstate.photo,
					preview: res.data.data.photoUrl,
				},
			});

			let ingredients = [];
			res.data.data.ingredients.forEach((el) => {
				ingredients.push({ ...el.ingredient, amount: el.amount });
			});
			setBurgerIngredients(ingredients);
		} catch (err) {}
	};

	return (
		<div className='burger-detail'>
			<form className='burger-detail-form' onSubmit={updateBurger}>
				<h3 className='heading-1 u-text-primary u-text-capitalize u-ftwt-400'>
					Update {burgerInputstate.name && burgerInputstate.name.value}
				</h3>
				{Object.keys(burgerInputstate).map((el) => {
					return (
						<FormInput
							formState={burgerInputstate}
							key={el}
							id={el}
							onFormStateChange={setBurgerInputState}
						/>
					);
				})}
				<div className='burger-detail-burger form__group'>
					<CustomBurger hideCta ingredients={burgerIngredients} />
				</div>

				<div className='form__group'>
					<button type='submit' className='btn btn__primary'>
						Update Burger
					</button>
				</div>
			</form>
		</div>
	);
};

export default BurgerDetail;
