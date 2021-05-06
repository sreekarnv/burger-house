import './avatar.scss';

import * as React from 'react';

import UserRoundIcon from '../icons/UserRoundIcon';

interface Props {
	src?: string;
	alt?: string;
	size?: 'sm' | 'md';
	color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'danger' | 'dark';
}

const Avatar: React.FC<Props> = ({
	src,
	alt,
	size = 'md',
	color = 'primary',
}) => {
	return (
		<div className='avatar'>
			{src ? (
				<img className={`avatar avatar__${size}`} src={src} alt={alt} />
			) : (
				<>
					<UserRoundIcon
						className={`u-bg-light u-p-2 avatar avatar__${size} u-text-${color}`}
					/>
				</>
			)}
		</div>
	);
};

export default Avatar;
