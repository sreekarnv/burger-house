import React from "react";
import BaseListItem from "./../../../shared/components/BaseListItem/BaseListItem";

const MONTHS = [
	"Jan",
	"Feb",
	"March",
	"April",
	"May",
	"June",
	"July",
	"Augu",
	"Sept",
	"Oct",
	"Nov",
	"Dec",
];

const OrderListItem = (props) => {
	const { order, onClick } = props;

	return (
		<BaseListItem className='order-list-item' onClick={onClick}>
			<div className='order-list-item__date'>
				<span>{new Date(order.createdAt).getDate()}</span>&nbsp;
				<span>{MONTHS[new Date(order.createdAt).getMonth()]}</span>&nbsp;
				<span>{new Date(order.createdAt).getFullYear()}</span>
			</div>
			<p className='order-list-item__id'>#{order._id}</p>
			<h3 className='order-list-item__price'>Rs {order.price}</h3>
			<p
				className={`order-list-item__status order-list-item__status--${order.status}`}>
				{order.status}
			</p>
		</BaseListItem>
	);
};

export default OrderListItem;
