import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Body from './Layout/Body';
import { Component } from 'react';

import * as authActions from './Store/actions/auth';
import Loader from './Shared/Components/Loader/Loader';

class App extends Component {

    componentDidMount() {
        this.props.checkAuthState();
    }

    render() {
        if (this.props.checkAuth) {
            return (
                <div className="u-flex-center u-bg-white">
                    <Loader />
                </div>
            )
        }

        return (
            <BrowserRouter>
                <Header />
                <Body />
                <Footer />
            </BrowserRouter >
        )
    }
};

const mapStateToProps = state => {
    return {
        checkAuthInit: state.auth.checkAuthInit
    }
}


const mapDispatchToProps = dispatch => {
    return {
        checkAuthState: () => dispatch(authActions.checkAuth()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
