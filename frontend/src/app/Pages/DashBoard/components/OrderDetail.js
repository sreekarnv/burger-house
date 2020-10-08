import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItem from '../../../Shared/Components/List/ListItem';
import CardStatus from './StatusCard';

import * as orderActions from '../../../Store/actions/orders';
import Loader from '../../../Shared/Components/Loader/Loader';
import AuthRoutes from '../../../Shared/hoc/AuthRoutes';

class OrderDetail extends Component {
    state = {
        orders: null,
    }

    async componentDidMount() {

        await this.props.getOrder(this.props.match.params.id)
        if (!this.props.order && this.props.match.url.startsWith('/dashboard/manage-orders')) {
            return this.props.history.push('/dashboard/manage-orders')
        } else if (!this.props.order && this.props.match.url.startsWith(`/dashboard/my-orders`)) {
            return this.props.history.push('/dashboard/my-orders')
        }
        else {
            let orders = this.props.order;
            this.setState({ orders })
        }
    }

    onChangeStatusHandler = async () => {
        let status = 'pending';
        if (this.state.orders.status === 'pending') status = 'delivered'

        await this.props.updateOrderStatusAdmin(
            { status, _id: this.props.match.params.id }
        )

        if (this.props.orderStatus === 'success') {
            this.setState({
                orders: {
                    ...this.state.orders,
                    status: this.props.updatedOrder.status
                }
            })
        }
    }

    onCancelOrder = async () => {
        await this.props.updateOrderStatusAdmin(
            { status: 'cancelled', _id: this.props.match.params.id }
        )

        if (this.props.orderStatus === 'success') {
            this.setState({
                orders: {
                    ...this.state.orders,
                    status: this.props.updatedOrder.status
                }
            })
        }
    }

    render() {
        let items = 0;

        if (this.state.orders) {
            this.state.orders.orders.map(el => items += el.items)
        }

        if (this.state.isLoading || !this.state.orders) {
            return <div className="dashboard__dashboard u-flex-center u-bg-white u-vh-100">
                <Loader />
            </div>
        }

        return (
            <AuthRoutes>
                <div className="order__details dashboard__dashboard">
                    <button
                        onClick={() => this.props.history.push(
                            this.props.match.url.startsWith(`/dashboard/my-orders`)
                                ? '/dashboard/my-orders' : '/dashboard/manage-orders'
                        )}
                        className="btn  btn__tertiary-back order__details-back-btn">
                        <span>&larr;</span>Back
                </button>

                    <h4 className="heading-1 order__details-heading">
                        Order Details
                </h4>
                    <div className="order__details-info">
                        <div>
                            <h2>Order Id: #{this.props.match.params.id}</h2>
                            <h4>{this.state.orders.user.name}</h4>
                            <p>{this.state.orders.user.email}</p>
                        </div>
                        <div className="order__details-info-status order__details-info-status--total-orders">
                            <CardStatus className="order__details-info-status-card"
                                heading="Order Status"
                                value={this.state.orders.status}
                            />
                            {this.props.loggedInUser.role === 'admin' && this.props.match.url.startsWith('/dashboard/manage-orders/') &&
                                <button onClick={this.onChangeStatusHandler} disabled={this.state.orders.status === 'cancelled' ? true : false}
                                    className={`btn btn__success--outline${this.state.orders.status === 'cancelled' ? '-disabled' : ''} `}>
                                    Mark Order as {this.state.orders.status === 'pending' ? 'Delivered' : 'Pending'}
                                </button>}
                            {this.props.match.path === '/dashboard/my-orders/:id' &&
                                <button onClick={this.onCancelOrder}
                                    className={`btn btn__success--outline${this.state.orders.status === 'delivered' || this.state.orders.status === 'cancelled' ? '-disabled' : ''} `} >
                                    Cancel Order
                            </button>
                            }
                        </div>

                        <CardStatus className="order__details-info-status-card"
                            heading="Total Orders"
                            value={items}
                        />

                    </div>

                    <div className="order__details-list">
                        {this.state.orders.orders.map(el => {
                            return (
                                <ListItem className={`order__details-list-item u-bg-${el._id.foodType}--opacity-35`}>
                                    <React.Fragment>
                                        <p className="order__details-list-item-name">
                                            {el._id.title} ({el.items})
                                    </p>
                                        <div className="order__details-list-item-ings">
                                            {el._id.ingredients.map(el2 => {
                                                return <p>{el2._id.name ? el2._id.name : el2.name} ({el2.amount})</p>
                                            })}
                                        </div>
                                    </React.Fragment>
                                </ListItem>
                            )
                        })}
                    </div>

                </div >
            </AuthRoutes>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        getOrderInit: state.orders.getOrderInit,
        order: state.orders.order,
        loggedInUser: state.auth.user,
        orderStatus: state.orders.updateOrderStatusAdminStatus.status,
        updatedOrder: state.orders.updateOrderStatusAdminStatus.order
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrder: (id) => dispatch(orderActions.getOrder(id)),
        updateOrderStatusAdmin: (payload) => dispatch(orderActions.updateOrderStatusAdmin(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);