import classes from './home-gurantee.module.scss';
import * as React from 'react';
import { HiCheckCircle } from 'react-icons/hi';

const Gurantee: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<div className={classes.root}>
			<HiCheckCircle size={20} />
			<p className={classes.text}>{children}</p>
		</div>
	);
};

export default Gurantee;
