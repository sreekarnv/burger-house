import React, { Component } from 'react';
import Input from '../../../../Shared/Components/Form/Input';

import { onChangeFormInput } from '../../../../Shared/Utils/formInput';


export default class UserForm extends Component {
    state = {
        formInput: {
            name: '',
            role: '',
        }
    }

    onChangeHandler = e => {
        let formInput = onChangeFormInput(e, { ...this.state })
        this.setState({ ...formInput })
    }

    onSubmitHandler = e => {
        e.preventDefault();
        let data = {};
        Object.keys({ ...this.state.formInput }).map(el => {
            if (this.state.formInput[el] !== '') {
                data[el] = this.state.formInput[el]
            }
            return data
        })
        this.props.getUsers(data);
    }

    render() {
        return (
            <form className="users__filter-form" autoComplete="off" onSubmit={this.onSubmitHandler}>
                <Input
                    inputtype="input"
                    type="text"
                    name="name"
                    placeholder="Enter name of user"
                    value={this.state.formInput.name}
                    onChange={this.onChangeHandler}
                    required={false}
                />


                <div className="form__group">
                    <select name="role" id="role" className="form__input" value={this.state.role} onChange={this.onChangeHandler}>
                        <option value="" >All Users</option>
                        <option value="customer" >Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <Input
                    inputtype="submit"
                    value="search"
                    variant="tertiary"
                />
            </form>
        )
    }
}
