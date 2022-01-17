import './add-remove-button.scss';
import { FiPlus, FiMinus } from 'react-icons/fi';
import * as React from 'react';

import IconButton from '../icon-button/IconButton';

type Props = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	leftOnClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
	rightOnClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const AddRemoveButton: React.FC<Props> = ({
	leftOnClick,
	rightOnClick,
	...props
}) => {
	return (
		<div className={`add-remove-btn ${props.className}`}>
			<IconButton onClick={leftOnClick}>
				<FiPlus className='u-text-dark' />
			</IconButton>
			<p>{props.children}</p>
			<IconButton onClick={rightOnClick}>
				<FiMinus className='u-text-dark' />
			</IconButton>
		</div>
	);
};

export default AddRemoveButton;
