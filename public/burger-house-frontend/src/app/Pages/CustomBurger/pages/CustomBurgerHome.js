import React, { Component } from 'react';
import NonVeg from './../../../../assets/images/non-veg.jpg';
import Veg from './../../../../assets/images/veg.jpg';
import { Link } from 'react-router-dom';
import Loader from '../../../Shared/Components/Loader/Loader';


class CustomBurgerHome extends Component {
    state = {
        isLoading: false
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        this.timer = setTimeout(() => {
            this.setState({ isLoading: false })
        }, 1000)
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {

        if (this.state.isLoading) return <div className="u-flex-center u-vh-100"><Loader /></div>

        return (
            <section className="custom-burger__home">
                <div className="custom-burger__home-veg">
                    <span>
                        <Link to={this.props.match.url + '/veg'}>
                            <img className="custom-burger__home-img" src={Veg} alt="Veg" />
                        </Link>
                        <h3 className="u-text-success custom-burger__home-text custom-burger__home-text-veg">Vegetarian</h3>
                    </span>
                </div>

                <h2 className="custom-burger__home-heading">CHOOSE YOUR DIET</h2>

                <div className="custom-burger__home-non-veg">
                    <Link to={this.props.match.url + '/non-veg'}>
                        <img className="custom-burger__home-img" src={NonVeg} alt="Non Veg" />
                    </Link>
                    <h3 className="u-text-danger custom-burger__home-text">Non Vegetarian</h3>
                </div>
            </section>
        )
    }
}

export default CustomBurgerHome;
