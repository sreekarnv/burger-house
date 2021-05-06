import './gurantee.scss';

import * as React from 'react';

import CheckIcon from '../../shared/ui/icons/CheckIcon';

const Gurantee: React.FC<any> = ({ children }) => {
	return (
		<div className='gurantee'>
			<p className='gurantee__icon'>
				<CheckIcon className='u-text-success' />
			</p>
			<p className='gurantee__text'>{children}</p>
		</div>
	);
};

export default Gurantee;
