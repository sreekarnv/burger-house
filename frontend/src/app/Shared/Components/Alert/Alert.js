import React from "react";

const Alert = ({ children, variant }) => {
	return <div className={`alert alert--${variant}`}>{children}</div>;
};

export default Alert;
