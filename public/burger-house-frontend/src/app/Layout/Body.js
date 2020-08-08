import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../Pages/Home/Home';
import Menu from '../Pages/Menu/Menu';
import Cart from '../Pages/Cart/Cart';
import CustomBurger from './../Pages/CustomBurger/CustomBurger';
import About from './../Pages/About/About';
import Register from '../Pages/Register/Register';

import Login from '../Pages/Login/Login';
import Dashboard from '../Pages/DashBoard/Layout';

import Error from '../Pages/Error/Error';
import Logout from '../Pages/Logout/Logout';


class Body extends Component {
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route path="/" exact component={Home} {...this.props} />
                    <Route path="/menu" exact component={Menu} {...this.props} />
                    <Route path="/build-your-burger" component={CustomBurger} {...this.props} />
                    <Route path="/about" exact component={About} {...this.props} />
                    <Route path="/cart" component={Cart} {...this.props} />
                    <Route path="/register" exact component={Register} {...this.props} />
                    <Route path="/login" component={Login} {...this.props} />
                    <Route path="/dashboard" {...this.props} component={Dashboard} />
                    <Route path="/logout" component={Logout} {...this.props} />
                    <Route path="/something-went-wrong" component={Error} {...this.props} />
                    <Redirect to="/something-went-wrong" />
                </Switch>
            </React.Fragment >
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Body);