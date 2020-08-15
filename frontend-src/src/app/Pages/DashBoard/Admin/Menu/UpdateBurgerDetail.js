import React, { Component } from 'react';
import { connect } from 'react-redux';
import IngredientControls from '../../../../Shared/Components/IngredientControls/IngredientControls';
import Burger from '../../../../Shared/Components/Burger/Burger';

import Input from '../../../../Shared/Components/Form/Input';

import * as menuActions from '../../../../Store/actions/menu';
import Loader from '../../../../Shared/Components/Loader/Loader';
import { onChangeFormInput } from '../../../../Shared/Utils/formInput';

import Backdrop from '../../../../Shared/Components/BackDrop/BackDrop';
import ConfirmModal from '../../../../Shared/Components/Modal/ConfirmModal';
import Alert from '../../../../Shared/Components/Alert/Alert';



const setMenuIngredients = (menu, id, ingredientsFetched) => {
    let burger;
    let ingredients = {};

    Object.keys(menu).map(el => {
        if (menu[el]._id === id) {
            burger = menu[el]

            let menuIngs = {}
            menu[el].ingredients.map(ing => {
                return menuIngs[ing.name] = {
                    ...ing
                }
            })

            Object.keys(ingredientsFetched).map(el2 => {
                ingredients[el2] = {
                    ...ingredientsFetched[el2],
                    value: menuIngs[el2] ? menuIngs[el2].amount : 0
                }
                return ingredients;
            })
        }
        return burger;
    })
    return { ingredients, burger };
}


class UpdateBurgerDetail extends Component {
    state = {
        isLoading: false,
        formInput: {
            title: '',
            price: ''
        },
        photo: '',
        previewPhoto: '',
        showModal: false,
        message: '',
        type: '',
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
            const { ingredients, burger } = setMenuIngredients(this.props.menu, this.props.match.params.id, this.props.ingredients)
            let formInput = { title: burger.title, price: burger.price }
            await this.props.setIngredients(ingredients)
            this.setState({ formInput, isLoading: false, previewPhoto: burger.photo })
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

    uploadFileHandler = async () => {
        const formData = new FormData()
        formData.append(
            'photo',
            this.state.photo,
            this.state.photo.name
        )
        formData.append('_id', this.props.match.params.id);
        await this.props.updateBurger(formData);
    }

    resetIngredients = async () => {
        const { ingredients } = setMenuIngredients(this.props.menu, this.props.match.params.id, this.props.ingredients);
        await this.props.setIngredients(ingredients);
    }

    updateBurgerIngredients = async (ings) => {
        let burger = {};
        burger['_id'] = this.props.match.params.id;
        let ingsArr = [];
        Object.keys(ings).map(el => {
            return ingsArr.push({ ...ings[el] })
        })
        burger['ingredients'] = ingsArr;
        await this.props.updateBurger(burger);
    }

    updateBurgerDetails = async e => {
        e.preventDefault();
        let burger = new FormData();
        burger.append('_id', this.props.match.params.id)
        burger.append('title', this.state.formInput.title)
        burger.append('price', this.state.formInput.price)
        await this.props.updateBurger(burger);

        if (this.props.updateBurgersStatus.status === 'success') {
            const message = 'Updated Burger Successfully';
            this.showAlertHandler(message, 'success')
            this.updateTimer = setTimeout(() => {
                this.props.history.push('/dashboard/manage-menu');
            }, 2000)
        } else {
            this.showAlertHandler(this.props.deleteBurgerStatus.message, 'fail')
        }
    }

    showModal = (message, type) => {
        this.setState({ showModal: true, message, type })
    }

    closeModal = () => {
        this.setState({ showModal: false, message: '', type: '' })
    }

    onDeleteHandler = () => {
        const message = 'Are you sure you want to delete this burger ? ';
        this.showModal(message, 'delete')
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        clearTimeout(this.updateTimer);
    }

    onDeleteConfirmHandler = async (type) => {
        if (type === 'delete') {
            await this.props.deleteBurger(this.props.match.params.id);
            if (this.props.deleteBurgerStatus === 'success') {
                this.props.history.push('/dashboard/manage-menu');
            } else {
                this.showAlertHandler(this.props.deleteBurgerStatus.message, 'fail')
            }
        }
    }


    render() {
        let { burger } = setMenuIngredients(this.props.menu, this.props.match.params.id, this.props.menuIngs);
        let ingredients = this.props.menuIngs;

        if (this.state.isLoading) {
            return <div className="u-flex-center dashboard__dashboard u-bg-white u-vh-100"><Loader /></div>
        }

        return (
            <React.Fragment>
                {this.state.alert.status && <Alert
                    close={this.onCloseHandler()}
                    show={this.state.alert.show}
                    status={this.state.alert.status}
                    message={this.state.alert.message}
                />}
                {<ConfirmModal
                    show={this.state.showModal}
                    close={this.closeModal}
                    message={this.state.message}
                    edit={this.props.message}
                    type={this.state.type}
                    submit={this.onDeleteConfirmHandler}
                />}
                <Backdrop show={this.state.showModal} close={this.closeModal} />
                <div className="dashboard__dashboard update-menu__detail">
                    <h2 className="heading-1 update-menu__detail-heading">
                        Update {burger.title} Recipe
                </h2>
                    <div className="update-menu__detail-image-bg">
                        <img src={this.state.previewPhoto} className="update-menu__detail-image-bg-image" alt={burger.title} />
                        <input type="file" onChange={this.changeFileHandler} style={{ display: 'none' }} id="photo" name="photo" />
                        <label className="btn btn__tertiary-goTo btn-sm" htmlFor="photo" >Choose an Image</label>
                        <button onClick={this.uploadFileHandler} className="btn btn__success">Upload</button>
                    </div>
                    <form className="update-menu__detail-form" autoComplete="off" onSubmit={this.updateBurgerDetails}>
                        <Input
                            inputtype="input"
                            type="text"
                            name="title"
                            label="name of ingredient"
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

                        <Input
                            inputtype="submit"
                            value="save details"
                            variant="tertiary"
                        />

                    </form>
                    <div className="custom-burger">
                        <Burger ingredients={ingredients} />
                        <div className="controls">
                            <IngredientControls
                                ingredients={ingredients}
                                NotfoodType={`${burger.foodType}`.startsWith('v') ? 'non-vegetarian' : 'vegetarian'}
                                foodType={burger.foodType}
                                hidePrice
                                totalBurgerPrice={burger.price}
                                success={this.updateBurgerIngredients}
                                danger={this.resetIngredients}
                                successField="Save Ingredients"
                                dangerField="Reset Ingredients"
                                addIngredient={this.props.addIngredient}
                                removeIngredient={this.props.removeIngredient}
                                successBtnType="submit"
                            />
                        </div>
                    </div>
                    <div className="delete__burger">
                        <h4 className="heading-2 delete__burger-heading">
                            Delete this Burger
                        </h4>
                        <button className="btn btn__danger--outline"
                            onClick={this.onDeleteHandler}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.menu.ingredients,
        menu: state.menu.Burgers,
        menuIngs: state.menu.menuIngs,
        updateBurgersStatus: state.menu.updateBurgersStatus,
        deleteBurgerStatus: state.menu.deleteBurgerStatus
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchIngredients: () => dispatch(menuActions.fetchIngredients()),
        addIngredient: (name) => dispatch(menuActions.addIngredient(name)),
        removeIngredient: (name) => dispatch(menuActions.removeIngredient(name)),
        setIngredients: (ings) => dispatch(menuActions.setMenuIngs(ings)),
        updateBurger: (data) => dispatch(menuActions.updateBurger(data)),
        deleteBurger: (burger) => dispatch(menuActions.deleteBurger(burger))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBurgerDetail);