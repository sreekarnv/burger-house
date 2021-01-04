import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Body from './Layout/Body';
import Footer from './Layout/Footer';
import Header from './Layout/Header';

import * as actionTypes from './store/actions/authActions';
import Loader from './Shared/Components/Loader/Loader';

const App = (props) => {
	const { checkAuthUserInit, checkAuthUser } = props;

	useEffect(() => {
		checkAuthUser();
	}, [checkAuthUser]);

	if (checkAuthUserInit) {
		return <Loader fullScreen />;
	}

	return (
		<BrowserRouter>
			<Header />
			<Body />
			<Footer />
		</BrowserRouter>
	);
};

const mapStateToProps = (state) => {
	return {
		checkAuthUserInit: state.auth.checkAuthUserInit,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		checkAuthUser: () => dispatch(actionTypes.checkAuthUser()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
