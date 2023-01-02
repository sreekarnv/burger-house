import clsx from 'clsx';
import { NextPage } from 'next';
import MenuNavCard from '../../../components/menu-nav-card';
import Heading from '../../../components/shared/heading';
import classes from './diet-choice.module.scss';

const DietChoice: NextPage = () => {
	return (
		<>
			<div className={classes.root}>
				<Heading
					variant='h2'
					className={clsx(['u-text-capitalize', classes.heading])}
					color='primary'>
					Choose your diet
				</Heading>
				<div className={classes.nav}>
					<MenuNavCard to={`/menu/make-burger/vegetarian`} veg />
					<MenuNavCard to={`/menu/make-burger/non-vegetarian`} />
				</div>
			</div>
		</>
	);
};

export default DietChoice;
