import * as React from 'react';

// components
import Loader from 'src/app/components/shared/ui/loader/loader';

// hooks
import useLogoutQuery from 'src/app/hooks/api/queries/useLogoutQuery';

const Logout = () => {
	useLogoutQuery();

	return <Loader fullScreen />;
};

export default Logout;
