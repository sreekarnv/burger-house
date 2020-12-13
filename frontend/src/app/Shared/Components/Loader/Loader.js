import React from "react";

const Loader = (props) => {
	const { fullScreen } = props;

	const loader = (
		<div className='lds-ellipsis'>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);

	if (fullScreen) {
		return (
			<div style={{ gridColumn: "1 / -1" }} className='loader__full-screen'>
				{loader}
			</div>
		);
	}

	return loader;
};

export default Loader;
