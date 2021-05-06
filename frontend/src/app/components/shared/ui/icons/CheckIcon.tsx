import * as React from 'react';

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			height='20'
			width='20'
			stroke='currentColor'
			{...props}>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M5 13l4 4L19 7'
			/>
		</svg>
	);
};

export default CheckIcon;
