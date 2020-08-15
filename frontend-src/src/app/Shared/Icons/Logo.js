import React from 'react';
import { ReactComponent as Logo } from '../../../assets/images/logo.svg';

const logo = props => {
    return (
        <Logo className={props.className} />
    )
}

export default logo;