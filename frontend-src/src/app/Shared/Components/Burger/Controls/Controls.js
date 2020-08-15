import React from 'react';
import AddorRemoveBtn from '../../Buttons/AddorRemoveButton';
const buildControl = props => {

    return (
        <div className="controls__ingredient">
            <img src={props.photo} alt="ingredient" className="controls__ingredient-img" />
            <p className="controls__ingredient-name">{props.name}</p>
            <AddorRemoveBtn
                addItem={props.addIng}
                removeItem={props.removeIng}
                items={parseInt(props.items)}
                classes="btn btn__primary btn__primary-round"
                valueClass="u-fontSize-2rem" />
        </div >
    )
}

export default buildControl;
