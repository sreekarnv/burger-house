import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../../Shared/Components/Burger/Burger';

import * as burgerBuilderActions from "../../../Store/actions/burgerBuilder";
import * as cartActions from "../../../Store/actions/cart";


import customBurgerImg from "../../../../assets/images/logo.svg";
import Alert from '../../../Shared/Components/Alert/Alert';
import Loader from '../../../Shared/Components/Loader/Loader';
import IngredientControls from '../../../Shared/Components/IngredientControls/IngredientControls';



class customBurgerBuilder extends Component {
    state = {
        alert: {
            show: false,
            status: '',
            message: '',
        },
        isLoading: false,
    }


    componentDidMount() {
        this.setState({ isLoading: true })
        this.props.getIngredients();
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


    AddBurgerToCartHandler = async (ings, foodType) => {
        let idArr = Object.keys(ings).map(el => (el + ings[el].amount));
        let id = idArr.toString().split(',').join('');
        let BurgerNew = {
            id: id,
            initialprice: this.props.totalBurgerPrice,
            price: this.props.totalBurgerPrice,
            ingredients: ings,
            items: 0,
            title: "customBurger",
            foodType: foodType,
            BurgerImage: customBurgerImg,
        };

        this.showAlertHandler('Added burger to cart successfully', 'success');
        this.props.addBurgerToCart(BurgerNew);
        this.clearIngsTimer = setTimeout(() => {
            this.props.clearPriceValue();
            this.props.clearIngValues(this.props.ingredients);
            this.props.history.push('/cart')
        }, 2000)
    };

    goBackButtonHandler = () => {
        this.props.clearPriceValue();
        this.props.clearIngValues(this.props.ingredients);
        this.props.history.push('/build-your-burger')
    };

    componentWillUnmount() {
        clearTimeout(this.timer);
        clearTimeout(this.clearIngsTimer);
    }

    render() {
        let burger = this.props.error ? <p>Ingredients Cannot be Loaded</p> : <Burger ingredients={this.props.ingredients} />
        let markup, NotfoodType, foodType;

        if (this.props.match.url === `/build-your-burger/non-veg`) {
            NotfoodType = "vegetarian";
            foodType = "non-vegetarian";
        } else if (this.props.match.url === `/build-your-burger/veg`) {
            NotfoodType = "non-vegetarian";
            foodType = "vegetarian";
        }

        markup = (
            <IngredientControls
                ingredients={this.props.ingredients}
                NotfoodType={NotfoodType}
                foodType={foodType}
                totalBurgerPrice={this.props.totalBurgerPrice}
                success={this.AddBurgerToCartHandler}
                danger={this.goBackButtonHandler}
                successField="Add to Cart"
                dangerField="Go Back"
                disabled={this.props.disabled}
                addIngredient={this.props.addIngredient}
                removeIngredient={this.props.removeIngredient}
            />
        )

        if (this.state.isLoading) return <div className="u-flex-center u-vh-100"><Loader /></div>

        return (
            <React.Fragment>
                {this.state.alert.status && <Alert
                    close={this.onCloseHandler()}
                    show={this.state.alert.show}
                    status={this.state.alert.status}
                    message={this.state.alert.message}
                />}
                <section className="custom-burger">
                    {burger}
                    <div className="controls">{markup}</div>
                </section>
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalBurgerPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addIngredient: (name) => dispatch(burgerBuilderActions.addIngredient(name)),
        removeIngredient: (name) => dispatch(burgerBuilderActions.removeIngredient(name)),
        addBurgerToCart: (burger) => dispatch(cartActions.addBurgerToCart(burger)),
        clearIngValues: (ings) => dispatch(burgerBuilderActions.clearIngredientValues(ings)),
        clearPriceValue: () => dispatch(burgerBuilderActions.clearPriceValue()),
        getIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(customBurgerBuilder);



