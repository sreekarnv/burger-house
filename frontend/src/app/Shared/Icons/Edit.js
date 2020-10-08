import React from 'react';
import { ReactComponent as Edit } from '../../../assets/icons/edit.svg';

const tick = props => {
    return (
        <Edit className={props.className} />
    )
}

export default tick;
