import React from 'react';

import ListItem from '../../../../Shared/Components/List/ListItem';

const ListItemOrders = props => {
    let date = `${props.date}`.split('T');
    let hours = new Date(props.date).getHours()
    let minutes = new Date(props.date).getMinutes()
    let seconds = new Date(props.date).getSeconds()
    let time = `${hours}:${minutes}:${seconds}`

    date = `${date[0]}\n${time}`

    return (
        <ListItem
            className={`orders__list-item orders__list-item-${props.status}`} to={props.to} >
            <p className="orders__list-item-date">{date}</p>
            <h3 className="orders__list-item-name">#{props.id} ({props.results})</h3>
            <h2 className="orders__list-item-price">Rs {props.price}</h2>
        </ListItem>
    )
}

export default ListItemOrders;




