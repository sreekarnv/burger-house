import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import { HiMenu } from 'react-icons/hi';

import './index.scss';
import Navbar from '../Navigation/Navbar/Navbar';
import useDisclosure from '../../hooks/helpers/useDisclosure';
import Backdrop from '../../components/shared/ui/backdrop/Backdrop';
import clsx from 'clsx';
import Seo from '../../components/shared/meta/Seo';
import PageLoader from '../../components/shared/ui/loaders/PageLoader/PageLoader';

interface DashboardLayoutProps {}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Seo title='Burger House | Dashboard' />
			<Navbar />

			<Backdrop show={isOpen} onClose={onClose} />
			<Sidebar
				onClose={onClose}
				className={clsx([
					'dashboard__sidebar__mobile',
					isOpen && 'dashboard__sidebar__mobile--show',
				])}
			/>

			<div className='dashboard'>
				<button
					onClick={() => onOpen()}
					className='dashboard__sidebar__toggler'>
					<HiMenu size={24} />
				</button>
				<div className='dashboard__sidebar'>
					<Sidebar />
				</div>
				<React.Suspense fallback={<PageLoader variant='full' />}>
					<main className='dashboard__content'>
						<Outlet />
					</main>
				</React.Suspense>
			</div>
		</>
	);
};

export default DashboardLayout;
