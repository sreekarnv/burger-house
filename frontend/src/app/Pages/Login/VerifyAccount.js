import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as authActions from './../../Store/actions/auth';

class VerifyAccount extends Component {

    componentDidMount() {
        this.props.verfiyAccount(this.props.match.params.id);
    }

    render() {
        return (
            <div className="verified__account">
                <h1 className="verified__account-text">Your Account is Verfied</h1>
                <button className="btn btn__tertiary">
                    Click here to login
                </button>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        accountVerifiedInit: state.auth.accountVerifiedInit,
        accountVerifiedStatus: state.auth.accountVerifiedStatus
    }
}

const mapDispatchToProps = dispatch => {
    return {
        verfiyAccount: (id) => dispatch(authActions.verifyAccount(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAccount);
