import React, { Component } from 'react';
import uniqid from 'uniqid';
import { connect } from 'react-redux';
import CardCart from './../../Shared/Components/Card/CardCart';
import Loader from '../../Shared/Components/Loader/Loader';

import Alert from './../../Shared/Components/Alert/Alert';

import * as cartActions from './../../Store/actions/cart';
import * as orderActions from './../../Store/actions/orders';


class Cart extends Component {
    state = {
        isLoading: false,
        alert: {
            show: false,
            status: '',
            message: '',
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        this.timer = setTimeout(() => {
            this.setState({ isLoading: false })
        }, 2000)
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

    takeToMenu = () => this.props.history.push({ pathname: '/menu' })
    goBack = () => this.props.history.goBack();


    decrementItemFromCartHandler = (Burger) => {
        if (Burger.items > 0) {
            this.props.onDecrementItemCart(Burger)
        } else {
            this.props.onItemRemovedFromCart(Burger)
        }
        this.showAlertHandler('Removed Burger from Cart', 'fail')
    }


    deleteItemFromCart = (Burger) => {
        this.props.onItemRemovedFromCart(Burger);
        this.showAlertHandler('Removed Burger from Cart', 'fail')
    }

    addItemInCartHandler = (Burger) => {
        this.props.onIncrementItemInCart(Burger);
        this.showAlertHandler('Added a Burger', 'success')
    }

    onOrderHandler = async () => {
        if (!this.props.user) {
            return this.props.history.replace('/login');
        }

        let menuOrders = [];
        let customOrders = [];
        Object.keys(this.props.cartBurgers).map(el => {
            if (!`${el}`.startsWith('customBurger')) {
                let menuOrder = {
                    _id: this.props.cartBurgers[el]._id,
                    items: this.props.cartBurgers[el].items
                };
                return menuOrders.push(menuOrder)
            } else {
                let ings = [];
                Object.keys(this.props.cartBurgers[el].ingredients).map(el2 => {
                    let ing = {
                        _id: this.props.cartBurgers[el].ingredients[el2]._id,
                        amount: this.props.cartBurgers[el].ingredients[el2].amount
                    }
                    return ings.push(ing);
                })
                let customOrder = {
                    ...this.props.cartBurgers[el],
                    name: 'Custom Burger',
                    items: this.props.cartBurgers[el].items,
                    ingredients: ings
                }
                return customOrders.push(customOrder)
            }
        })

        const data = {
            price: this.props.totalPrice,
            menuOrders,
            customOrders
        }

        await this.props.placeOrder(data)
        if (this.props.placeOrderStatus) {
            this.placeOrderTimer = setTimeout(() => {
                this.props.history.replace('/')
                this.props.clearCart();
            }, 1500)
        }
    }


    render() {
        let cards, markup;
        let burgers = this.props.cartBurgers;

        // Push items to cart if cart val is not zero 
        if (this.props.cart > 0) {
            cards = Object.keys(burgers).map(el => {
                if (burgers[el]) {
                    return <CardCart
                        key={uniqid()}
                        name={el}
                        decrementItem={this.decrementItemFromCartHandler}
                        deleteItem={this.deleteItemFromCart}
                        addItem={this.addItemInCartHandler}
                        cartBurgers={this.props.cartBurgers}
                    />
                } else return '';
            });

            markup = (
                <React.Fragment>
                    <button onClick={this.goBack} className="btn btn__tertiary-back cart__goback-btn">
                        <span>&larr;</span> Back
                    </button>
                    <h2 className="heading-1 cart__heading">Your Cart</h2>
                    <div className="cart__checkout">
                        <p className="cart__checkout-price">Total:&nbsp;
                        <span className="u-ftwt-700 u-fontSize-4 u-text-transform-none">Rs&nbsp;{this.props.totalPrice} </span></p>
                        <button
                            onClick={this.onOrderHandler}
                            className="btn btn__tertiary-goTo">Place Your Order
                        <span>&rarr;</span></button>
                    </div>
                    <div className="cart">
                        {cards}
                    </div>
                </React.Fragment>
            );
        } else {
            markup = (
                <div className="cart__empty">
                    <p className="cart__empty-heading">Your Cart is empty!</p>
                    <button onClick={this.takeToMenu} className="btn btn__tertiary cart__empty-btn">Start Adding Items</button>
                </div>
            );
        }

        if (this.state.isLoading || this.props.placeOrderLoading) return <div className="u-flex-center u-vh-100"><Loader /></div>

        if (this.props.placeOrderStatus) {
            return (
                <div className="u-flex-center u-vh-100">
                    <h2 className="u-fontSize-3rem u-text-success">Order Placed Successfully</h2>
                </div>
            )
        }

        return (
            <React.Fragment>
                {this.state.alert.status && <Alert
                    close={this.onCloseHandler()}
                    show={this.state.alert.show}
                    status={this.state.alert.status}
                    message={this.state.alert.message}
                />}
                <div className="section-cart">
                    {markup}
                </div>
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.auth.user,
        cart: state.cart.cart,
        cartBurgers: state.cart.Burgers,
        totalPrice: state.cart.totalPrice,
        menuBurgers: state.menu.Burgers,
        placeOrderLoading: state.orders.createUserOrderInit,
        placeOrderStatus: state.orders.createUserOrderStatus
    };
};

const mapDispachToProps = dispatch => {
    return {
        onIncrementItemInCart: (Burger) => dispatch(cartActions.incrementItem(Burger)),
        onDecrementItemCart: (Burger) => dispatch(cartActions.decrementItem(Burger)),
        onItemRemovedFromCart: (Burger) => dispatch(cartActions.removeBurgerFromCart(Burger)),
        placeOrder: (data) => dispatch(orderActions.createOrders(data)),
        clearCart: () => dispatch(cartActions.clearCartInit())
    };
};


export default connect(mapStateToProps, mapDispachToProps)(Cart);