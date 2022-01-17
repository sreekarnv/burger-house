import './home-gurantee.scss';
import * as React from 'react';
import { FiCheck } from 'react-icons/fi';

const Gurantee: React.FC<any> = ({ children }) => {
	return (
		<div className='gurantee'>
			<p className='gurantee__icon'>
				<FiCheck size={20} className='u-text-success' />
			</p>
			<p className='gurantee__text'>{children}</p>
		</div>
	);
};

export default Gurantee;
