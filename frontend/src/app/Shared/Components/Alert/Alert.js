import React from "react";

const Alert = (props) => {
	const { children, variant } = props;

	return <div className={`alert alert--${variant}`}>{children}</div>;
};

export default Alert;
