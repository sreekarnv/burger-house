import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const DashboardIndexPage: NextPage = ({}) => {
	const router = useRouter();

	React.useEffect(() => {
		router.replace('/dashboard/orders');
	}, [router]);

	return <></>;
};

export default DashboardIndexPage;
