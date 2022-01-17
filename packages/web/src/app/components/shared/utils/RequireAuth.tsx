import { User } from '@burger-house/models';
import React from 'react';
import { useQueryClient } from 'react-query';
import { Navigate, useLocation } from 'react-router-dom';

interface RequireAuthProps {
	isAdmin?: boolean;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, isAdmin }) => {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user');
	const location = useLocation();

	if (!user) {
		return (
			<Navigate to={`/auth/login?redirect=${location.pathname}`} replace />
		);
	} else if (isAdmin && user.role !== 'admin') {
		return <Navigate to='/dashboard' replace />;
	}

	return <>{children}</>;
};

export default RequireAuth;
