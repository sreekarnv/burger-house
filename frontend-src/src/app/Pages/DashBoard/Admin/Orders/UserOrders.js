import React, { Component } from 'react';
import { connect } from 'react-redux';
import Orders from '../../components/Orders';
import * as orderActions from '../../../../Store/actions/orders';


class UserOrders extends Component {
    render() {
        return <Orders
            orders={this.props.orders}
            getAllOrders={this.props.getAllOrders}
            heading="Manage Orders"
            loading={this.props.getOrdersInit}
            showOrdersStatus={true}
            totalOrders={this.props.totalOrders}
            totalOrdersPrice={this.props.totalOrdersPrice}
            totalCompletedOrders={this.props.totalCompletedOrders}
            totalPendingOrders={this.props.totalPendingOrders}
            totalCancelledOrders={this.props.totalCancelledOrders}
            {...this.props}
        />
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        getOrdersInit: state.orders.getOrdersInit,
        user: state.auth.user,
        totalOrders: state.orders.totalOrders,
        totalOrdersPrice: state.orders.totalOrdersPrice,
        totalCompletedOrders: state.orders.totalCompletedOrders,
        totalPendingOrders: state.orders.totalPendingOrders,
        totalCancelledOrders: state.orders.totalCancelledOrders
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getAllOrders: (filter) => dispatch(orderActions.getAllOrders(filter)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);