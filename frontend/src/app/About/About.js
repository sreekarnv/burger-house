import React from 'react';
import Logo from '../Shared/Icons/Logo';

import aboutImg from '../../assets/images/about-1.jpg';

import BurgerImage1 from '../../assets/images/gallery-1.jpg';
import BurgerImage2 from '../../assets/images/gallery-2.jpg';
import BurgerImage3 from '../../assets/images/gallery-3.jpg';

const About = () => {
	return (
		<div className='about'>
			<div className='about__container'>
				<img src={aboutImg} alt='about-img' className='about__bg' />
				<h2 className='about__heading'>About burger house</h2>
				<div className='about__card card__static'>
					<div className='card__static-brand'>
						<Logo />
						<h3 className='card__static-brand-name'>Burger house</h3>
					</div>
					<p className='card__static-para'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id
						hendrerit odio. Suspendisse lectus nisi, luctus ac varius vitae,
						lacinia ac felis. Nam pellentesque quam vel molestie viverra.
						Pellentesque fringilla arcu sapien. Aenean in pharetra urna, quis
						imperdiet dui. Sed feugiat odio eget velit lobortis congue. Ut et
						nulla diam. Sed mi felis, vestibulum id quam venenatis, iaculis
						accumsan ligula. Vestibulum ante ipsum primis in faucibus orci
						luctus et ultrices posuere cubilia curae; Pellentesque rhoncus magna
						a dignissim gravida. Aliquam scelerisque quam ex, vitae dignissim
						quam egestas et. Maecenas at felis aliquam, dignissim massa id,
						vestibulum tellus. Cras lacinia dui leo, ut luctus sem porttitor
						vel. Sed sollicitudin sed mauris a commodo. Aliquam a enim
						dignissim, posuere enim ac, facilisis mauris.
					</p>
				</div>
				<div className='about__gallery gallery'>
					<img
						className='gallery__img gallery__img-1'
						src={BurgerImage1}
						alt='burger-1'
					/>
					<img
						className='gallery__img gallery__img-2'
						src={BurgerImage2}
						alt='burger-2'
					/>
					<img
						className='gallery__img gallery__img-3'
						src={BurgerImage3}
						alt='burger-3'
					/>
				</div>
			</div>
		</div>
	);
};

export default About;
