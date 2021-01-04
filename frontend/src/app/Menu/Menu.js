import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CardMenu from '../Shared/Components/Card/CardMenu';

import ToggleSwitch from '../Shared/Components/Buttons/ToggleSwitch';

import LettuceIcon from './../../assets/icons/ingredients/lettuce.svg';
import SearchForm from '../Shared/Components/Form/SearchForm';

import * as burgerActions from './../store/actions/burgerActions';
import * as cartActions from './../store/actions/cartActions';
import { useHistory } from 'react-router-dom';
import Loader from '../Shared/Components/Loader/Loader';

const Menu = (props) => {
	const {
		burgers,
		getBurgers,
		getBurgersInit,
		addBurgerToCart,
		removeBurgerFromCart,
		cartValue,
		newBurgers,
		getNewBurgers,
	} = props;

	const history = useHistory();

	const [showVeg, setShowVeg] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		if (cartValue === 0 && burgers.length === 0 && searchValue.trim() === '') {
			getBurgers();
		}

		if (newBurgers.length === 0) {
			getNewBurgers();
		}
	}, [getBurgers, cartValue, burgers, getNewBurgers, newBurgers, searchValue]);

	const filterVegIngredients = () => {
		let filter;
		let showVegState = showVeg;

		if (!showVegState) {
			filter = { isVegetarian: true };
			setShowVeg(true);
		} else {
			setShowVeg(false);
		}

		getBurgers(filter);
	};

	const onSearchSubmit = (e) => {
		e.preventDefault();
		if (searchValue.trim() === '') return;

		let filter = { name: searchValue };

		if (showVeg) {
			filter['isVegetarian'] = true;
		}

		getBurgers(filter);
		setSearchValue('');
	};

	const resetForm = () => {
		getBurgers();
		setShowVeg(false);
		setSearchValue('');
	};

	return (
		<div className='menu'>
			<h3 className='menu__heading heading-1 u-text-primary'>Menu</h3>
			<div className='menu__subnav'>
				<div className='menu__subnav-veg-only'>
					<div className='menu__subnav-veg-only-text'>
						<img src={LettuceIcon} alt='veg only' />
						Vegetarian Only
					</div>

					<ToggleSwitch
						onToggle={filterVegIngredients}
						active={showVeg}
						className={`menu__subnav-veg-only`}
					/>
				</div>

				<SearchForm
					reset
					placeholder='Search by name....'
					onSubmit={onSearchSubmit}
					value={searchValue}
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					resetForm={resetForm}
				/>

				<button
					onClick={() => history.push('/make-my-burger')}
					type='button'
					className='btn u-text-primary menu__subnav-make-burger-cta btn__goto'>
					Click Here! To make your own burger
				</button>
			</div>

			<div className='menu__items'>
				{!getBurgersInit &&
					burgers.map((el) => {
						return (
							<CardMenu
								key={el.id}
								burger={el}
								addBurger={addBurgerToCart}
								removeBurger={removeBurgerFromCart}
							/>
						);
					})}

				{getBurgersInit && (
					<div style={{ height: '55rem' }}>
						<Loader />
					</div>
				)}

				{!getBurgersInit && burgers.length === 0 && (
					<div style={{ height: '55rem' }}>
						<h3 className='heading-2 u-text-danger'>
							No results for your search.
						</h3>
					</div>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		burgers: state.burgers.burgers,
		getNewBurgers: state.burgers.getNewBurgers,
		getBurgersInit: state.burgers.getBurgersInit,
		getBurgersError: state.burgers.getBurgersError,
		cartValue: state.cart.cartValue,
		newBurgers: state.burgers.newBurgers,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getBurgers: (filter) => dispatch(burgerActions.getBurgers(filter)),
		getNewBurgers: (filter) => dispatch(burgerActions.getNewBurgers(filter)),
		addBurgerToCart: (burger) => dispatch(cartActions.addBurgerToCart(burger)),
		removeBurgerFromCart: (burger) =>
			dispatch(cartActions.removeBurgerFromCart(burger)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
