import * as React from 'react';
import { useRouteMatch } from 'react-router';
import Loader from '~app/components/shared/ui/loader/loader';
import useAdminOrderQuery from '~app/hooks/api/queries/useAdminOrderQuery';
import OrderDetail from '../../shared/order-detail/OrderDetail';

interface Props {}

const AdminOrderDetail = (props: Props) => {
	const route = useRouteMatch<{ id: string }>();
	const { isLoading, data } = useAdminOrderQuery(route.params.id);

	if (isLoading) {
		return <Loader fullScreen />;
	}

	return <OrderDetail order={data} isAdmin />;
};

export default AdminOrderDetail;
