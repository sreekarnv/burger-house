import React, { Component } from 'react';

import ListItem from './../User/components/ListItemOrders';
import Loader from '../../../Shared/Components/Loader/Loader';
import StatusCard from './StatusCard';

import { onChangeFormInput } from './../../../Shared/Utils/formInput';

class Orders extends Component {
    state = {
        formInput: {
            orders: 'pending'
        }
    }

    async componentDidMount() {
        await this.props.getAllOrders(this.state.formInput.orders);
        if (!this.props.user) {
            this.props.history.push('/login')
        }
    }

    onChangeHandler = e => {
        let formInput = onChangeFormInput(e, { ...this.state })
        this.setState({ ...formInput })
    }


    onFilterHandler = () => {
        this.props.getAllOrders(this.state.formInput.orders)
    }

    render() {
        let orders = this.props.orders;

        if (this.props.loading) {
            return <div className="u-flex-center dashboard__dashboard u-bg-white u-vh-100"><Loader /></div>
        }

        if (!this.props.orders) {
            return <h4 className="u-text-success">You have no orders</h4>
        }

        return (
            <div className={`orders orders-status-${this.props.showOrdersStatus} dashboard__dashboard`}>
                <h2 className="orders__heading heading-1 u-text-primary">
                    {this.props.heading}
                </h2>
                {this.props.showOrdersStatus && <h2 className="orders__price heading-2">
                    <span className="u-text-success u-ftwt-400">Total Amount:&nbsp;</span>
                    <span className="u-text-tertiary">Rs {this.props.totalOrdersPrice.toFixed(2)}</span>
                </h2>}
                {this.props.showOrdersStatus && <div
                    className={`orders__status`}>
                    <StatusCard className="u-text-danger" heading="total Orders" value={this.props.totalOrders} />
                    <StatusCard className="u-text-grey-dark" heading="Cancelled Orders" value={this.props.totalCancelledOrders} />
                    <StatusCard className="u-text-success" heading="Delivered orders" value={this.props.totalCompletedOrders} />
                    <StatusCard className="u-text-danger" heading="pending orders" value={this.props.totalPendingOrders} />
                </div>}
                {this.props.showOrdersStatus &&
                    <div className="form__group u-text-center orders__filter">
                        <select name="orders" id="orders" className="form__input u-mr-2"
                            onChange={this.onChangeHandler}
                            value={this.state.formInput.orders}
                        >
                            <option value="pending">Pending Orders</option>
                            <option value="All Orders">All Orders</option>
                            <option value="delivered">Delivered Orders</option>
                            <option value="cancelled">Cancelled Orders</option>
                        </select>
                        <button
                            onClick={this.onFilterHandler}
                            type="submit" className="btn__primary btn">
                            Filter
                        </button>
                    </div>
                }
                <div className="orders__list">
                    {orders.length > 0
                        ? orders.map(el => {
                            return <ListItem
                                id={el._id}
                                results={el.orders.length}
                                price={el.price}
                                date={el.createdAt}
                                status={el.status}
                                to={`${this.props.match.url}/${el._id}`}
                            />
                        })
                        : <h4 className="orders__list--empty">There are no Orders Left</h4>
                    }
                </div>
            </div>
        )
    }
}

export default Orders; 
