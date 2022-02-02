import React from 'react';
import { Outlet } from 'react-router-dom';
import PageLoader from '../components/shared/ui/loaders/PageLoader/PageLoader';

interface SuspenseLayoutProps {
	pageLoaderVariant?: 'full' | 'embed';
}

const SuspenseLayout: React.FC<SuspenseLayoutProps> = ({
	pageLoaderVariant = 'full',
}) => {
	return (
		<>
			<React.Suspense fallback={<PageLoader variant={pageLoaderVariant} />}>
				<Outlet />
			</React.Suspense>
		</>
	);
};

export default SuspenseLayout;
