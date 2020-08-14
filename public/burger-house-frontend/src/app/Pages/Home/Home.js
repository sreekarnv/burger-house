import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeroPromises from './Components/HeroPromises/HeroPromises';
import Card from '../../Shared/Components/Card/CardMenu';
import Review from './Components/Review/Review';

import * as cartActions from './../../Store/actions/cart';
import * as menuActions from './../../Store/actions/menu';
import { Redirect } from 'react-router';

import Alert from './../../Shared/Components/Alert/Alert';


class Home extends Component {
    state = {
        alert: {
            show: false,
            status: '',
            message: '',
        }
    }

    takeToMenu = () => this.props.history.push('/menu');
    tocustomBurger = () => this.props.history.push('/build-your-burger');

    async componentDidMount() {
        await this.props.loadBurgers();
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



    render() {
        const burgers = this.props.menu;
        let cards, reviews;

        const reviewArr = Object.keys(this.props.reviews);
        reviews = reviewArr.filter(el => this.props.reviews[el].rating >= 4).map(el => {
            return <Review key={el} img={this.props.reviews[el].img} name={el} rating={this.props.reviews[el].rating} comment={this.props.reviews[el].comment} />
        }).slice(reviewArr.length - 2, reviewArr.length);

        // Burgers from Menu - Top rated
        if (burgers && !this.props.loading) {
            cards = Object.keys(burgers).map(el => {
                return <Card
                    _id={burgers[el]._id}
                    initialprice={burgers[el].price} price={burgers[el].totalprice}
                    key={burgers[el]._id}
                    title={burgers[el].title} foodType={burgers[el].foodType}
                    ingredients={burgers[el].ingredients} burgerImage={burgers[el].photo}
                    items={burgers[el].items}
                    page="menu"

                    addItem={this.incrementBurgerInCart}
                    removeItem={this.decrementItemFromCartHandler}
                    addItemToCart={this.addItemToCart} />
            }).slice(0, 3);
        }

        if (this.props.error) {
            return <Redirect to="/something-went-wrong" />
        }

        return (
            <React.Fragment>
                {this.state.alert.status && <Alert
                    close={this.onCloseHandler()}
                    show={this.state.alert.show}
                    status={this.state.alert.status}
                    message={this.state.alert.message}
                />}
                <div className="home">
                    <section className="section-hero">
                        <div className="hero__header">
                            <h2 className="heading-2 u-text-white">
                                We make <br /><span className="heading-1">BURGERS</span>
                            </h2>
                            <button onClick={this.takeToMenu} className="btn btn__tertiary u-justify-self-start">Order Now</button>
                        </div>
                        <div className="hero__promises">
                            <HeroPromises para="Fresh Ingredients only" pk="1" />
                            <HeroPromises para="Delivery within 30 mins" pk="2" />
                            <HeroPromises para="Quality Guaranteed!" pk="3" />
                        </div>
                    </section>
                    <section className="section-burgerbuilder" >
                        <h2 className="heading-2 section-burgerbuilder__heading">Don't like our menu? Then build you own burger</h2>
                        <button onClick={this.tocustomBurger} className="section-burgerbuilder__btn btn btn__tertiary">
                            Make your own Burger
                            </button>
                    </section>
                    <section className={`section-popular`}>
                        <h2 className="heading-1 popular__heading">Popular Burgers of all time</h2>
                        <div className="popular__card">
                            {cards}
                        </div>
                    </section>
                    <section className="section-reviews">
                        <h2 className="heading-1 reviews__heading">We make people happy</h2>
                        <div className="reviews">
                            {reviews}
                        </div>
                    </section>
                </div>
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        menu: state.menu.Burgers,
        loading: state.menu.loading,
        error: state.menu.error,
        reviews: state.customer.reviews,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIncrementItemInCart: (Burger) => dispatch(cartActions.incrementItem(Burger)),
        onDecrementItemCart: (Burger) => dispatch(cartActions.decrementItem(Burger)),
        onItemPushedToCart: (Burger) => dispatch(cartActions.addBurgerToCart(Burger)),
        onItemRemovedFromCart: (Burger) => dispatch(cartActions.removeBurgerFromCart(Burger)),
        loadBurgers: () => dispatch(menuActions.initBurgers()),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);


