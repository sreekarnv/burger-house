import * as React from 'react';
import { useRouteMatch } from 'react-router';
import Loader from 'src/app/components/shared/ui/loader/loader';
import useMeOrderQuery from 'src/app/hooks/api/queries/useMeOrderQuery';
import OrderDetail from '../../shared/order-detail/OrderDetail';

interface Props {}

const MeOrderDetail = (props: Props) => {
	const route = useRouteMatch<{ id: string }>();
	const { isLoading, data } = useMeOrderQuery(route.params.id);

	if (isLoading) {
		return <Loader fullScreen />;
	}

	return <OrderDetail order={data} />;
};

export default MeOrderDetail;
