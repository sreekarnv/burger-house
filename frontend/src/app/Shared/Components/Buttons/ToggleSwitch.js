import React from "react";

const ToggleSwitch = React.memo((props) => {
	const { onToggle, active } = props;

	return (
		<>
			<label
				className={`toggle-switch ${active && "toggle-switch__active"}`}
				onClick={onToggle}>
				<div className='toggle-switch__slider'></div>
			</label>
		</>
	);
});

export default ToggleSwitch;
