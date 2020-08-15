import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CustomBurgerHome from './pages/CustomBurgerHome';
import customBurgerBuilder from './pages/customBurgerBuilder';

class CustomBurgerNew extends Component {
    render() {

        return (
            <React.Fragment>
                <Switch>
                    <Route path={`${this.props.match.url}`} exact component={CustomBurgerHome} />
                    <Route path={`${this.props.match.url}/veg`} component={customBurgerBuilder} />
                    <Route path={`${this.props.match.url}/non-veg`} component={customBurgerBuilder} />
                </Switch>
            </React.Fragment>
        )
    }
}

export default CustomBurgerNew;