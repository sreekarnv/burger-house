import React from 'react';
import { ReactComponent as Trash } from '../../../assets/icons/trash.svg';

const trash = props => {
    return (
        <Trash className={`${props.className}`} />
    )
}

export default trash;
