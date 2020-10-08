import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Dashboard from '../Pages/DashBoard/Layout';
import Error from '../Pages/Error/Error';
import Logout from '../Pages/Logout/Logout';
import Loader from '../Shared/Components/Loader/Loader';
// import ConfirmRegistration from '../Pages/Register/ConfirmRegistration';

const Menu = lazy(() => import('../Pages/Menu/Menu'));
const Cart = lazy(() => import('../Pages/Cart/Cart'));
const CustomBurger = lazy(() => import('../Pages/CustomBurger/CustomBurger'));
const About = lazy(() => import('../Pages/About/About'));
const Home = lazy(() => import('../Pages/Home/Home'));
const Register = lazy(() => import('../Pages/Register/Register'));
const Login = lazy(() => import('../Pages/Login/Login'));
const ConfirmRegistration = lazy(() => import('../Pages/Register/ConfirmRegistration'))

class Body extends Component {
    render() {
        const loading = <div className="u-flex-center u-vh-100 u-bg-white">
            <Loader />
        </div>

        return (
            <Suspense fallback={loading}>
                <Switch>
                    <Route path="/" exact component={Home} {...this.props} />
                    <Route path="/build-your-burger" component={CustomBurger} {...this.props} />
                    <Route path="/about" exact component={About} {...this.props} />
                    <Route path="/cart" component={Cart} {...this.props} />
                    <Route path="/menu" exact component={Menu} {...this.props} />
                    <Route path="/dashboard" {...this.props} component={Dashboard} />
                    <Route path="/logout" component={Logout} {...this.props} />
                    <Route path="/confirm-email" component={ConfirmRegistration} {...this.props} />
                    <Route path="/something-went-wrong" component={Error} {...this.props} />
                    <Route path="/register" exact component={Register} {...this.props} />
                    <Route path="/login" component={Login} {...this.props} />
                </Switch>
            </Suspense>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Body);