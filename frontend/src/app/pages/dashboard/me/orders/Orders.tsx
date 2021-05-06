import * as React from 'react';
import { useHistory } from 'react-router';

// components
import OrderItem from '~app/components/dashboard/orders/OrderItem/OrderItem';
import Button from '~app/components/shared/ui/button/Button';
import Loader from '~app/components/shared/ui/loader/loader';

// hooks
import useMeOrdersQuery from '~app/hooks/api/queries/useMeOrdersQuery';

import './orders.scss';

const Orders: React.FC = () => {
	const { data, isLoading } = useMeOrdersQuery({});
	const { push } = useHistory();

	if (isLoading) {
		return <Loader fullScreen />;
	}

	return (
		<div className='orders-me u-p-5'>
			<h1 className='heading-1 u-text-center u-text-primary'>My Orders</h1>

			{!data?.length && (
				<>
					<h2 className='u-text-center u-text-danger heading-3 u-text-capitalize u-mt-8'>
						You have no Orders Yet
					</h2>
					<div className='u-text-center u-mt-8'>
						<Button color='tertiary' size='sm'>
							Order Now
						</Button>
					</div>
				</>
			)}

			{data?.length > 0 && (
				<div className='orders-me__list'>
					{data?.map((order: any) => {
						return (
							<OrderItem
								onClick={() => push(`/dashboard/me/orders/${order._id}`)}
								key={order._id}
								{...{ order }}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Orders;
