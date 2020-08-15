import React from 'react';
import { ReactComponent as Tick } from '../../../assets/icons/check.svg';

const tick = props => {
    return (
        <Tick className={props.className} />
    )
}

export default tick;
