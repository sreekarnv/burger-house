import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as authActions from '../../Store/actions/auth';
import { Redirect } from 'react-router';
import Loader from '../Components/Loader/Loader';


class UnAuthRoutes extends Component {
    async componentDidMount() {
        await this.props.checkAuthState();
    }

    render() {
        if (this.props.checkAuthInit) {
            return <div className="u-flex-center u-vh-100 u-bg-white">
                <Loader />
            </div>
        }

        if (this.props.user && this.props.user.role === 'admin') {
            return <Redirect to="/dashboard/manage-orders" />
        } else if (this.props.user) {
            return <Redirect to="/menu" />
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

export default connect(mapStateToProps, mapDispatchToProps)(UnAuthRoutes);