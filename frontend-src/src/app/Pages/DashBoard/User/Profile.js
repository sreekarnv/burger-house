import React, { Component } from 'react';
import { connect } from 'react-redux';
import UpdateUserData from './components/updateUserData'
import UpdateUserPassword from './components/updateUserPassword';
import Loader from '../../../Shared/Components/Loader/Loader';
import ConfirmModal from '../../../Shared/Components/Modal/ConfirmModal';

import * as authActions from '../../../Store/actions/auth';
import Backdrop from '../../../Shared/Components/BackDrop/BackDrop';

class Profile extends Component {
    state = {
        showModal: false,
        message: '',
        type: ''
    }


    showModal = (message, type) => {
        this.setState({ showModal: true, message, type })
    }

    closeModal = () => {
        this.setState({ showModal: false, message: '', type: '' })
    }

    onDeleteHandler = () => {
        const message = 'Are you sure you want to delete your account ? ';
        this.showModal(message, 'delete')
    }

    onSubmitHandler = async (type) => {
        if (type === 'delete') {
            await this.props.deleteCurrentUser();
            if (this.props.deleteUserStatus === 'success') {
                this.props.history.push('/logout');
            }
        }
    }

    render() {
        if (this.props.deleteUserInit) {
            return <div className="u-flex-center u-vh-100 u-bg-white dashboard__dashboard"><Loader /></div>
        }

        if (this.props.user) {
            return (
                <React.Fragment  >
                    {
                        <ConfirmModal
                            show={this.state.showModal}
                            close={this.closeModal}
                            message={this.state.message}
                            edit={this.props.message}
                            type={this.state.type}
                            submit={this.onSubmitHandler}
                        />
                    }
                    <Backdrop show={this.state.showModal} close={this.closeModal} />
                    <div className="dashboard__dashboard update__user">
                        <div className="u-mx-auto update__user-data">
                            <UpdateUserData
                                {...this.props}
                                showAlert={this.showAlertHandler} />
                        </div>
                        <div className="u-mx-auto update__user-password">
                            <UpdateUserPassword {...this.props} />
                        </div>
                        <div className="delete__user">
                            <h4 className="heading-1 delete__user-heading">Delete My Account</h4>
                            <button
                                onClick={this.onDeleteHandler}
                                className="btn btn__danger--outline">Delete</button>
                        </div>
                    </div>
                </React.Fragment >
            )
        } else {
            return '';
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        updateUserDataInit: state.auth.updateUserDataInit,
        deleteUserInit: state.auth.deleteUserInit,
        deleteUserStatus: state.auth.deleteUserStatus
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteCurrentUser: () => dispatch(authActions.deleteCurrentUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);