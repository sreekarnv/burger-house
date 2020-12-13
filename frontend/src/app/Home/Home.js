import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import HeroFeatures from "./components/HeroFeatures";

import CardMenu from "./../shared/components/Card/CardMenu";
import Review from "./components/Review";

import * as burgerActions from "./../store/actions/burgerActions";

import * as cartActions from "./../store/actions/cartActions";

const Home = (props) => {
	const {
		reviews,
		getNewBurgers,
		newBurgers,
		addBurgerToCart,
		removeBurgerFromCart,
		cartValue,
	} = props;
	const history = useHistory();

	useEffect(() => {
		if (cartValue === 0 || !newBurgers.length) {
			getNewBurgers();
		}
	}, [getNewBurgers, cartValue, newBurgers]);

	return (
		<div className='home'>
			<div className='home__header'>
				<div className='home__header-display'>
					<h3 className='heading-1 u-text-capitalize u-text-light u-ftwt-400'>
						We make Burgers
					</h3>
					<button
						onClick={() => history.push("/menu")}
						className='btn btn__tertiary'>
						Order Now
					</button>
				</div>
				<div className='home__header-features'>
					<HeroFeatures para='Fresh Ingredients only' pk='1' />
					<HeroFeatures para='Delivery within 30 mins' pk='2' />
					<HeroFeatures para='Quality Guaranteed!' pk='3' />
				</div>
			</div>

			<div className='home__make-your-burger'>
				<h3 className='heading-2 u-text-capitalize u-text-secondary'>
					Don't like our menu? Then make your own burger!
				</h3>
				<button
					onClick={() => history.push("/make-my-burger")}
					className='btn btn__tertiary'>
					Make My Burger
				</button>
			</div>

			<div className='home__newly-added'>
				<h1 className='heading-1 u-text-uppercase u-text-primary'>
					Newly Added to menu
				</h1>
				<div className='home__newly-added-burgers'>
					{newBurgers.map((burger) => {
						return (
							<CardMenu
								addBurger={addBurgerToCart}
								removeBurger={removeBurgerFromCart}
								key={burger._id}
								burger={burger}
							/>
						);
					})}
				</div>
			</div>

			<div className='home__user-reviews'>
				<h2 className='heading-1 reviews__heading u-text-uppercase'>
					We make people happy
				</h2>
				<div className='reviews'>
					{Object.keys(reviews).map((el) => {
						return (
							<Review
								key={el}
								name={el}
								img={reviews[el].img}
								rating={reviews[el].rating}
								comment={reviews[el].comment}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		reviews: state.reviews.reviews,
		newBurgers: state.burgers.newBurgers,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getNewBurgers: () => dispatch(burgerActions.getNewBurgers()),
		addBurgerToCart: (burger) => dispatch(cartActions.addBurgerToCart(burger)),
		removeBurgerFromCart: (burger) =>
			dispatch(cartActions.removeBurgerFromCart(burger)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
