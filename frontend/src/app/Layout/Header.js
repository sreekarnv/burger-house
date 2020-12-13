import React from "react";

import { useSelector } from "react-redux";
import Logo from "../shared/icons/Logo";
import Navbar from "../shared/components/Navigation/Navbar";
import NavItem from "../shared/components/Navigation/NavItem";
import { Link } from "react-router-dom";

const Header = (props) => {
	const cart = useSelector((state) => state.cart.cartValue);
	const user = useSelector((state) => state.auth.user);

	return (
		<header className='header'>
			<Link className='header__brand' to='/'>
				<Logo className='header__logo' />
				<h1 className='header__brand-name'>Burger house</h1>
			</Link>

			<Navbar classNav='header__nav'>
				<NavItem
					active='header__nav-link--active'
					exact
					classNavItem='header__nav-item'
					classNavLink='header__nav-link'
					path='/'>
					Home
				</NavItem>

				<NavItem
					active='header__nav-link--active'
					classNavItem='header__nav-item'
					classNavLink='header__nav-link'
					path='/menu'>
					Menu
				</NavItem>
				{/* <NavItem active="header__nav-link--active" classNavItem="header__nav-item" classNavLink="header__nav-link" path="/confirm-email" >Menu</NavItem> */}

				{user && (
					<NavItem
						active='header__nav-link--active'
						classNavItem='header__nav-item'
						classNavLink='header__nav-link'
						path={`/dashboard`}>
						Dashboard
					</NavItem>
				)}

				{!user && (
					<NavItem
						active='header__nav-link--active'
						classNavItem='header__nav-item'
						classNavLink='header__nav-link'
						path='/login'>
						Login
					</NavItem>
				)}

				{!user && (
					<NavItem
						active='header__nav-link--active'
						classNavItem='header__nav-item'
						classNavLink='header__nav-link'
						path='/register'>
						Register
					</NavItem>
				)}

				<NavItem
					active='header__nav-link--active'
					classNavItem='header__nav-item'
					classNavLink='header__nav-link'
					badge
					path='/cart'
					badgeVal={cart || 0}>
					Cart
				</NavItem>

				{user && (
					<Link to='/logout' className='btn btn__logout '>
						Logout
					</Link>
				)}
			</Navbar>
		</header>
	);
};

export default Header;
