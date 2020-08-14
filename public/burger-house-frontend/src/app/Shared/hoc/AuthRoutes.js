import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as authActions from '../../Store/actions/auth';
import { Redirect } from 'react-router';

class AuthRoutes extends Component {
    async componentDidMount() {
        await this.props.checkAuthState();
    }

    render() {
        if (!this.props.user) {
            return <Redirect to="/login" />
        }

        return this.props.children
    }
}


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

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoutes);