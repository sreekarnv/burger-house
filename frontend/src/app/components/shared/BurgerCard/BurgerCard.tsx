import './burger-card.scss';

import * as React from 'react';
import * as cartActions from 'src/app/store/actions/cartActions';

import { Burger, BurgerIngredient } from 'src/@types/burger';

import AddRemoveBtn from 'src/app/components/shared/ui/add-remove-btn/AddRemoveBtn';
import Alert from 'src/app/components/shared/ui/alert/Alert';
import Badge from 'src/app/components/shared/ui/badge/Badge';
import Button from 'src/app/components/shared/ui/button/Button';
import { motion } from 'framer-motion';
import useAlert from 'src/app/hooks/useAlert';
import { useDispatch } from 'react-redux';
import useDynamicImage from 'src/app/hooks/useDynamicImage';
import Logo from 'src/app/components/shared/ui/logo/Logo';

interface Props {
	burger: Burger;
}

const BurgerCard: React.FC<Props> = ({ burger }) => {
	const dispatch = useDispatch();
	const { showAlert, setAlert, alertMessage, alertType } = useAlert();
	const { imageRef, isLoading } = useDynamicImage(
		process.env.REACT_APP_SERVER_URL! + burger.photoUrl
	);

	return (
		<>
			{showAlert && <Alert type={alertType}>{alertMessage}</Alert>}
			<motion.div initial={false} layout className='burger-card'>
				<div className='burger-card__img-wrapper'>
					{isLoading ? (
						<div className='u-text-center'>
							<Logo className='burger-card__img-placeholder' />
						</div>
					) : (
						<img
							ref={imageRef}
							alt={burger.name}
							className='burger-card__img'
						/>
					)}

					<Badge size='md' color={burger.isVegetarian ? 'success' : 'danger'}>
						{burger.isVegetarian ? 'VEG' : 'N-VEG'}
					</Badge>
				</div>
				<h5 className='u-text-tertiary u-text-uppercase u-text-center burger-card__title'>
					{burger.name}
				</h5>
				<ul className='burger-card__ingredients'>
					{burger.ingredients.map(
						({ ingredient, amount }: BurgerIngredient) => (
							<li key={ingredient._id} className='burger-card__ingredient'>
								<div>
									<span>{ingredient.name}</span>&nbsp;
									<span>({amount})</span>
								</div>
							</li>
						)
					)}
				</ul>

				<div className='burger-card__cta'>
					{burger.itemsInCart === 0 ? (
						<Button
							onClick={() => {
								dispatch(cartActions.addBurgerToCart(burger));
								setAlert('success', 'burger added to cart');
							}}
							size='sm'
							variant='outlined'
							className='u-text-uppercase'>
							Add To Cart
						</Button>
					) : (
						<div>
							<AddRemoveBtn
								leftOnClick={() => {
									dispatch(cartActions.addBurgerToCart(burger));
									setAlert('success', 'burger added to cart');
								}}
								rightOnClick={() => {
									dispatch(cartActions.removeBurgerFromCart(burger));
									setAlert('danger', 'burger removed cart');
								}}>
								{burger.itemsInCart}
							</AddRemoveBtn>
						</div>
					)}
					<h6 className='u-text-tertiary burger-card__price'>
						Rs {burger.price}
					</h6>
				</div>
			</motion.div>
		</>
	);
};

export default BurgerCard;
