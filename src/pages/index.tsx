import classes from './home.module.scss';
import BurgerCard from '../components/burger-card';
import HomeGurantee from '../components/home-gurantee';
import Button from '../components/shared/button';
import { trpc } from '../utils/trpc';
import Heading from '../components/shared/heading';
import clsx from 'clsx';
import BurgerCardSkeleton from '../components/burger-card/BurgerCardSkeleton';
import { NextPageWithLayout } from './_app';
import BaseLayout from '../layouts/base-layout';

const IndexPage: NextPageWithLayout = ({}) => {
	const { data, isLoading } = trpc.burger.all.useQuery({ limit: 3 });

	return (
		<>
			<section className={classes.hero}>
				<div className={classes['hero-display--1']}>
					<Heading color='white' className='u-fw-400 u-text-capitalize'>
						We make burgers
					</Heading>
					<Button isLink href='/menu' variant='tertiary' size='lg'>
						Order Now
					</Button>
				</div>
				<div className={classes['hero-display--2']}>
					<HomeGurantee>Fresh Ingredients Only</HomeGurantee>
					<HomeGurantee>Delivery Within 30 Mins</HomeGurantee>
					<HomeGurantee>Quality Guaranteed!</HomeGurantee>
				</div>
			</section>

			<section className={classes['make-burger']}>
				<Heading variant='h3' color='secondary'>
					Don&apos;t Like Our Menu? Then Make Your Own Burger!
				</Heading>
				<Button isLink href='/menu/make-burger' variant='tertiary'>
					Make My Burger
				</Button>
			</section>

			<section className={classes['popular-burgers']}>
				<Heading
					variant='h1'
					color='primary'
					className={clsx(
						classes['popular-burgers__heading'],
						'u-text-uppercase'
					)}>
					newly added to menu
				</Heading>
				<div className={classes['popular-burgers__cards']}>
					{!isLoading &&
						data?.burgers?.map((burger) => {
							return <BurgerCard key={burger._id} burger={burger} />;
						})}
					{isLoading &&
						Array(3)
							.fill(0)
							.map((_, i) => <BurgerCardSkeleton key={i} />)}
				</div>
			</section>
		</>
	);
};

IndexPage.getLayout = (page) => {
	return <BaseLayout>{page}</BaseLayout>;
};

export default IndexPage;
