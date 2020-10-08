import React from 'react'

const AddorRemoveButton = props => {
    let disabled = false;
    let classes;
    if (props.items === 0) {
        disabled = true;
        classes = "btn btn__primary-disabled";
    }
    return (
        <div className={`btn__addOrRemove ${props.className}`}>
            <button type="button" onClick={props.addItem} className={props.classes}>+</button>
            <p className={`u-text-tertiary ${props.valueClass}`}>{props.items}</p>
            <button type="button" onClick={props.removeItem} disabled={disabled} className={classes || props.classes}>-</button>
        </div>
    );
};

export default AddorRemoveButton;
