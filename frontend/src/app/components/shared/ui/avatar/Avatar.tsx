import './avatar.scss';

import * as React from 'react';

import UserRoundIcon from '../icons/UserRoundIcon';
import useImage from 'src/app/hooks/useImage';

const colors = {
	primary: 'u-text-primary',
	secondary: 'u-text-secondary',
	tertiary: 'u-text-tertiary',
	success: 'u-text-success',
	danger: 'u-text-danger',
	dark: 'u-text-dark',
};

const sizes = {
	sm: 'avatar__sm',
	md: 'avatar__md',
};

interface Props {
	src?: string;
	alt?: string;
	size?: keyof typeof sizes;
	color?: keyof typeof colors;
}

const Avatar: React.FC<Props> = ({
	src,
	alt,
	size = 'md',
	color = 'primary',
}) => {
	const { imageRef } = useImage(src ? src : '');

	return (
		<div className='avatar'>
			{src ? (
				<img ref={imageRef} className={`avatar ${sizes[size]}`} alt={alt} />
			) : (
				<>
					<UserRoundIcon
						className={`u-bg-light u-p-2 avatar ${sizes[size]} ${colors[color]}`}
					/>
				</>
			)}
		</div>
	);
};

export default Avatar;
