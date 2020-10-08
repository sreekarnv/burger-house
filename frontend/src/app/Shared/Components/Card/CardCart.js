import React, { Component } from 'react';
import uniqid from 'uniqid';
import Trash from '../../Icons/Trash';
import AddorRemoveBtn from '../Buttons/AddorRemoveButton';


class CardCart extends Component {
    render() {
        let burgers = this.props.cartBurgers;

        let ingredients = Object.keys(burgers[this.props.name].ingredients).map(el => {
            return <p key={uniqid()} className="card__cart-ingredient">
                {burgers[this.props.name].ingredients[el].name}
            &nbsp;x&nbsp;{burgers[this.props.name].ingredients[el].amount}</p>
        })

        let Burger = {
            ...burgers[this.props.name]
        };

        let btns = (
            <React.Fragment>
                <AddorRemoveBtn value={burgers[this.props.name].cart}
                    className="card__cart-btn"
                    classes="btn  btn__primary btn__primary-round "
                    valueClass="u-fontSize-2rem"
                    removeItem={() => this.props.decrementItem(Burger)}
                    addItem={() => this.props.addItem(Burger)} items={burgers[this.props.name].items}
                />
                <button
                    onClick={() => this.props.deleteItem(Burger)}
                    className="card__cart-btn--delete btn btn__delete"><Trash />
                </button>
            </React.Fragment>
        )

        let burgerName = burgers[this.props.name].title;
        if (burgerName.startsWith('customBurger')) {
            burgerName = 'Your Burger';
        }

        return (
            <div className="card__cart">
                <img src={burgers[this.props.name].BurgerImage} alt="burger" className="card__cart-img " />
                <h3 className="card__cart-title ">
                    {burgerName}
                </h3>
                <p className={`u-text-${burgers[this.props.name].foodType} card__cart-foodType`}>
                    {burgers[this.props.name].foodType}</p>
                <div className="card__cart-ingredients">
                    {ingredients}
                </div>

                <p className="card__cart-price">Rs {burgers[this.props.name].price}</p>
                {btns}
            </div>
        )
    };
}


export default CardCart;