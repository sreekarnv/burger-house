import React from 'react';
import Badge from '../Badge/Badge';
import { NavLink } from 'react-router-dom';

const navItem = (props) => {
    let badge;
    let badgeDisplay = props.badge === true ? props.badge : null;
    if (badgeDisplay) badge = <Badge badgeVal={props.badgeVal} />
    else badge = null;

    let activeNavitemClass = null;
    if (props.active && props.classNavItemActive) {
        activeNavitemClass = props.classNavItemActive;
    }

    return (
        <NavLink
            exact={props.exact ? true : false}
            onClick={props.closeSidebar}
            activeClassName={props.active} to={{ pathname: props.path }} className={props.classNavLink} >
            <li className={`${props.classNavItem} ${activeNavitemClass}`} >
                {badge}
                {props.children}
            </li>
        </NavLink >
    )
}


export default navItem; 