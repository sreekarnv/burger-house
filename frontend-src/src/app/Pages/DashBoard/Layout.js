import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Backdrop from '../../Shared/Components/BackDrop/BackDrop';
import HamburgerMenu from '../../Shared/Icons/HamburgerMenu';

const Sidebar = lazy(() => import('./components/Sidebar'))

// USER ONLY
const CurrentUserOrders = lazy(() => import('./User/CurrentUserOrders'));
const Profile = lazy(() => import('./User/Profile'));

// ADMIN ONLY
const Users = lazy(() => import('./Admin/Users/Users'))
const UserOrders = lazy(() => import('./Admin/Orders/UserOrders'))
const UpdateBurgerDetail = lazy(() => import('./Admin/Menu/UpdateBurgerDetail'));
const UpdateBurgerList = lazy(() => import('./Admin/Menu/UpdateBurgerList'));
const CreateBurger = lazy(() => import('./Admin/Menu/CreateBurger'));
const OrderDetail = lazy(() => import('./components/OrderDetail'));


class Layout extends Component {
    state = {
        showSideBar: false,
    }

    componentDidMount() {
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
                    <Suspense
                    >
                        <button onClick={this.sidebarShowHandler} className="dashboard__sidebar-btn">
                            <HamburgerMenu className="icon-hamburger" />
                        </button>
                        {this.props.user && <div className={`sidebar dashboard__sidebar ${showSideBar}`} >
                            <Sidebar {...this.props} closeSidebar={this.sidebarCloseHandler} />
                        </div>}
                        <Backdrop show={this.state.showSideBar} close={this.sidebarCloseHandler} user={this.props.user} />
                        <Switch>
                            <Route path={`${this.props.match.url}/manage-profile`} exact component={Profile} {...this.props} />
                            <Route path={`${this.props.match.url}/manage-users`} exact component={Users} {...this.props} />

                            <Route path={`${this.props.match.url}/manage-orders`} exact component={UserOrders} {...this.props} />
                            <Route path={`${this.props.match.url}/manage-orders/:id`} component={OrderDetail} {...this.props} />

                            <Route path={`${this.props.match.url}/manage-menu`} exact component={UpdateBurgerList} {...this.props} />
                            <Route path={`${this.props.match.url}/manage-menu/new`} exact component={CreateBurger} {...this.props} />
                            <Route path={`${this.props.match.url}/manage-menu/:id`} component={UpdateBurgerDetail} {...this.props} />

                            <Route path={`${this.props.match.url}/my-orders`} exact component={CurrentUserOrders} {...this.props} />
                            <Route path={`${this.props.match.url}/my-orders/:id`} component={OrderDetail} {...this.props} />
                        </Switch>
                    </Suspense>
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
