import React from 'react';
import { trpc } from '../../../utils/trpc';

const Navbar: React.FC = () => {
	const { data } = trpc.auth.user.useQuery();

	return (
		<>
			<nav style={{ fontSize: '2rem' }}>
				{data ? 'Logged In' : 'Logged Out'}
			</nav>
		</>
	);
};

export default Navbar;
