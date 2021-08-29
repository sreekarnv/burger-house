import * as React from 'react';
import { useQueryClient } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';
import { User } from 'src/@types/user';
import Button from 'src/app/components/shared/ui/button/Button';

import './error.scss';

interface Props {}

const Error: React.FC = () => {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user')!;
	const location = useLocation<{ message: string }>();
	const { replace } = useHistory();

	return (
		<div className='error'>
			<div className='error__message u-mb-10'>
				<h1 className='heading-2 u-text-white u-mb-6'>Oops...</h1>
				<h5 className='heading-1 u-text-capitalize u-text-white u-mb-20'>
					{location?.state?.message || 'Something Went Wrong'}
				</h5>
				<Button
					onClick={() => {
						if (user) {
							if (user.role === 'admin') {
								replace('/dashboard/admin/orders');
							} else {
								replace('/dashboard/me/orders');
							}
						} else {
							replace('/auth/login');
						}
					}}
					color='tertiary'>
					Go Back
				</Button>
			</div>
		</div>
	);
};

export default Error;
