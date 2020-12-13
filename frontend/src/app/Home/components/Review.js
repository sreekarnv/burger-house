import React from 'react';

const Review = props => {
    return (
        <div className="review">
            <div className="review__user-details">
                <img className="review__user-image" src={props.img} alt="User" />
                <h4 className="review__user-name">{props.name}</h4>
                <p className="review__ratings">{props.rating.toFixed(1)} / 5.0</p>
            </div>
            <p className="review__text">{props.comment}</p>
        </div>
    )
}

export default Review;
