import clsx from 'clsx';
import MenuNavCard from '../../../components/menu-nav-card';
import Heading from '../../../components/shared/heading';
import BaseLayout from '../../../layouts/base-layout';
import { NextPageWithLayout } from '../../_app';
import classes from './diet-choice.module.scss';

const DietChoice: NextPageWithLayout = () => {
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

DietChoice.getLayout = (page) => {
	return <BaseLayout>{page}</BaseLayout>;
};

export default DietChoice;
