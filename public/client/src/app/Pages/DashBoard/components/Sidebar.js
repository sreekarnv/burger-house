import React, { Component } from 'react';
import Navbar from '../../../Shared/Components/Navigation/Navbar';
import NavItem from '../../../Shared/Components/Navigation/NavItem';

import Logo from '../../../Shared/Icons/Logo';

class Sidebar extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar classNav="sidebar__nav">
                    <div className="sidebar__brand">
                        <Logo />
                        <h2 className="sidebar__brand-name">Burger House</h2>
                    </div>
                    <NavItem
                        closeSidebar={this.props.closeSidebar}
                        active="sidebar__nav-link--active"
                        classNavItemActive="sidebar__nav-item--active"
                        classNavItem={`sidebar__nav-item`} classNavLink="sidebar__nav-link"
                        path={`${this.props.match.url}/my-orders`}>My Orders</NavItem>

                    <NavItem active="sidebar__nav-link--active"
                        closeSidebar={this.props.closeSidebar}
                        classNavItemActive="sidebar__nav-item--active"
                        classNavItem="sidebar__nav-item" classNavLink="sidebar__nav-link"
                        path={`${this.props.match.url}/manage-profile`}>Settings</NavItem>

                    {this.props.user.role === 'admin' && <NavItem active="sidebar__nav-link--active"
                        closeSidebar={this.props.closeSidebar}
                        classNavItemActive="sidebar__nav-item--active"
                        classNavItem="sidebar__nav-item" classNavLink="sidebar__nav-link"
                        path={`${this.props.match.url}/manage-users`}>Manage Users</NavItem>}

                    {this.props.user.role === 'admin' && <NavItem active="sidebar__nav-link--active"
                        closeSidebar={this.props.closeSidebar}
                        classNavItemActive="sidebar__nav-item--active"
                        classNavItem="sidebar__nav-item" classNavLink="sidebar__nav-link"
                        path={`${this.props.match.url}/manage-menu`}>Manage Menu</NavItem>}

                    {this.props.user.role === 'admin' && <NavItem
                        isActive
                        active="sidebar__nav-link--active"
                        closeSidebar={this.props.closeSidebar}
                        classNavItemActive="sidebar__nav-item--active"
                        classNavItem="sidebar__nav-item" classNavLink="sidebar__nav-link"
                        path={`${this.props.match.url}/manage-orders`}>Manage Orders</NavItem>}

                    {this.props.user.role === 'admin' && <NavItem
                        isActive
                        active="sidebar__nav-link--active"
                        closeSidebar={this.props.closeSidebar}
                        classNavItemActive="sidebar__nav-item--active"
                        classNavItem="sidebar__nav-item" classNavLink="sidebar__nav-link"
                        path={`${this.props.match.url}/manage-ingredients`}>Manage Ingredients</NavItem>}

                </Navbar>
            </React.Fragment >
        )
    }
}

export default Sidebar;