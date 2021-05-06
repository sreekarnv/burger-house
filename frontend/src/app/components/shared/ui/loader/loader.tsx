import './loader.scss';

import * as React from 'react';

const Loader: React.FC<
	React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> & {
		fullScreen?: boolean;
	}
> = (props) => {
	const { fullScreen } = props;

	const loader = (
		<div className='lds-ellipsis'>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);

	if (fullScreen) {
		return <div className='loader__full-screen'>{loader}</div>;
	}

	return loader;
};

export default Loader;
