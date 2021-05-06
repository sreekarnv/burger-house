import './make-burger.scss';

import * as React from 'react';
import * as cartActions from '~app/store/actions/cartActions';
import * as customBurgerActions from '~app/store/actions/customBurgerActions';

import { useDispatch, useSelector } from 'react-redux';

import Alert from '~app/components/shared/ui/alert/Alert';
import Burger from '~app/components/shared/Burger/Burger';
import Button from '~app/components/shared/ui/button/Button';
import { Ingredient } from '~@types/ingredient';
import IngredientControls from '~app/components/shared/IngredientControls/IngredientControls';
import Loader from '~app/components/shared/ui/loader/loader';
import { ReduxState } from '~@types/store';
import useAlert from '~app/hooks/useAlert';
import useIngredientsQuery from '~app/hooks/api/queries/useIngredientsQuery';
import { useRouteMatch } from 'react-router';

const MakeBurger: React.FC = () => {
	const dispatch = useDispatch();
	const { isLoading } = useIngredientsQuery({});
	const route = useRouteMatch<{ foodType: 'vegetarian' | 'non-vegetarian' }>();
	const { alertMessage, alertType, setAlert, showAlert } = useAlert();

	const burgerPrice = useSelector(
		(state: ReduxState) => state.customBurger.burgerPrice
	);

	const displayIngredients = useSelector(
		(state: ReduxState) => state.customBurger.displayIngredients
	);

	const customBurgerIngredients = useSelector(
		(state: ReduxState) => state.customBurger.ingredients
	);

	const resetIngredients = () => {
		dispatch(customBurgerActions.resetIngredients());
		setAlert('danger', 'You reset all ingredients');
	};

	// Add burger to cart
	const addToCart = async () => {
		let id = '';
		const ingredients = [...customBurgerIngredients];

		customBurgerIngredients.forEach((ingredient: Ingredient) => {
			if (ingredient.amount !== 0)
				id += `${ingredient.name}-${ingredient.amount}-`;
		});

		// adding an items fiingredientd
		ingredients.forEach((ingredient) => {
			ingredient['items'] = ingredient.amount;
		});

		let burger = {
			name: 'Custom Burger',
			price: burgerPrice,
			id,
			ingredients,
			isVegetarian: route.params.foodType === 'vegetarian' ? true : false,
		};

		dispatch(cartActions.addBurgerToCart(burger));
		setAlert('success', 'Added burger to cart');
	};

	if (isLoading) {
		return <Loader fullScreen />;
	}

	return (
		<>
			{showAlert && <Alert type={alertType}>{alertMessage}</Alert>}
			<div className='make-burger'>
				<Burger ingredients={displayIngredients} />
				<IngredientControls
					type={route.params.foodType}
					ingredients={customBurgerIngredients}
				/>
				<div className='make-burger-cta'>
					<h3 className='make-burger-cta-price u-text-uppercase u-text-center u-text-tertiary u-mb-8'>
						Burger Price: Rs {burgerPrice}
					</h3>
					<div className='make-burger-cta-btns'>
						<Button
							variant={'outlined'}
							color='dark'
							disabled={burgerPrice > 250 ? false : true}
							onClick={resetIngredients}
							type='reset'>
							Reset
						</Button>
						<Button
							onClick={addToCart}
							disabled={burgerPrice > 250 ? false : true}
							type='submit'
							color='success'
							variant='outlined'>
							Add to Cart
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default MakeBurger;
