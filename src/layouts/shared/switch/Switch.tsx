import clsx from 'clsx';
import React from 'react';
import classes from './switch.module.scss';

const colors = {
	primary: 'u-bg-primary',
	secondary: 'u-bg-secondary',
	tertiary: 'u-bg-tertiary',
	success: 'u-bg-success',
	danger: 'u-bg-danger',
};

interface SwitchProps {
	onToggle: () => void;
	color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'danger';
	className?: string;
	active: boolean;
}

const Switch: React.FC<SwitchProps> = React.memo(
	({ active, onToggle, color = 'primary', className }) => {
		return (
			<>
				<label
					className={clsx([
						classes.root,
						active && classes['root--active'],
						active && colors[color],
						className,
					])}
					onClick={() => {
						onToggle();
					}}>
					<div className={classes.slider}></div>
				</label>
			</>
		);
	}
);

Switch.displayName = 'Switch';

export default Switch;
