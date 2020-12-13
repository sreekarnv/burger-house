import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loader from "../shared/components/Loader/Loader";

import * as authActions from "./../store/actions/authActions";

const Logout = () => {
	const user = useSelector((state) => state.auth.user);
	const { replace } = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(authActions.logoutUser());
	}, [dispatch]);

	useEffect(() => {
		if (!user) {
			return replace("/login");
		}
	}, [user, replace]);

	return <Loader fullScreen />;
};

export default Logout;
