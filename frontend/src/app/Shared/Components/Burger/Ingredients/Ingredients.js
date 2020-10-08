import React, { Component } from 'react';

class Ingredients extends Component {
    render() {
        let markup;

        switch (this.props.ingredient) {
            case 'breadTop':
                markup = <div className="bread-top"></div>
                break;
            case 'breadBottom':
                markup = <div className="bread-bottom"></div>
                break;
            case 'chicken':
                markup = <div className="chicken"></div>
                break;
            case 'aloo':
                markup = <div className="aloo"></div>
                break;
            case 'lettuce':
                markup = <div className="lettuce"></div>
                break;
            case 'paneer':
                markup = <div className="paneer"></div>
                break;
            case 'cheese':
                markup = <div className="cheese"></div>
                break;
            case 'tomatoes':
                markup = <div className="tomatoes"></div>
                break;
            default:
                markup = null;
                break;
        }
        return markup;
    }
}

export default Ingredients;
