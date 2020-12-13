import React from "react";
import { useSelector } from "react-redux";

const Avatar = (props) => {
	// reducing email

	// const { user } = props;
	const user = useSelector((state) => state.auth.user);

	let email = user.email;
	let emaillast = email.split("@")[1];
	let emailfirst =
		email.split("@")[0].length > 7
			? email.slice(0, 4) + "..."
			: email.split("@")[0];

	email = `${emailfirst}@${emaillast}`;

	return (
		<div className='avatar'>
			<div className='avatar__image'>
				<img alt={user.name} src={user.photoUrl} />
			</div>
			<h4 className='avatar__name u-text-capitalize'>{user.name}</h4>
			<p className='avatar__email'>{email}</p>
		</div>
	);
};

export default Avatar;
