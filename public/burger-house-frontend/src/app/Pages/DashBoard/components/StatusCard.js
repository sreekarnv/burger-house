import React from 'react'

const StatusCard = props => {
    return (
        <div className={`card__status ${props.className}`}>
            <h2>{props.heading}</h2>
            <p>{props.value}</p>
        </div>
    )
}


export default StatusCard
