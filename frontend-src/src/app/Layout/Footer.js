import React, { Component } from 'react';
import Navbar from '../Shared/Components/Navigation/Navbar';
import NavItem from '../Shared/Components/Navigation/NavItem';

class Footer extends Component {

    render() {
        return (
            <footer className="footer">
                <Navbar classNav="footer__nav">
                    <NavItem path="/about" classNavItem="footer__nav__item" classNavLink="footer__nav__link" description="About">About</NavItem>
                </Navbar>
                <p className="copyright">Copyright &copy; by Sreekar Venkata Nutulapati</p>
            </footer>
        )
    };
};

export default Footer;