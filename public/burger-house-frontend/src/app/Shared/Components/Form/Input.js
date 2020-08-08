import React from 'react'

const Input = props => {
    if (props.inputtype === 'input') {
        let required = props.required === false ? false : true;
        return (
            <div className={`form__group `}>
                <label className="form__label">{props.label}</label>
                <input
                    type={props.type}
                    name={props.name}
                    id={props.name}
                    placeholder={props.placeholder}
                    className={`form__${props.inputtype} ${props.className}`}
                    onChange={props.onChange}
                    minLength={props.minLength}
                    value={props.value}
                    required={required}
                />
            </div>
        )
    }

    if (props.inputtype === 'submit') {
        let markup = <input type="submit"
            value={props.value}
            className={`btn btn__${props.variant} ${props.className}`}
            {...props}
        />

        return (
            <div className={`form__group ${props.formGroupClass}`}>
                {markup}
            </div>
        )
    }
}

export default Input
