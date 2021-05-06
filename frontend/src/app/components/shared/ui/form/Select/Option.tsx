import * as React from 'react';

type Props = React.DetailedHTMLProps<
	React.OptionHTMLAttributes<HTMLOptionElement>,
	HTMLOptionElement
>;

const Option: React.FC<Props> = ({ children, ...props }) => {
	return <option {...props}>{children}</option>;
};

export default Option;
