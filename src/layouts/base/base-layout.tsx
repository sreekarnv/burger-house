import React from 'react';
import Footer from '../shared/footer';
import Navbar from '../shared/navbar';

interface BaseLayoutProps extends React.PropsWithChildren {}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
	return (
		<>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</>
	);
};

export default BaseLayout;
