import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ingredientActions from './../../../../Store/actions/ingredients';

import ListItem from './../components/IngredientItem';
import ConfirmModal from './../../../../Shared/Components/Modal/ConfirmModal';
import Loader from '../../../../Shared/Components/Loader/Loader';
import Backdrop from '../../../../Shared/Components/BackDrop/BackDrop';

class Ingredients extends Component {
    state = {
        isLoading: false,
        showModal: false,
        message: '',
        type: '',
        ingId: ''
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        this.timer = setTimeout(() => {
            this.props.getAllIngredients();
            this.setState({ isLoading: false })
        }, 2000)
    }

    showModal = (message, type, ingId) => {
        this.setState({ showModal: true, message, type, ingId })
    }

    closeModal = () => {
        this.setState({ showModal: false, message: '', type: '', ingId: '' })
    }

    onCreateHandler = () => this.props.history.push(`${this.props.match.url}/new`)

    onEditHandler = (id) => this.props.history.push(`${this.props.match.url}/${id}`)

    onDeleteHandler = (ingId) => {
        const message = 'Are you sure you want to delete this ingredient ? ';
        this.showModal(message, 'delete', ingId)
    }

    onSubmitHandler = (type) => {
        if (type === 'delete') {
            this.props.deleteIngredient(this.state.ingId)
        }
    }

    render() {
        if (this.props.deleteIngredientInit || this.state.isLoading) {
            return <div className="dashboard__dashboard u-flex-center u-vh-100 u-bg-white">
                <Loader />
            </div>
        }

        return (
            <React.Fragment>
                <ConfirmModal
                    show={this.state.showModal}
                    close={this.closeModal}
                    message={this.state.message}
                    edit={this.props.message}
                    type={this.state.type}
                    submit={this.onSubmitHandler}
                />
                <Backdrop show={this.state.showModal} close={this.closeModal} />
                <div className="u-vh-100 ingredients dashboard__dashboard">
                    <h2 className="ingredients__heading heading-1 u-text-primary">
                        Manage Ingredients
                </h2>
                    <button className="btn btn__tertiary-goTo ingredients__create-btn"
                        onClick={this.onCreateHandler}>
                        Create Ingredient
                </button>
                    <div className="ingredients__list">
                        {this.props.ingredients && this.props.ingredients.map(el => {
                            return <ListItem
                                _id={el._id}
                                name={el.name}
                                image={el.photo}
                                price={el.price}
                                foodType={el.foodType}
                                edit={this.onEditHandler}
                                delete={this.onDeleteHandler}
                            />
                        })}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        ingredients: state.ingredients.ingredients,

        deleteIngredientStatus: state.ingredients.deleteIngredientStatus,
        deleteIngredientInit: state.ingredients.deleteIngredientsInit,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllIngredients: () => dispatch(ingredientActions.getIngredients()),
        deleteIngredient: (id) => dispatch(ingredientActions.deleteIngredient(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Ingredients);