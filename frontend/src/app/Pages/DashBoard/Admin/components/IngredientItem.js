import React from 'react'
import ListItem from '../../../../Shared/Components/List/ListItem'
import Edit from '../../../../Shared/Icons/Edit';
import Trash from '../../../../Shared/Icons/Trash';


const IngredientItem = props => {
    return (
        <ListItem className="ingredients__list-item">
            <img src={props.image} alt={props.name} className="icon" />
            <h3 className="ingredients__list-item-name">
                {props.name}
            </h3>
            <p className="ingredients__list-item-price">Rs {props.price}</p>
            <p className={`ingredients__list-item-diet u-text-${props.foodType}`}>
                {props.foodType !== 'none' ? props.foodType : '---'}
            </p>
            <button onClick={() => props.edit(props._id)} className="ingredients__list-item-edit btn btn__edit">
                <Edit />
            </button>

            <button
                onClick={() => props.delete(props._id)}
                className="ingredients__list-item-delete btn btn__delete"><Trash />
            </button>

        </ListItem>
    )
}

export default IngredientItem
