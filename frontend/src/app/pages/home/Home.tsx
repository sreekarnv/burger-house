import * as React from 'react';
import { useHistory } from 'react-router';

// components
import Gurantee from '~app/components/home/Gurantee/Gurantee';
import Button from '~app/components/shared/ui/button/Button';
import BurgerCard from '~/app/components/shared/BurgerCard/BurgerCard';
import BurgerCardSkeleton from '~app/components/shared/ui/skeletons/BurgerCardSkeleton';

// hooks
import useBurgersQuery from '~app/hooks/api/queries/useBurgersQuery';
import useNewBurgersQuery from '~app/hooks/api/queries/useNewBurgersQuery';

// styles
import './home.scss';

const Home: React.FC = () => {
	const { push } = useHistory();

	const { isLoading: isBurgersLoading } = useBurgersQuery({});
	const {
		isLoading: isNewBurgersLoading,
		data: newBurgers,
	} = useNewBurgersQuery({});

	return (
		<>
			<section className='home-hero'>
				<div className='home-hero-display--1'>
					<h1 className='heading-2 u-text-center u-ftwt-400 u-text-white u-text-capitalize'>
						We make burgers
					</h1>
					<Button onClick={() => push('/menu')} color='tertiary' size='lg'>
						Order Now
					</Button>
				</div>
				<div className='home-hero-display--2'>
					<Gurantee>Fresh Ingredients Only</Gurantee>
					<Gurantee>Delivery Within 30 Mins</Gurantee>
					<Gurantee>Quality Guaranteed!</Gurantee>
				</div>
			</section>

			<section className='home-make-burger'>
				<h3 className='u-text-secondary heading-3'>
					Don't Like Our Menu? Then Make Your Own Burger!
				</h3>
				<Button onClick={() => push('/menu/make-my-burger')} color='tertiary'>
					Make My Burger
				</Button>
			</section>

			<section className='home-popular-burgers'>
				<h1 className='u-text-primary u-text-center heading-1 u-text-uppercase'>
					newly added to menu
				</h1>
				<div className='home-popular-burgers__cards'>
					{isBurgersLoading ||
						(isNewBurgersLoading &&
							Array(3)
								.fill(0)
								.map((_, i) => {
									return <BurgerCardSkeleton key={i} />;
								}))}
					{newBurgers?.map((burger: any) => {
						return <BurgerCard key={burger._id} {...{ burger }} />;
					})}
				</div>
			</section>
		</>
	);
};

export default Home;
