import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLoader from '../../../components/shared/ui/loaders/PageLoader/PageLoader';
import useLogoutQuery from '../../../hooks/api/queries/auth/useLogoutQuery';

interface LogoutPageProps {}

const LogoutPage: React.FC<LogoutPageProps> = ({}) => {
	const { isFetched } = useLogoutQuery();
	const navigate = useNavigate();

	React.useEffect(() => {
		if (isFetched) {
			navigate('/', { replace: true });
		}
	}, [isFetched]);

	return (
		<>
			<PageLoader />
		</>
	);
};

export default LogoutPage;
