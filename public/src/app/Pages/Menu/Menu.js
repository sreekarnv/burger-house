import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from '../../Shared/Components/Card/CardMenu';
import Loader from './../../Shared/Components/Loader/Loader';

import * as cartActions from './../../Store/actions/cart';
import * as menuActions from './../../Store/actions/menu';
import Alert from '../../Shared/Components/Alert/Alert';



class Menu extends Component {
    state = {
        showAddorRemoveBtn: false,

        alert: {
            show: false,
            status: '',
            message: '',
        }
    };

    takeToBurgerBuilder = () => this.props.history.push('/build-your-burger');

    componentDidMount() {
        this.setState({ isLoading: true })
        this.props.loadBurgers();
        this.timer = setTimeout(() => {
            this.setState({ isLoading: false })
        }, 1000)
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

    decrementItemFromCartHandler = (Burger) => {
        if (Burger.items > 0) {
            this.props.onDecrementItemCart(Burger)
        } else {
            this.props.onItemRemovedFromCart(Burger)
        }
        this.showAlertHandler('Removed Burger from cart successfully', 'fail');
    };

    addItemToCart = (Burger) => {
        this.props.onItemPushedToCart(Burger);
        const message = 'Added Burger to Cart successfully'
        this.showAlertHandler(message, 'success')
    }

    incrementBurgerInCart = (Burger) => {
        this.props.onIncrementItemInCart(Burger)
        const message = 'Added Burger to Cart successfully';
        this.showAlertHandler(message, 'success');
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        clearTimeout(this.closeAlertTimer);
    }

    render() {
        let cards;
        let burgers = this.props.menu
        if (burgers) {
            cards = Object.keys(burgers).map(el => {
                return <Card
                    _id={burgers[el]._id}
                    initialprice={burgers[el].price} price={burgers[el].totalprice} key={burgers[el]._id}
                    title={burgers[el].title} foodType={burgers[el].foodType}
                    ingredients={burgers[el].ingredients} burgerImage={burgers[el].photo}
                    items={burgers[el].items}
                    page="menu"
                    addItem={this.incrementBurgerInCart}
                    removeItem={this.decrementItemFromCartHandler}
                    addItemToCart={this.addItemToCart} />
            });
        }

        if (this.props.loading || this.state.isLoading) {
            return <div className="u-flex-center u-vh-100"><Loader /></div>
        }

        return (
            <React.Fragment>
                {this.state.alert.status && <Alert
                    close={this.onCloseHandler()}
                    show={this.state.alert.show}
                    status={this.state.alert.status}
                    message={this.state.alert.message}
                />}
                <section className="section-menu">
                    <h2 className="menu__heading heading-1">Menu</h2>
                    <div className="menu__list">
                        {cards}
                    </div>
                    <button onClick={this.takeToBurgerBuilder} className="menu__btn btn btn__tertiary-goTo">Screw it! Make your own burger</button>
                </section>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        menu: state.menu.Burgers,
        loading: state.menu.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIncrementItemInCart: (Burger) => dispatch(cartActions.incrementItem(Burger)),
        onDecrementItemCart: (Burger) => dispatch(cartActions.decrementItem(Burger)),
        onItemPushedToCart: (Burger) => dispatch(cartActions.addBurgerToCart(Burger)),
        onItemRemovedFromCart: (Burger) => dispatch(cartActions.removeBurgerFromCart(Burger)),
        loadBurgers: () => dispatch(menuActions.initBurgers())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Menu);