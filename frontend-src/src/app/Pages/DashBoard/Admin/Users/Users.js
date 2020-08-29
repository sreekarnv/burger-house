import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListItem from '../components/UserItem';
import UserForm from '../components/UserForm';
import Loader from '../../../../Shared/Components/Loader/Loader';

import * as userActions from '../../../../Store/actions/users';
import ConfirmModal from '../../../../Shared/Components/Modal/ConfirmModal';
import Backdrop from '../../../../Shared/Components/BackDrop/BackDrop';
import AuthRoutes from '../../../../Shared/hoc/AuthRoutes';


class Users extends Component {
    state = {
        showModal: false,
        message: '',
        type: '',
        userId: ''
    }

    async componentDidMount() {
        await this.props.getAllUsers();
    }

    showModal = (message, type, userId) => {
        this.setState({ showModal: true, message, type, userId })
    }

    closeModal = () => {
        this.setState({ showModal: false, message: '', type: '', userId: '' })
    }

    onEditHandler = (userId) => {
        const message = 'Are you sure you want to make this customer an admin ? ';
        this.showModal(message, 'edit', userId)
    }

    onDeleteHandler = (userId) => {
        const message = 'Are you sure you want to delete this user ? ';
        this.showModal(message, 'delete', userId)
    }

    onSubmitHandler = (type) => {
        if (type === 'edit') {
            let data = { role: 'admin' }
            this.props.updateUser(this.state.userId, data)
        } else if (type === 'delete') {
            this.props.deleteUser(this.state.userId)
        }
    }

    render() {
        if (this.props.getUsersInit) {
            return <div className="u-flex-center u-vh-100 u-bg-white dashboard__dashboard"><Loader /></div>
        }

        return (
            <AuthRoutes>
                <ConfirmModal
                    show={this.state.showModal}
                    close={this.closeModal}
                    message={this.state.message}
                    edit={this.props.message}
                    type={this.state.type}
                    submit={this.onSubmitHandler}
                />
                <Backdrop show={this.state.showModal} close={this.closeModal} />
                <div className="users dashboard__dashboard">
                    <h2 className="users__heading heading-1 u-text-primary">
                        Users
                    </h2>
                    <UserForm
                        getUsers={this.props.getAllUsers}
                    />
                    <div className="users__list">
                        {this.props.users &&
                            this.props.users.map(el => {
                                return (
                                    <ListItem
                                        key={el._id}
                                        _id={el._id}
                                        role={el.role}
                                        name={el.name}
                                        user={this.props.user}
                                        email={el.email}
                                        edit={this.onEditHandler}
                                        delete={this.onDeleteHandler}
                                    />
                                )
                            })}
                    </div>
                </div>
            </AuthRoutes>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users.users,
        user: state.auth.user,
        getUsersInit: state.users.getUsersInit
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllUsers: (params) => dispatch(userActions.getAllUsers(params)),
        updateUser: (id, data) => dispatch(userActions.updateUserRole(id, data)),
        deleteUser: (id) => dispatch(userActions.deleteUser(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);