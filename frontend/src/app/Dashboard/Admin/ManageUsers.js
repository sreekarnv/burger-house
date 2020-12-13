import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./../../shared/components/Loader/Loader";
import * as adminActions from "./../../store/actions/adminActions";
import UserListItem from "../components/UserListItem.js/UserListItem";
import Modal from "../../shared/components/Modal/Modal";
import { useHistory } from "react-router-dom";

const ManageUsers = () => {
	const dispatch = useDispatch();
	const allUsers = useSelector((state) => state.admin.allUsers);
	const allUsersInit = useSelector((state) => state.admin.allUsersInit);

	const [showModal, setShowModal] = useState(false);
	const [modalActionType, setModalActionType] = useState(null);

	const [selectedUser, setSelectedUser] = useState(null);

	const user = useSelector((state) => state.auth.user);
	const history = useHistory();

	useEffect(() => {
		if (user && user.role !== "admin") {
			return history.replace("/dashboard");
		}
	}, [history, user]);

	useEffect(() => {
		dispatch(adminActions.getAllUsers());
	}, [dispatch]);

	if (allUsersInit) {
		return <Loader fullScreen />;
	}

	const onActionHandler = (type, id) => {
		setShowModal(true);
		setModalActionType(type);
		setSelectedUser(id);
	};

	const updateUserRole = async () => {
		await dispatch(
			adminActions.updateUserRole(selectedUser, { role: "admin" })
		);
		dispatch(adminActions.getAllUsers());
		setShowModal(false);
		setModalActionType(null);
	};

	const deleteUser = async () => {
		await dispatch(adminActions.deleteUser(selectedUser));
		dispatch(adminActions.getAllUsers());
		setShowModal(false);
		setModalActionType(null);
	};

	return (
		<>
			<Modal
				show={showModal}
				setShow={setShowModal}
				confirmMessage={
					modalActionType === "edit"
						? "Are you sure you wan to make this user an admin ?"
						: "are you sure you want to delete this user"
				}
				successHandler={
					modalActionType === "edit" ? updateUserRole : deleteUser
				}
				dangerHandler={() => setShowModal(false)}
			/>
			<div className='manage-users'>
				<h3 className='heading-1 u-text-primary'>Manage Users</h3>
				<ul className='manage-users__list'>
					{allUsers.map((user) => {
						return (
							<UserListItem
								onActionHandler={onActionHandler}
								dangerHandler={() => setShowModal(false)}
								key={user._id}
								user={user}
							/>
						);
					})}
				</ul>
			</div>
		</>
	);
};

export default ManageUsers;
