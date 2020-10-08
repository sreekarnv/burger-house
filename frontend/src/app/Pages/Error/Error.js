import React from 'react'

const Error = props => {
    return (
        <div className="error">
            <h2 className="error__text">
                Something Went Wrong. Please Try again Later
            </h2>
            <button
                onClick={props.history.goBack}
                className="btn btn__tertiary">Go Back</button>
        </div>
    )
}

export default Error
