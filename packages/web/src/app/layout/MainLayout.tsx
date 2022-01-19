import React from 'react';
import Navbar from './Navigation/Navbar/Navbar';
import PageFade from '../animations/PageFade';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Navigation/Footer/Footer';

interface MainLayoutProps {}

const MainLayout: React.FC<MainLayoutProps> = () => {
	const location = useLocation();

	return (
		<>
			<Navbar />
			<PageFade key={location.key}>
				<main>
					<Outlet />
				</main>
			</PageFade>
			<Footer />
		</>
	);
};

export default MainLayout;
