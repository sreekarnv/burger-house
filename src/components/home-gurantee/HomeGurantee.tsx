import classes from './home-gurantee.module.scss';
import * as React from 'react';
import { FiCheck } from 'react-icons/fi';

const Gurantee: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<div className={classes.root}>
			<span>
				<FiCheck size={20} className='u-text-success' />
			</span>
			<p className={classes.text}>{children}</p>
		</div>
	);
};

export default Gurantee;
