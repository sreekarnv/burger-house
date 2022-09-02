import React from 'react';
import BurgerCard from '../../components/burger-card/BurgerCard';
import HomeGurantee from '../../components/home-gurantee/HomeGurantee';
import Seo from '../../components/shared/meta/Seo';
import Button from '../../components/shared/ui/button/Button';
import PageLoader from '../../components/shared/ui/loaders/PageLoader/PageLoader';
import useGetNewBurgers from '../../hooks/api/queries/burgers/useGetNewBurgers';

import './home.scss';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
	const { data, isLoading } = useGetNewBurgers();

	if (isLoading) {
		return <PageLoader variant='embed' />;
	}

	return (
		<>
			<Seo title='Burger House | Home' />
			<>
				<section className='home-hero'>
					<div className='home-hero-display--1'>
						<h1 className='heading-2 u-text-center u-fw-400 u-text-white u-text-capitalize'>
							We make burgers
						</h1>
						<Button isLink to='/menu' variant='tertiary' size='lg'>
							Order Now
						</Button>
					</div>
					<div className='home-hero-display--2'>
						<HomeGurantee>Fresh Ingredients Only</HomeGurantee>
						<HomeGurantee>Delivery Within 30 Mins</HomeGurantee>
						<HomeGurantee>Quality Guaranteed!</HomeGurantee>
					</div>
				</section>

				<section className='home-make-burger'>
					<h2 className='u-text-secondary heading-3'>
						Don't Like Our Menu? Then Make Your Own Burger!
					</h2>
					<Button isLink to='/menu/make-burger' variant='tertiary'>
						Make My Burger
					</Button>
				</section>

				<section className='home-popular-burgers'>
					<h1 className='u-text-primary u-text-center heading-1 u-text-uppercase'>
						newly added to menu
					</h1>
					<div className='home-popular-burgers__cards'>
						{data?.burgers?.map((burger) => {
							return <BurgerCard key={burger._id} burger={burger} />;
						})}
					</div>
				</section>
			</>
		</>
	);
};

export default HomePage;
