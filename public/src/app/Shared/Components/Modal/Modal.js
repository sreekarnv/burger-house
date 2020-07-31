import React, { Component } from 'react'

export default class Modal extends Component {
    render() {
        return (
            <div className={`modal modal__${this.props.show} ${this.props.className}`}>
                {this.props.children}
            </div>
        )
    }
}
