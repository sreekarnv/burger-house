import React from 'react'
import Input from '../../../../Shared/Components/Form/Input'
import { connect } from 'react-redux';
import { Component } from 'react'

import { onChangeFormInput } from '../../../../Shared/Utils/formInput';

import * as authActions from '../../../../Store/actions/auth';
import Alert from '../../../../Shared/Components/Alert/Alert';


class UpdateUserData extends Component {
    state = {
        formInput: {
            name: this.props.user.name,
            email: this.props.user.email,
            photo: this.props.user.photo
        },
        alert: {
            show: false,
            status: '',
            message: '',
        },
        previewPhoto: this.props.user.photo,
        fileUploaded: false,
    }

    showAlertHandler = (message, status) => {
        this.setState({
            ...this.state,
            alert: {
                show: true,
                status,
                message,
            }
        })
    }

    onCloseHandler = () => {
        this.closeAlertTimer = setTimeout(() => {
            this.setState({
                ...this.state,
                alert: {
                    show: false, status: '', message: ''
                }
            });
        }, 2000)
    }

    onChangeHandler = e => {
        let formInput = onChangeFormInput(e, { ...this.state })
        this.setState({ ...formInput })
    }

    onFileChangeHandler = e => {
        this.setState({
            ...this.state,
            formInput: {
                ...this.state.formInput,
                photo: e.target.files[0]
            },
            fileUploaded: true,
            previewPhoto: URL.createObjectURL(e.target.files[0])
        })
    }

    onSubmitHandler = async e => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', this.state.formInput.name);
        formData.append('email', this.state.formInput.email);
        if (this.state.fileUploaded) {
            formData.append('photo', this.state.formInput.photo);
        }
        await this.props.updateUserData(formData)
        let message, status;
        if (this.props.userDataStatus === 'success') {
            status = this.props.userDataStatus
            message = 'User details updated Successfully'
            this.setState({
                formInput: {
                    ...this.props.photo,
                    name: this.props.user.name,
                    email: this.props.user.email,
                    photo: this.props.user.photo
                },
                previewPhoto: this.props.user.photo,
                fileUploaded: false,
            })
        } else {
            status = this.props.userDataStatus.status;
            message = this.props.userDataStatus.message;
            this.setState({
                fileUploaded: false,
            })
        }
        this.showAlertHandler(message, status)
    }

    render() {
        console.log(this.state);
        return (
            <React.Fragment>
                {this.state.alert.status && <Alert
                    close={this.onCloseHandler()}
                    show={this.state.alert.show}
                    status={this.state.alert.status}
                    message={this.state.alert.message}
                />}
                <form onSubmit={this.onSubmitHandler} autoComplete="off">
                    <div className="form__group">
                        <h2 className="heading-1 u-text-primary u-ftwt-400">
                            Update User Details
                    </h2>
                    </div>
                    <Input
                        inputtype="input"
                        name="name"
                        type="text"
                        label="name"
                        onChange={this.onChangeHandler}
                        value={this.state.formInput.name}
                    />

                    <Input
                        inputtype="input"
                        name="email"
                        type="email"
                        label="Email"
                        onChange={this.onChangeHandler}
                        value={this.state.formInput.email}
                    />

                    <div className="form__group u-flex-between">
                        <div>
                            <input type="file" id="photo" onChange={this.onFileChangeHandler} style={{ display: 'none' }} />
                            <label htmlFor="photo" className="btn btn__tertiary-goTo btn__sm">Choose Image</label>
                        </div>
                        <div className="update__user-data-preview-img-bg ">
                            <img src={this.state.previewPhoto} className="update__user-data-preview-img-image" alt={this.state.formInput.name} />
                        </div>
                    </div>

                    <Input
                        inputtype="submit"
                        value={this.props.loading ? 'Loading....' : "update details"}
                        variant="tertiary"
                    />

                </form >
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        loading: state.auth.updateUserDataInit,
        userDataStatus: state.auth.updateUserDataStatus,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateUserData: (data) => dispatch(authActions.updateCurrentUser(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserData);
