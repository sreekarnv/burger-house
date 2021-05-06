import * as React from 'react';

const MinusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			{...props}>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M18 12H6'
			/>
		</svg>
	);
};

export default MinusIcon;
