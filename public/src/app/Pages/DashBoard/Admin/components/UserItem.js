import React, { Component } from 'react'
import ListItem from './../../../../Shared/Components/List/ListItem';

import Trash from './../../../../Shared/Icons/Trash';
import Edit from './../../../../Shared/Icons/Edit';


export default class UserItem extends Component {
    render() {
        return (
            <ListItem className="users__list-item" to="#">
                <h3 className="users__list-item-name">
                    {`${this.props.name.split(' ')[0]} ${this.props.user._id === this.props._id ? `(Me)` : ''}`}
                </h3>
                <h3 className="users__list-item-email">{this.props.email}</h3>
                <p className="users__list-item-role">{this.props.role}</p>
                {(this.props.role === 'customer' || this.props.user._id !== this.props._id) &&
                    <button onClick={() => this.props.edit(this.props._id)} className="users__list-item-edit btn btn__edit">
                        <Edit />
                    </button>}
                {this.props.user._id !== this.props._id && <button
                    onClick={() => this.props.delete(this.props._id)}
                    className="users__list-item-delete btn btn__delete"><Trash />
                </button>}
            </ListItem>
        )
    }
}
