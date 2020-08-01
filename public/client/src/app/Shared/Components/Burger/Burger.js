import React, { Component } from "react";
import Ingredient from "./Ingredients/Ingredients";
import uniqid from "uniqid";

class Burger extends Component {
  render() {
    let ingredients = null;
    if (this.props.ingredients) {
      ingredients = Object.keys(this.props.ingredients).map((el) => {
        return [...Array(this.props.ingredients[el].value)].map(() => {
          return <Ingredient key={uniqid()} ingredient={el} />;
        });
      });
    }

    return (
      <div className="burger">
        <Ingredient ingredient="breadTop" />
        {ingredients}
        <Ingredient ingredient="breadBottom" />
      </div>
    );
  }
}

export default Burger;
