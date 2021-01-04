import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Loader from '../Shared/Components/Loader/Loader';

import * as authActions from './../store/actions/authActions';

const VerifyUserAccount = (props) => {
	const { accountVerifiedInit, accountVerifiedStatus, verfiyAccount } = props;
	const params = useParams();
	const history = useHistory();

	useEffect(() => {
		if (!accountVerifiedStatus || accountVerifiedStatus !== 'success') {
			verfiyAccount(params.tokenId);
		}
	}, [params, verfiyAccount, accountVerifiedStatus]);

	if (accountVerifiedInit) {
		return <Loader fullScreen />;
	}

	if (accountVerifiedStatus === 'failed') {
		return (
			<div className='verified__account'>
				<h1 className='verified__account-text u-text-danger'>
					Something went wrong :(
				</h1>
				<button
					onClick={() => history.replace('/')}
					className='btn btn__tertiary'>
					Back to Home
				</button>
			</div>
		);
	}

	return (
		<div className='verified__account'>
			<h1 className='verified__account-text'>Your Account is Verfied</h1>
			<button
				onClick={() => history.replace('/login')}
				className='btn btn__tertiary'>
				Click here to login
			</button>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		accountVerifiedInit: state.auth.accountVerifiedInit,
		accountVerifiedStatus: state.auth.accountVerifiedStatus,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		verfiyAccount: (id) => dispatch(authActions.verifyAccount(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyUserAccount);
// 8010c30ec6d6fbf7a2be2764e301308910f36f0ec9414b7e8c4dec89e0c20c1f
