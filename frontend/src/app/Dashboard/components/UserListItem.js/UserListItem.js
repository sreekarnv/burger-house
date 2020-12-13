import React from "react";
import BaseListItem from "../../../shared/components/BaseListItem/BaseListItem";
import IconButton from "../../../shared/components/Buttons/IconButton";

import DeleteIcon from "./../../../shared/icons/Trash";
import EditIcon from "./../../../shared/icons/Edit";
import { useSelector } from "react-redux";

const UserListItem = (props) => {
	const { user, onActionHandler } = props;
	const loggedInUser = useSelector((state) => state.auth.user);

	return (
		<BaseListItem className='user-list-item'>
			<h3 className='user-list-item__name u-text-capitalize'>
				{user.name} {user._id === loggedInUser._id && "(Me)"}
			</h3>
			<p
				className={`user-list-item__role ${
					user.role === "admin" && "u-text-tertiary u-text-uppercase"
				}`}>
				{user.role}
			</p>
			{user.role === "customer" && (
				<IconButton onClick={() => onActionHandler("edit", user._id)}>
					<EditIcon className='u-fill-primary-60' />
				</IconButton>
			)}

			{user.role === "customer" && (
				<IconButton onClick={() => onActionHandler("delete", user._id)}>
					<DeleteIcon className='u-fill-danger-60' />
				</IconButton>
			)}
		</BaseListItem>
	);
};

export default UserListItem;
