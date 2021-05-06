import './add-remove-btn.scss';

import * as React from 'react';

import IconButton from '../icon-button/IconButton';
import MinusIcon from '../icons/MinusIcon';
import PlusIcon from '../icons/PlusIcon';

type Props = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	leftOnClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
	rightOnClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const AddRemoveBtn: React.FC<Props> = ({
	leftOnClick,
	rightOnClick,
	...props
}) => {
	return (
		<div className={`add-remove-btn ${props.className}`}>
			<IconButton onClick={leftOnClick}>
				<PlusIcon className='u-text-dark' />
			</IconButton>
			<p>{props.children}</p>
			<IconButton onClick={rightOnClick}>
				<MinusIcon className='u-text-dark' />
			</IconButton>
		</div>
	);
};

export default AddRemoveBtn;
