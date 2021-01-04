import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Shared/Components/Loader/Loader';

import CardMenu from '../../Shared/Components/Card/CardMenu';

import * as burgerActions from './../../store/actions/burgerActions';
import { useHistory } from 'react-router-dom';

const ManageMenu = () => {
	const dispatch = useDispatch();
	const burgers = useSelector((state) => state.burgers.burgers);
	const burgersInit = useSelector((state) => state.burgers.burgersInit);

	const user = useSelector((state) => state.auth.user);
	const history = useHistory();

	useEffect(() => {
		if (user && user.role !== 'admin') {
			return history.replace('/dashboard');
		}
	}, [history, user]);

	useEffect(() => {
		dispatch(burgerActions.getBurgers());
	}, [dispatch]);

	if (burgersInit) {
		return <Loader fullScreen />;
	}

	return (
		<div className='manage-menu'>
			<h3 className='heading-1 u-text-primary'>Manage Menu</h3>
			<div className='manage-menu__cards'>
				{burgers.map((el) => {
					return <CardMenu burger={el} key={el._id} admin />;
				})}
			</div>
		</div>
	);
};

export default ManageMenu;
