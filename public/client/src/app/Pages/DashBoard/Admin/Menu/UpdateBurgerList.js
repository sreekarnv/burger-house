import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from '../../../../Shared/Components/Card/CardMenu';
import Loader from '../../../../Shared/Components/Loader/Loader';

import * as menuActions from '../../../../Store/actions/menu';

class UpdateBurgerList extends Component {
    state = {
        isLoading: false
    }

    async componentDidMount() {
        this.setState({ isLoading: true })
        await this.props.initMenu();
        this.timer = setTimeout(() => {
            this.setState({ isLoading: false })
        }, 1000)
    }

    onChooseMenuHandler = (id) => {
        this.props.history.push(`/dashboard/manage-menu/${id}`);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    toCreateBurger = () => {
        this.props.history.push(`${this.props.match.url}/new`);
    }

    render() {
        let menuList;
        let burgers = this.props.menu;

        if (burgers.length > 0) {
            menuList = <div className="update-menu__list">
                {Object.keys(burgers).map(el => {
                    return <Card
                        _id={burgers[el]._id}
                        initialprice={burgers[el].price}
                        price={burgers[el].totalprice}
                        key={burgers[el]._id}
                        title={burgers[el].title} foodType={burgers[el].foodType}
                        ingredients={burgers[el].ingredients} burgerImage={burgers[el].photo}
                        items={burgers[el].items}
                        chooseBurger={this.onChooseMenuHandler}
                    />
                })}
            </div>
        } else {
            menuList = <div className="update-menu__list update-menu__list--empty ">
                <h4>You have no items in menu</h4>
            </div>
        }


        if (this.props.loading || this.state.isLoading) {
            return <div
                className="update-menu dashboard__dashboard u-vh-100 u-flex-center u-bg-white">
                <Loader /></div>
        }

        return (
            <div className="update-menu dashboard__dashboard">
                <h2 className="update-menu__heading heading-1">Update Menu</h2>
                <button
                    onClick={this.toCreateBurger}
                    className="update-menu__btn btn btn__tertiary-goTo">Create a New Burger</button>
                {menuList}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        menu: state.menu.Burgers,
        loading: state.menu.loading,
        user: state.auth.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initMenu: () => dispatch(menuActions.initBurgers())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(UpdateBurgerList);