import './loader.scss';

import * as React from 'react';

const Loader: React.FC<
	React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = () => {
	return (
		<div className='lds-ellipsis'>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default Loader;
