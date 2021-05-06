import './switch.scss';

import * as React from 'react';

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
						active ? `switch__active  u-bg-${color}` : ''
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
