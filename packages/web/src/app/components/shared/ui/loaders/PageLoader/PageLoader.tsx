import clsx from 'clsx';
import React from 'react';
import Logo from '../../logo/Logo';
import Loader from '../default/loader';
import './page-loader.scss';

const variants = {
	full: 'page-loader--full',
	embed: 'page-loader--embed',
};

interface PageLoaderProps {
	variant?: keyof typeof variants;
}

const PageLoader: React.FC<PageLoaderProps> = ({ variant = 'full' }) => {
	return (
		<>
			<div className={clsx('page-loader', variants[variant])}>
				<Logo size='lg' />
				<div className='u-text-center u-mt-10'>
					<Loader />
				</div>
			</div>
		</>
	);
};

export default PageLoader;
