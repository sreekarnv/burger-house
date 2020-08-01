import React, { Component } from 'react';
import uniqid from 'uniqid';
import { connect } from 'react-redux';
import AddorRemoveBtn from './../../Components/Buttons/AddorRemoveButton';

class Card extends Component {
    state = {
        showAlert: false,
        showAddorRemoveBtn: false,
    };

    ingredients = Object.keys(this.props.ingredients).map(el => <p key={uniqid()}
        className="card__menu-ingredient">
        <span className="card__menu-ingredient-name">{this.props.ingredients[el].name}</span>&nbsp;&#10005;&nbsp;
        <span>{this.props.ingredients[el].amount}</span></p>)

    render() {
        let Burger = {
            _id: this.props._id,
            title: this.props.title,
            initialprice: this.props.initialprice,
            foodType: this.props.foodType,
            ingredients: this.props.ingredients,
            BurgerImage: this.props.burgerImage,
            items: this.props.items,
            price: this.props.price,
        };

        let card__btn;
        Object.keys(this.props.menuBurgers).map(el => {
            if (this.props.page === 'menu') {
                if (!this.props.cartBurgers || !this.props.cartBurgers[this.props.title]) {
                    return card__btn = <button onClick={() => this.props.addItemToCart(Burger)}
                        className="btn btn__primary card__menu-btn">Add to Cart</button>

                } else if (this.props.cartBurgers[this.props.title].items > 0) {
                    Burger.items = this.props.cartBurgers[this.props.title].items
                    return card__btn = <AddorRemoveBtn
                        valueClass="u-fontSize-3rem"
                        className="card__menu-btn"
                        classes="btn btn__primary btn__primary-round btn--large "
                        removeItem={() => this.props.removeItem(Burger)}
                        addItem={() => this.props.addItem(Burger)} items={this.props.cartBurgers[this.props.title].items} />

                }
            } else {
                return card__btn = <button
                    onClick={() => this.props.chooseBurger(this.props._id)}
                    className="btn btn__primary card__menu-btn">Update Settings</button>;;
            }
            return card__btn;
        })

        return (
            <div className="card__menu">
                <img src={this.props.burgerImage} alt="burger" className="card__menu-img" />
                <h3 className="card__menu-title">{this.props.title}</h3>
                <p className={`u-text-${this.props.foodType} card__menu-foodType`}>{this.props.foodType}</p>
                <div className="card__menu-ingredients">
                    {this.ingredients}
                </div>
                <p className="card__menu-price">Rs {this.props.initialprice}</p>
                {card__btn}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart,
        cartBurgers: state.cart.Burgers,
        menuBurgers: state.menu.Burgers,
    };
};

export default connect(mapStateToProps)(Card);