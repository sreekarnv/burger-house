import React from 'react';
import Tick from '../../shared/icons/Tick';

const HeroFeatures = props => {
    return (
        <div className={`home__header-feature-item home__header-feature-item-${props.pk}`}>
            <Tick className={`icon-check icon`} />
            <p>{props.para}</p>
        </div>
    )
}

export default HeroFeatures;
