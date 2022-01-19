import React from 'react';
import './footer.scss';

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
	return (
		<>
			<div className='footer'>
				<p className='footer__text'>
					Copyright &copy; {new Date(Date.now()).getFullYear()} by Sreekar
					Venkata Nutulapati
				</p>
			</div>
		</>
	);
};

export default Footer;
