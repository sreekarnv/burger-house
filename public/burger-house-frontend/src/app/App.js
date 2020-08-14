import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Body from './Layout/Body';
import { Component } from 'react';

import * as authActions from './Store/actions/auth';
import Loader from './Shared/Components/Loader/Loader';

const Header = lazy(() => import('./Layout/Header'));
const Footer = lazy(() => import('./Layout/Footer'));

class App extends Component {
    async componentDidMount() {
        await this.props.checkAuthState();
    }

    render() {
        let loading = <div className="u-flex-center u-vh-100 u-bg-white">
            <Loader />
        </div>

        if (this.props.checkAuthInit) {
            return loading;
        }

        return (
            <BrowserRouter>
                <Suspense fallback={loading}>
                    <Header />
                    <Body />
                    <Footer />
                </Suspense>
            </BrowserRouter >
        )
    }
};


const mapStateToProps = state => {
    return {
        user: state.auth.user,
        checkAuthInit: state.auth.checkAuthInit
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkAuthState: () => dispatch(authActions.checkAuth()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
