import React from "react";
import { useSelector } from "react-redux";
import Backdrop from "../../../shared/components/Backdrop/Backdrop";
import Avatar from "../Avatar/Avatar";

import SidebarNavItem from "./SidebarNavItem";

const Sidebar = (props) => {
	const user = useSelector((state) => state.auth.user);
	const { showSidebar, setShowSidebar } = props;

	return (
		<>
			{showSidebar && (
				<Backdrop
					show={showSidebar}
					closeHandler={() => setShowSidebar(false)}
				/>
			)}
			<div className={`sidebar ${showSidebar && "sidebar--show"}`}>
				<Avatar user={user} />
				<nav className='sidebar__nav'>
					<SidebarNavItem onClick={() => setShowSidebar(false)} exact to='/'>
						My Account
					</SidebarNavItem>
					<SidebarNavItem to='/orders' onClick={() => setShowSidebar(false)}>
						My Orders
					</SidebarNavItem>
					<br />
					<br />
					{user && user.role === "admin" && (
						<SidebarNavItem
							onClick={() => setShowSidebar(false)}
							to='/manage-orders'>
							Manage Orders
						</SidebarNavItem>
					)}
					{user && user.role === "admin" && (
						<SidebarNavItem
							onClick={() => setShowSidebar(false)}
							to='/manage-menu'>
							Manage Menu
						</SidebarNavItem>
					)}
					{user && user.role === "admin" && (
						<SidebarNavItem
							onClick={() => setShowSidebar(false)}
							to='/manage-users'>
							Manage Users
						</SidebarNavItem>
					)}
				</nav>
			</div>
		</>
	);
};

export default Sidebar;
