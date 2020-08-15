import React from 'react'

const navbar = (props) => {
    return (
        <ul className={props.classNav}>
            {props.children}
        </ul>
    );
};

export default navbar;