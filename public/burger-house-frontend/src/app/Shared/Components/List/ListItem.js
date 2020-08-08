import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = props => {
    return (
        <Link to={props.to ? props.to : '#'} className={`list__item ${props.className}`} style={{ listStyle: 'none' }} >
            {props.children}
        </Link>
    )
}

export default ListItem
