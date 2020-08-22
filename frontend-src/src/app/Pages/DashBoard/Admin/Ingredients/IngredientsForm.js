import React, { Component } from 'react';
import Input from '../../../../Shared/Components/Form/Input';

import { onChangeFormInput } from '../../../../Shared/Utils/formInput';
import { connect } from 'react-redux';

import * as ingredientActions from '../../../../Store/actions/ingredients';
import Loader from '../../../../Shared/Components/Loader/Loader';
import Alert from '../../../../Shared/Components/Alert/Alert';
// import { PureComponent } from 'react';

class IngredientsCreate extends Component {
    state = {
        formInput: {
            name: '',
            price: '',
            foodType: 'none',
            photo: ''
        },
        previewPhoto: '',
        fileUploaded: false,
        alert: {
            show: false,
            status: '',
            message: '',
        },
    }

    async componentDidMount() {
        if (!this.props.location.pathname.startsWith('/dashboard/manage-ingredients/new')) {
            await this.props.getIngredient(this.props.match.params.id);
            if (this.props.getIngredientStatus === 'success') {
                this.setState({
                    formInput: {
                        name: this.props.ingredient.name,
                        price: this.props.ingredient.price,
                        foodType: this.props.ingredient.foodType,
                        photo: this.props.ingredient.photo
                    },
                    previewPhoto: this.props.ingredient.photo
                })
            }
        }
    }

    onChangeHandler = e => {
        let formInput = onChangeFormInput(e, { ...this.state })
        this.setState({ ...formInput })
    }

    onFileChangeHandler = e => {
        this.setState({
            ...this.state,
            formInput: {
                ...this.state.formInput,
                photo: e.target.files[0]
            },
            fileUploaded: true,
            previewPhoto: URL.createObjectURL(e.target.files[0])
        })
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

    onSubmitHandler = e => {
        if (this.props.location.pathname.startsWith('/dashboard/manage-ingredients/new')) {
            return this.onCreateHandler(e);
        } else {
            return this.onUpdateHandler(e);
        }
    }

    onCreateHandler = async e => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', this.state.formInput.name);
        formData.append('price', this.state.formInput.price);
        formData.append('foodType', this.state.formInput.foodType);
        formData.append('photo', this.state.formInput.photo);

        await this.props.createIngredient(formData);

        let message, status;
        if (this.props.createIngredientsStatus.status === 'success') {
            status = this.props.createIngredientsStatus.status
            message = 'Ingredient created Successfully'
        } else {
            status = this.props.createIngredientsStatus.status;
            message = this.props.createIngredientsStatus.message;
        }
        this.showAlertHandler(message, status)
    }

    onUpdateHandler = async e => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', this.state.formInput.name);
        formData.append('price', this.state.formInput.price);
        formData.append('foodType', this.state.formInput.foodType);

        if (this.state.fileUploaded) {
            formData.append('photo', this.state.formInput.photo);
        }

        await this.props.updateIngredient(formData, this.props.match.params.id);

        let message, status;
        if (this.props.updateIngredientsStatus.status === 'success') {
            status = this.props.updateIngredientsStatus.status
            message = 'Updated Ingredient Successfully'

            this.setState({
                formInput: {
                    ...this.state.formInput,
                    name: this.props.ingredient.name,
                    foodType: this.props.ingredient.foodType,
                    price: this.props.ingredient.price,
                    photo: this.props.ingredient.photo
                },
                previewPhoto: this.props.ingredient.photo
            })

        } else {
            status = this.props.updateIngredientsStatus.status;
            message = this.props.updateIngredientsStatus.message;
        }
        this.showAlertHandler(message, status)
    }

    render() {

        if (this.props.createIngredientsInit ||
            this.props.updateIngredientsInit ||
            this.props.getIngredientInit) {
            return <div className="dashboard__dashboard u-vh-100 u-bg-white u-flex-center">
                <Loader />
            </div>
        }

        return (
            <React.Fragment>
                {this.state.alert.status && <Alert
                    close={this.onCloseHandler()}
                    show={this.state.alert.show}
                    status={this.state.alert.status}
                    message={this.state.alert.message}
                />}
                <div className=" dashboard__dashboard ingredients__form">
                    <h2 className="heading-1 u-text-primary ingredients__form-heading">
                        {this.props.location.pathname.startsWith('/dashboard/manage-ingredients/new')
                            ? 'Create a New Ingredient' : `Update Ingredient ${this.state.formInput.name}`}
                    </h2>
                    <button
                        onClick={() => this.props.history.goBack()}
                        className="btn  btn__tertiary-back ingredients__form-back-btn">
                        <span>&larr;</span>Back
                    </button>
                    <form className="ingredients__form-form" autoComplete="off"
                        onSubmit={this.onSubmitHandler}
                    >
                        <Input
                            inputtype="input"
                            type="text"
                            name="name"
                            label="name"
                            value={this.state.formInput.name}
                            onChange={this.onChangeHandler}
                        />

                        <Input
                            inputtype="input"
                            type="number"
                            name="price"
                            label="price"
                            value={this.state.formInput.price}
                            onChange={this.onChangeHandler}
                        />

                        <div className="form__group">
                            <label htmlFor="foodType" className="form__label">Diet</label>
                            <select name="foodType" id="foodType" className="form__input"
                                value={this.state.formInput.foodType}
                                onChange={this.onChangeHandler}
                            >
                                <option value="none">None</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="non-vegetarian">Non Vegetarian</option>
                            </select>
                            <small className="form__small">Select none if you want that ingredient to appear in both veg and non-veg sections</small>
                        </div>

                        <div className="form__group u-flex-between">
                            <div>
                                <input type="file" id="photo" onChange={this.onFileChangeHandler} style={{ display: 'none' }} />
                                <label htmlFor="photo" className="btn btn__tertiary-goTo btn__sm">Choose Image</label>
                            </div>
                            <div className="ingredients-preview-img-bg ">
                                <img src={this.state.previewPhoto} className="ingredients-preview-img-image" alt={this.state.formInput.name} />
                            </div>
                        </div>

                        <Input
                            inputtype="submit"
                            variant="tertiary"
                            value="Save Ingredient"
                        />
                    </form>
                </div>
            </React.Fragment>
        )
    }
}



const mapStateToProps = state => {
    return {
        ingredient: state.ingredients.ingredient,

        getIngredientStatus: state.ingredients.getIngredientStatus,
        getIngredientInit: state.ingredients.getIngredientInit,

        createIngredientsStatus: state.ingredients.createIngredientsStatus,
        createIngredientsInit: state.ingredients.createIngredientsInit,

        updateIngredientsStatus: state.ingredients.updateIngredientsStatus,
        updateIngredientsInit: state.ingredients.updateIngredientsInit,


    }
}

const mapDispatchToProps = dispatch => {
    return {
        getIngredient: (id) => dispatch(ingredientActions.getIngredient(id)),
        createIngredient: (ing) => dispatch(ingredientActions.createIngredient(ing)),
        updateIngredient: (ing, id) => dispatch(ingredientActions.updateIngredient(ing, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientsCreate);