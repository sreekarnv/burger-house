import './search-input.scss';
import './../input.scss';

import * as React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {};

const SearchInput: React.FC<Props> = ({ className, ...props }) => {
	return (
		<input
			type='text'
			className={`input u-mb-0 ${className ? className : ''}`}
			{...props}
		/>
	);
};

export default SearchInput;
