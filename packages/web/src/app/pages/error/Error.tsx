import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Seo from '../../components/shared/meta/Seo';
import Button from '../../components/shared/ui/button/Button';

import './error.scss';

const ErrorPage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<>
			<Seo title='Burger House | Something Went Wrong' />
			<div className='error'>
				<div className='error__message u-mb-10'>
					<h1 className='heading-2 u-text-white u-mb-6'>Oops...</h1>
					<h5 className='u-text-center heading-1 u-text-capitalize u-text-white u-mb-20'>
						Page Not Found: 404
					</h5>
					<Button
						onClick={() => {
							navigate('/', { replace: true });
						}}
						color='tertiary'>
						Back to Home
					</Button>
				</div>
			</div>
		</>
	);
};

export default ErrorPage;
