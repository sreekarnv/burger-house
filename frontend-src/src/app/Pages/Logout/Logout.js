import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../Shared/Components/Loader/Loader';

import * as authActions from '../../Store/actions/auth';

class Logout extends Component {
    componentDidMount() {
        if (!this.props.user) {
            return this.props.history.replace('/login');
        }
        this.props.logout();
        this.props.history.replace('/')
    }

    render() {
        return (this.props.logoutInit) && <Loader className="u-flex-center u-vh-100" />
    }
}

const mapStateToProps = state => {
    return {
        logoutInit: state.auth.logoutInit,
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(authActions.logout())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Logout);