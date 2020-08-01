import React, { Component } from 'react';
import { connect } from 'react-redux';
import IngredientControls from '../../../../Shared/Components/IngredientControls/IngredientControls';
import Burger from '../../../../Shared/Components/Burger/Burger';

import Input from '../../../../Shared/Components/Form/Input';

import * as menuActions from '../../../../Store/actions/menu';
import Loader from '../../../../Shared/Components/Loader/Loader';
import { onChangeFormInput } from '../../../../Shared/Utils/formInput';
import Alert from '../../../../Shared/Components/Alert/Alert';


const setMenuIngredients = (ingredientsFetched) => {
    let ingredients = {};
    Object.keys(ingredientsFetched).map(el2 => {
        ingredients[el2] = {
            ...ingredientsFetched[el2],
            value: 0
        }
        return ingredients;
    })
    return ingredients;
}

class CreateBurger extends Component {
    state = {
        isLoading: false,
        formInput: {
            title: '',
            price: '',
            amount: '',
            foodType: 'vegetarian',
            ingredients: null
        },
        previewPhoto: '',
        photo: '',
        alert: {
            show: false,
            status: '',
            message: '',
        },
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        this.timer = setTimeout(async () => {
            await this.props.fetchIngredients();
            let ingredients = setMenuIngredients(this.props.ingredients);
            await this.props.setIngredients(ingredients);
            this.setState({ isLoading: false })
        }, 2000)
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

    onChangeHandler = e => {
        let formInput = onChangeFormInput(e, { ...this.state })
        this.setState({ ...formInput })
    }

    changeFileHandler = e => {
        this.setState({ previewPhoto: URL.createObjectURL(e.target.files[0]), photo: e.target.files[0] })
    }

    resetIngredients = async () => {
        this.showAlertHandler('Ingredients were set to default', 'fail');
        const ingredients = setMenuIngredients(this.props.ingredients);
        await this.props.setIngredients(ingredients);
    }

    addIngredientsToBurger = async (ings) => {
        this.showAlertHandler('Ingredients were added successfully', 'success');
        let ingsArr = [];
        Object.keys(ings).map(el => {
            return ingsArr.push({ ...ings[el] })
        })
        this.setState({
            formInput: {
                ...this.state.formInput,
                ingredients: ingsArr
            }
        })
    }

    submitBurgerHandler = async e => {
        e.preventDefault();

        if (!this.state.formInput.ingredients) {
            return this.showAlertHandler('Oops You forgot to add or save Ingredients', 'fail')
        }

        const burger = new FormData();
        burger.append('title', this.state.formInput.title);
        burger.append('price', this.state.formInput.price);
        burger.append('foodType', this.state.formInput.foodType);
        burger.append('ingredients', JSON.stringify(this.state.formInput.ingredients));

        if (this.state.photo !== '') {
            burger.append('photo', this.state.photo, this.state.photo.name)
        }

        await this.props.createBurger(burger);

        this.setState({
            photo: '',
            previewPhoto: '',
            formInput: {
                title: '',
                price: '',
                amount: '',
                foodType: 'vegetarian',
                ingredients: null
            }
        })

        this.resetIngredients(this.props.ingredients);
        if (this.props.createBurgerStatus.status === 'success') {
            this.showAlertHandler('Added Burger to menu successfully', 'success');
            this.successTimer = setTimeout(() => {
                return this.props.history.replace('/dashboard/manage-menu')
            }, 2000)
        } else {
            this.showAlertHandler(this.props.createBurgerStatus.message, 'fail')
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        let ingredients = this.props.menuIngs;

        if (this.state.isLoading || this.props.createBurgerInit) {
            return <div className="dashboard__dashboard u-flex-center u-vh-100">
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
                <div className="burger__new dashboard__dashboard">
                    <h2 className="heading-1 burger__new-heading">
                        Create New Burger
                    </h2>

                    <form className="burger__new-create" autoComplete="off"
                        onSubmit={this.submitBurgerHandler}
                    >
                        <div className="burger__new-create-form">
                            <Input
                                inputtype="input"
                                type="text"
                                name="title"
                                label="Name"
                                value={this.state.formInput.title}
                                onChange={this.onChangeHandler}
                            />

                            <Input
                                inputtype="input"
                                type="number"
                                name="price"
                                label="price"
                                onChange={this.onChangeHandler}
                                value={this.state.formInput.price}
                            />

                            <div className="form__group">
                                <label htmlFor="foodType">Diet</label>
                                <select name="foodType" id="foodType" onChange={this.onChangeHandler}
                                    value={this.state.formInput.foodType} className="form__input">
                                    <option value="vegetarian">Vegetarian</option>
                                    <option value="non-vegetarian">Non Vegetarian</option>
                                </select>
                            </div>
                        </div>

                        <div className="custom-burger">
                            <Burger ingredients={ingredients} />
                            <div className="controls">
                                <IngredientControls
                                    ingredients={ingredients}
                                    NotfoodType={`${this.state.formInput.foodType}`.startsWith('v') ? 'non-vegetarian' : 'vegetarian'}
                                    foodType={this.state.formInput.foodType}
                                    hidePrice
                                    success={this.addIngredientsToBurger}
                                    danger={this.resetIngredients}
                                    successField="Confirm Ingredients"
                                    dangerField="Reset Ingredients"
                                    addIngredient={this.props.addIngredient}
                                    removeIngredient={this.props.removeIngredient}
                                />
                            </div>
                        </div>

                        <div className="burger__new-create-image-bg">
                            <input type="file" style={{ display: 'none' }}
                                name="photo" id="photo" onChange={this.changeFileHandler} />
                            <label htmlFor="photo" className="btn btn__tertiary-goTo">Upload Image</label>

                            {this.state.previewPhoto !== ''
                                ? <img src={this.state.previewPhoto} alt="burger" className="burger__new-create-image-bg-image" />
                                : <div className="bg-image"></div>
                            }
                        </div>

                        <button type="submit" className="burger__new-create-btn btn btn__tertiary">
                            Save Burger
                        </button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        ingredients: state.menu.ingredients,
        menuIngs: state.menu.menuIngs,
        createBurgerStatus: state.menu.createBurgerStatus,
        createBurgerInit: state.menu.createBurgerInit,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchIngredients: () => dispatch(menuActions.fetchIngredients()),
        addIngredient: (name) => dispatch(menuActions.addIngredient(name)),
        removeIngredient: (name) => dispatch(menuActions.removeIngredient(name)),
        setIngredients: (ings) => dispatch(menuActions.setMenuIngs(ings)),
        createBurger: (burger) => dispatch(menuActions.createBurger(burger)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBurger);