import React from "react";

const BaseListItem = (props) => {
	return (
		<div
			onClick={props.onClick}
			className={`base-list-item ${props.className}`}>
			{props.children}
		</div>
	);
};

export default BaseListItem;
