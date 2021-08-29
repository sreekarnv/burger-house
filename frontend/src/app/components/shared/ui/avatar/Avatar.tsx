import './avatar.scss';

import * as React from 'react';

import UserRoundIcon from '../icons/UserRoundIcon';
import useDynamicImage from 'src/app/hooks/useDynamicImage';

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
	const { imageRef } = useDynamicImage(src ? src : '');

	return (
		<div className='avatar'>
			{src ? (
				<img ref={imageRef} className={`avatar avatar__${size}`} alt={alt} />
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
