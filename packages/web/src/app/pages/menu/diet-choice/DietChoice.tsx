import * as React from 'react';
import Seo from '../../../components/shared/meta/Seo';
import MenuNavCard from './../../../components/menu-nav-card/MenuNavCard';

// styles
import './diet-choice.scss';

const DietChoice: React.FC = () => {
	return (
		<>
			<Seo title='Burger House | Menu | Make Your Burger' />
			<div className='diet-choice'>
				<h4 className='u-text-primary u-text-center heading-2 u-text-capitalize'>
					Choose your diet
				</h4>
				<div className='diet-choice__card-container'>
					<MenuNavCard to={`/menu/make-burger/vegetarian`} veg />
					<MenuNavCard to={`/menu/make-burger/non-vegetarian`} />
				</div>
			</div>
		</>
	);
};

export default DietChoice;
