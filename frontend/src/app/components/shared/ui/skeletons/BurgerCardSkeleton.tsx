import * as React from 'react';

import BaseSkeleton from './BaseSkeleton';

const BurgerCardSkeleton: React.FC = () => {
	return (
		<div className='u-p-6'>
			<BaseSkeleton className='u-mb-5' type='image' />
			<BaseSkeleton className='u-text-center u-mb-10' type='title' />
			<BaseSkeleton />
			<BaseSkeleton />
		</div>
	);
};

export default BurgerCardSkeleton;
