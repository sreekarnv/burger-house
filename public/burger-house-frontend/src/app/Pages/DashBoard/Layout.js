import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideBar from './components/Sidebar';
import { Route, Switch } from 'react-router-dom';
import Profile from './User/Profile';

import Backdrop from './../../Shared/Components/BackDrop/BackDrop';

import HamburgerMenu from './../../Shared/Icons/HamburgerMenu';

import Users from './Admin/Users/Users';

import UserOrders from './Admin/Orders/UserOrders';

import CurrentUserOrders from './User/CurrentUserOrders';

import UpdateBurgerDetail from './Admin/Menu/UpdateBurgerDetail';
import UpdateBurgerList from './Admin/Menu/UpdateBurgerList';
import CreateBurger from './Admin/Menu/CreateBurger';
import OrderDetail from './components/OrderDetail';

import Ingredients from './Admin/Ingredients/Ingredients';

import IngredientsForm from './Admin/Ingredients/IngredientsForm';



class Layout extends Component {
    state = {
        showSideBar: false,
    }

    componentDidMount() {
        if (!this.props.user) {
            return this.props.history.push('/login')
        }

        if (this.props.user && this.props.user.role === 'admin') {
            return this.props.history.push('/dashboard/manage-orders')
        }

        if (this.props.user && this.props.user.role === 'customer') {
            return this.props.history.push('/dashboard/my-orders')
        }
    }

    sidebarShowHandler = () => {
        this.setState({ showSideBar: true })
    }

    sidebarCloseHandler = () => {
        this.setState({ showSideBar: false })
    }

    render() {
        let showSideBar = null;
        if (this.state.showSideBar) showSideBar = 'dashboard__sidebar-show'

        return (
            <React.Fragment>
                <div className="dashboard">
                    <button onClick={this.sidebarShowHandler} className="dashboard__sidebar-btn">
                        <HamburgerMenu className="icon-hamburger" />
                    </button>
                    {this.props.user && <div className={`sidebar dashboard__sidebar ${showSideBar}`} >
                        <SideBar {...this.props} closeSidebar={this.sidebarCloseHandler} />
                    </div>}
                    <Backdrop show={this.state.showSideBar} close={this.sidebarCloseHandler} user={this.props.user} />
                    <Switch>
                        <Route path={`${this.props.match.url}/manage-profile`} exact component={Profile} {...this.props} />

                        <Route path={`${this.props.match.url}/manage-users`} exact component={Users} {...this.props} />

                        <Route path={`${this.props.match.url}/manage-ingredients`} exact component={Ingredients} {...this.props} />
                        <Route path={`${this.props.match.url}/manage-ingredients/new`} component={IngredientsForm} {...this.props} />
                        <Route path={`${this.props.match.url}/manage-ingredients/:id`} component={IngredientsForm} {...this.props} />

                        <Route path={`${this.props.match.url}/manage-orders`} exact component={UserOrders} {...this.props} />
                        <Route path={`${this.props.match.url}/manage-orders/:id`} component={OrderDetail} {...this.props} />

                        <Route path={`${this.props.match.url}/manage-menu`} exact component={UpdateBurgerList} {...this.props} />
                        <Route path={`${this.props.match.url}/manage-menu/new`} exact component={CreateBurger} {...this.props} />
                        <Route path={`${this.props.match.url}/manage-menu/:id`} component={UpdateBurgerDetail} {...this.props} />

                        <Route path={`${this.props.match.url}/my-orders`} exact component={CurrentUserOrders} {...this.props} />
                        <Route path={`${this.props.match.url}/my-orders/:id`} component={OrderDetail} {...this.props} />
                    </Switch>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,

    }
}

export default connect(mapStateToProps)(Layout);
