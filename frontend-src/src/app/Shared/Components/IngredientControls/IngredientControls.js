import React, { Component } from 'react';
import Controls from '../Burger/Controls/Controls';
// import uniqid from 'uniqid';

export default class IngredientControls extends Component {
    render() {
        let markupIngs;
        let ings = {};
        let disabled = true;

        let style = this.props.hidePrice ? { display: 'none' } : null

        this.props.ingredients ?
            markupIngs = Object.keys(this.props.ingredients)
                .filter((el) => {
                    return this.props.ingredients[el].foodType !== this.props.NotfoodType;
                })
                .map((el2) => {
                    if (this.props.ingredients[el2].value > 0) {
                        disabled = false;
                        ings[el2] = {
                            name: el2,
                            _id: this.props.ingredients[el2]._id,
                            amount: this.props.ingredients[el2].value,
                        }
                    }
                    return (
                        <Controls name={el2} key={el2} items={this.props.ingredients[el2].value} photo={this.props.ingredients[el2].photo}
                            addIng={() => this.props.addIngredient(el2)}
                            removeIng={() => this.props.removeIngredient(el2)}
                        />
                    );
                }) : markupIngs = '';

        return (
            <div className={`controls__ingredients ${this.props.className}`}>
                <p className="controls__price" style={style}>
                    Total Price:&nbsp;
                <span className="controls__price-value" >
                        Rs&nbsp;{this.props.totalBurgerPrice}
                    </span>
                </p>
                {markupIngs}
                <button
                    type="button"
                    onClick={this.props.danger} className="btn btn__danger--outline"> {this.props.dangerField} </button>
                <button
                    type={this.props.successBtnType ? this.props.successBtnType : "button"}
                    onClick={() => this.props.success(ings, this.props.foodType)} disabled={disabled}
                    className={`btn btn__success${disabled === true ? "--outline-disabled" : "--outline"}`}>{this.props.successField}</button>
            </div >
        )
    }
}
