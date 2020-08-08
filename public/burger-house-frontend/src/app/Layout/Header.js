import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logo from './../Shared/Icons/Logo';
import Navbar from './../Shared/Components/Navigation/Navbar';
import NavItem from './../Shared/Components/Navigation/NavItem';
import { Link } from 'react-router-dom';


class Header extends Component {
    render() {
        return (
            <header className="header">
                <Link className="header__brand" to="/">
                    <Logo className="header__logo" />
                    <h1 className="header__brand-name">Burger house</h1>
                </Link>

                <Navbar classNav="header__nav">
                    <NavItem active="header__nav-link--active" exact classNavItem="header__nav-item" classNavLink="header__nav-link" path="/" >Home</NavItem>

                    <NavItem active="header__nav-link--active" classNavItem="header__nav-item" classNavLink="header__nav-link" path="/menu" >Menu</NavItem>

                    {this.props.user && <NavItem active="header__nav-link--active" classNavItem="header__nav-item" classNavLink="header__nav-link"
                        // path={`/dashboard/${this.props.user.role === 'admin' ? 'manage-orders' : 'my-orders'}`} >Dashboard</NavItem>}
                        path={`/dashboard`} >Dashboard</NavItem>}

                    {!this.props.user && <NavItem active="header__nav-link--active" classNavItem="header__nav-item" classNavLink="header__nav-link" path="/login" >Login</NavItem>}

                    {!this.props.user && <NavItem active="header__nav-link--active" classNavItem="header__nav-item" classNavLink="header__nav-link" path="/register" >Register</NavItem>}

                    <NavItem active="header__nav-link--active" classNavItem="header__nav-item" classNavLink="header__nav-link" badge path="/cart" badgeVal={this.props.cart}>Cart</NavItem>

                    {this.props.user &&
                        <Link to="/logout" className="btn btn__logout">logout</Link>}

                </Navbar>
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart.cart,
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Header); 