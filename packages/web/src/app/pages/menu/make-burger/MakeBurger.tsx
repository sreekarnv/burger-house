import './make-burger.scss';

import * as React from 'react';
import { useDispatch } from 'react-redux';
import Burger from '../../../components/burger/Burger';
import Button from '../../../components/shared/ui/button/Button';
import useGetIngredients from '../../../hooks/api/queries/ingredients/useGetIngredients';
import { useAppSelector } from '../../../store/hooks';
import IngredientControls from '../../../components/ingredient-controls/IngredientControls';
import { useParams } from 'react-router-dom';
import { resetIngredients } from '../../../store/modules/customBurger';
import { addBurgerToCart } from '../../../store/modules/cart';
import useAlert from '../../../hooks/helpers/useAlert';
import Alert from '../../../components/shared/ui/alert/Alert';
import PageLoader from '../../../components/shared/ui/loaders/PageLoader/PageLoader';
import Seo from '../../../components/shared/meta/Seo';

const MakeBurger: React.FC = () => {
	const dispatch = useDispatch();
	const params = useParams<{ foodType: 'vegetarian' | 'non-vegetarian' }>();

	const { isLoading } = useGetIngredients();
	const { alertMessage, alertType, setAlert, showAlert } = useAlert();

	const displayIngredients = useAppSelector(
		(state) => state.customBurger.displayIngredients
	);
	const ingredients = useAppSelector((state) => state.customBurger.ingredients);

	const burgerPrice = useAppSelector((state) => state.customBurger.burgerPrice);

	const onResetIngredients = () => {
		dispatch(resetIngredients({}));
		setAlert('danger', 'You reset all ingredients');
	};

	// Add burger to cart
	const addToCart = async () => {
		let id = '';

		let cartIngredients: any = [...ingredients];

		ingredients.forEach((ingredient: any) => {
			if (ingredient.amount !== 0)
				id += `${ingredient.name}-${ingredient.amount}-`;
		});

		// adding an items fiingredientd
		cartIngredients.forEach((ingredient: any) => {
			ingredient = { ...ingredient, items: ingredient.amount };
		});

		let burger = {
			name: 'Custom Burger',
			price: burgerPrice,
			_id: id,
			ingredients,
			isVegetarian: params.foodType === 'vegetarian' ? true : false,
		};

		dispatch(addBurgerToCart({ burger }));
		setAlert('success', 'Added burger to cart');
	};

	if (isLoading) {
		return <PageLoader variant='embed' />;
	}

	return (
		<>
			{showAlert && (
				<Alert type={alertType} position='bottom-right'>
					{alertMessage}
				</Alert>
			)}
			<Seo title='Burger House | Menu | Make Your Burger' />
			<div className='make-burger'>
				<Burger ingredients={displayIngredients} />
				<IngredientControls type={params.foodType} ingredients={ingredients} />
				<div className='make-burger-cta'>
					<h3 className='make-burger-cta-price u-text-uppercase u-text-center u-text-tertiary u-mb-8'>
						Burger Price: Rs {burgerPrice}
					</h3>
					<div className='make-burger-cta-btns'>
						<Button
							variant='dark-outline'
							disabled={burgerPrice > 350 ? false : true}
							onClick={onResetIngredients}
							type='reset'>
							Reset
						</Button>
						<Button
							onClick={addToCart}
							disabled={burgerPrice > 350 ? false : true}
							type='submit'
							variant='success-outline'>
							Add to Cart
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default MakeBurger;
