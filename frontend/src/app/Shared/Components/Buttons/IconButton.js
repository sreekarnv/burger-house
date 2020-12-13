import React from "react";

const IconButton = ({ children, className, lg, color, onClick, id }) => {
	return (
		<div
			onClick={onClick}
			id={id}
			className={`icon-button ${color && `u-bg-${color}`} ${
				lg && "icon-button__lg"
			} 
        
        ${className}`}>
			{children}
		</div>
	);
};

export default IconButton;
