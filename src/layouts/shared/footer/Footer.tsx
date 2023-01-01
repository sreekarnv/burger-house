import React from 'react';
import classes from './footer.module.scss';

const Footer: React.FC = () => {
	return (
		<>
			<footer className={classes.root}>
				<p className={classes.text}>
					Copyright &copy; {new Date(Date.now()).getFullYear()} by Sreekar
					Venkata Nutulapati
				</p>
			</footer>
		</>
	);
};

export default Footer;
