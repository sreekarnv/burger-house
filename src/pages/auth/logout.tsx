import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { trpc } from '../../utils/trpc';

const LogoutPage: NextPage = ({}) => {
	const router = useRouter();
	const context = trpc.useContext();
	const { mutate } = trpc.auth.logout.useMutation({
		onSuccess() {
			context.auth.user.setData(undefined, null);
			router.replace('/');
		},
	});

	React.useEffect(() => mutate(), [mutate]);

	return (
		<>
			<div>
				<h1>Loading....</h1>
			</div>
		</>
	);
};

export default LogoutPage;
