import * as React from 'react';
import { NavLink } from 'react-router-dom';

// styles
import './footer.scss';

const Footer: React.FC = () => {
	return (
		<footer className='footer'>
			<ul className='footer__nav'>
				<NavLink to='/about' className='footer__nav-link'>
					About
				</NavLink>
			</ul>
			<p className='copyright u-text-center'>
				Copyright &copy; by Sreekar Venkata Nutulapati. All rights reserved.
			</p>
		</footer>
	);
};

export default Footer;
