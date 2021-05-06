import * as React from 'react';

// components
import Loader from '~app/components/shared/ui/loader/loader';

// hooks
import useLogoutQuery from '~app/hooks/api/queries/useLogoutQuery';

const Logout = () => {
	useLogoutQuery();

	return <Loader fullScreen />;
};

export default Logout;
