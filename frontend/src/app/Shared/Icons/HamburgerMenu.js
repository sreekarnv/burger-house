import React from 'react';
import { ReactComponent as Menu } from '../../../assets/icons/burger.svg';

const HamburgerMenu = props => {
    return (
        <Menu className={props.className} />
    )
}

export default HamburgerMenu;
