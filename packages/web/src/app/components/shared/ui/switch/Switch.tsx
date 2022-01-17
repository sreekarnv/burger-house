import './switch.scss';

import * as React from 'react';

const colors = {
	primary: 'u-bg-primary',
	secondary: 'u-bg-secondary',
	tertiary: 'u-bg-tertiary',
	success: 'u-bg-success',
	danger: 'u-bg-danger',
};

interface Props {
	onToggle: () => void;
	color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'danger';
	className?: any;
	active: boolean;
}

const Switch: React.FC<Props> = React.memo(
	({ active, onToggle, color = 'primary', className }) => {
		return (
			<>
				<label
					className={`switch ${
						active ? `switch__active  ${colors[color]}` : ''
					} ${className}`}
					onClick={() => {
						onToggle();
					}}>
					<div className='switch__slider'></div>
				</label>
			</>
		);
	}
);

export default Switch;
