import React, { Component } from 'react'
import { connect } from 'react-redux';
import Orders from '../components/Orders';

import * as orderActions from '../../../Store/actions/orders';
import AuthRoutes from '../../../Shared/hoc/AuthRoutes';

class CurrentUserOrders extends Component {
    render() {
        return <AuthRoutes>
            <Orders
                orders={this.props.userOrders}
                loading={this.props.userOrdersInit}
                getAllOrders={this.props.getAllUserOrders}
                heading="My Orders"
                showOrdersStatus={false}
                {...this.props}
            />
        </AuthRoutes>
    }
}

const mapStateToProps = state => {
    return {
        userOrdersInit: state.orders.getUserOrdersInit,
        userOrders: state.orders.userOrders,
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllUserOrders: () => dispatch(orderActions.getAllUserOrders()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUserOrders);
