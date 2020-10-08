import React from 'react';

const Alert = props => {
    return (
        <div className={`alert alert__${props.show} alert--${props.status} ${props.className}`}>
            {props.message}
        </div>
    );
};

export default Alert;
