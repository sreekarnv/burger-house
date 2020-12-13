import React from "react";

const Backdrop = (props) => {
	const { show, closeHandler } = props;

	return (
		<div
			onClick={closeHandler}
			className={`backdrop ${show && "backdrop--show"}`}></div>
	);
};

export default Backdrop;
