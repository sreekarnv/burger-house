import './navigation.scss';

import * as React from 'react';

import { Link, useLocation } from 'react-router-dom';

import CrossIcon from '~app/components/shared/ui/icons/CrossIcon';
import Logo from '../../components/shared/ui/logo/Logo';
import MenuIcon from '~app/components/shared/ui/icons/MenuIcon';
import NavItem from './NavItem';
import NavMobile from './NavMobile';
import { ReduxState } from '~@types/store';
import useDisclosure from '~app/hooks/useDisclosure';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';

const Navigation: React.FC = () => {
	const cartItems = useSelector((state: ReduxState) => state.cart.cartValue);
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData('user');
	const location = useLocation();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<header className='navigation'>
			<Link to='/' className='navigation__brand u-text-dark'>
				<Logo />
				Burger House
			</Link>
			{location.pathname !== '/error' && (
				<>
					<nav className='navigation__nav'>
						<NavItem to='/' exact>
							Home
						</NavItem>
						<NavItem to='/menu'>Menu</NavItem>
						{!user && (
							<>
								<NavItem to='/auth/login' exact>
									Login
								</NavItem>
								<NavItem to='/auth/register' exact>
									Register
								</NavItem>
							</>
						)}
						{user && <NavItem to='/dashboard'>Dashboard</NavItem>}
						<NavItem showBadge badgeValue={cartItems} to='/cart' exact>
							Cart
						</NavItem>
						{user && (
							<NavItem logout to='/auth/logout' exact>
								Logout
							</NavItem>
						)}
					</nav>

					{!isOpen ? (
						<span className='navigation__toggle'>
							<MenuIcon onClick={onOpen} className='u-text-dark' />
						</span>
					) : (
						<span className='navigation__toggle'>
							<CrossIcon onClick={onClose} className=' u-text-dark' />
						</span>
					)}

					<NavMobile closeNav={onClose} showMobileNav={isOpen} />
				</>
			)}
		</header>
	);
};

export default Navigation;
