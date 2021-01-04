import React from 'react';
import {
	Redirect,
	Route,
	Switch,
	useHistory,
	useRouteMatch,
} from 'react-router-dom';

import CustomBurgerDiet from './pages/CustomBurgerDiet';
import { useDispatch, useSelector } from 'react-redux';

import * as customBurgerActions from './../store/actions/customBurgerActions';
import CustomBurger from '../Shared/Components/CustomBurger/CustomBurger';
import Loader from '../Shared/Components/Loader/Loader';

const CustomBurgerRoutes = (props) => {
	const route = useRouteMatch();
	const history = useHistory();

	const dispatch = useDispatch();

	// redux state
	const serverIngredientsInit = useSelector(
		(state) => state.ingredients.ingredientsInit
	);

	const serverIngredients = useSelector(
		(state) => state.ingredients.ingredients
	);

	// reset all ingredients
	const removeAllIngredients = () => {
		dispatch(customBurgerActions.resetIngredients());
	};

	if (serverIngredientsInit && !serverIngredients.length) {
		return <Loader fullScreen />;
	}

	return (
		<div className='custom-burger'>
			<div className='custom-burger__header'>
				<button
					onClick={() => {
						removeAllIngredients();
						history.goBack();
					}}
					className='btn custom-burger__back-btn btn__back'>
					GO BACK
				</button>
				<h3 className='heading-1 custom-burger__heading  u-text-primary'>
					Make Your Burger
				</h3>
			</div>

			<Switch>
				<Route path={route.path} exact>
					<CustomBurgerDiet />
				</Route>
				<Route path={`${route.path}/veg`}>
					<CustomBurger foodType='vegetarian' />
				</Route>
				<Route path={`${route.path}/non-veg`} exact>
					<CustomBurger foodType='non-vegetarian' />
				</Route>
				<Redirect to={route.path} />
			</Switch>
		</div>
	);
};

export default CustomBurgerRoutes;
