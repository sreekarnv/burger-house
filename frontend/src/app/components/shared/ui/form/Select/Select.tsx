import './../input.scss';

import * as React from 'react';

type Props = React.DetailedHTMLProps<
	React.SelectHTMLAttributes<HTMLSelectElement>,
	HTMLSelectElement
>;

const Select: React.FC<Props> = ({ children, ...props }) => {
	return (
		<select className='input' {...props}>
			{children}
		</select>
	);
};

export default Select;
