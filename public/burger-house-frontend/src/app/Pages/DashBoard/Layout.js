import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Backdrop from './../../Shared/Components/BackDrop/BackDrop';
import HamburgerMenu from './../../Shared/Icons/HamburgerMenu';
import AuthenticatedRoutes from '../../Shared/hoc/AuthRoutes';
// import Loader from '../../Shared/Components/Loader/Loader';

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
const Ingredients = lazy(() => import('./Admin/Ingredients/Ingredients'));
const IngredientsForm = lazy(() => import('./Admin/Ingredients/IngredientsForm'));


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

        // let loading = <div className="dashboard u-flex-center u-vh-100 u-bg-white">
        //     <Loader />
        // </div>

        return (
            <React.Fragment>
                <div className="dashboard">
                    <Suspense
                    // fallback={loading}
                    >
                        <button onClick={this.sidebarShowHandler} className="dashboard__sidebar-btn">
                            <HamburgerMenu className="icon-hamburger" />
                        </button>
                        {this.props.user && <div className={`sidebar dashboard__sidebar ${showSideBar}`} >
                            <Sidebar {...this.props} closeSidebar={this.sidebarCloseHandler} />
                        </div>}
                        <Backdrop show={this.state.showSideBar} close={this.sidebarCloseHandler} user={this.props.user} />
                        <Switch>
                            <AuthenticatedRoutes {...this.props}>
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
                            </AuthenticatedRoutes>
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
