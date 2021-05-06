import * as React from 'react';
import { useRouteMatch } from 'react-router';

// components
import DietCard from '~app/components/custom-burger/DietCard/DietCard';

// styles
import './diet-choice.scss';

const DietChoice: React.FC = () => {
	const route = useRouteMatch();

	return (
		<div className='diet-choice'>
			<h4 className='u-text-primary u-text-center heading-2 u-text-capitalize'>
				Choose your diet
			</h4>
			<div className='diet-choice__card-container'>
				<DietCard to={`${route.path}/vegetarian`} veg />
				<DietCard to={`${route.path}/non-vegetarian`} />
			</div>
		</div>
	);
};

export default DietChoice;
