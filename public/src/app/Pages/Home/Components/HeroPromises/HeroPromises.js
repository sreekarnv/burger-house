import React from 'react';
import Tick from '../../../../Shared/Icons/Tick';

const heroPromises = props => {
    return (
        <div className={`hero__promises-item hero__promises-item-${props.pk}`}>
            <Tick className={`icon-check icon`} />
            <p>{props.para}</p>
        </div>
    )
}

export default heroPromises;
