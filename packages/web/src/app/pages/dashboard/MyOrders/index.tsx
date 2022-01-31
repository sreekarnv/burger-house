import React from 'react';
import OrderDataTable from '../../../components/order-data-table/OrderDataTable';
import Seo from '../../../components/shared/meta/Seo';
import Button from '../../../components/shared/ui/button/Button';
import PageLoader from '../../../components/shared/ui/loaders/PageLoader/PageLoader';
import useGetOrders from '../../../hooks/api/queries/orders/useGetOrders';

import './my-orders.scss';

interface MyOrdersPageProps {}

const LIMIT = 12;

const MyOrdersPage: React.FC<MyOrdersPageProps> = ({}) => {
	const { data, isLoading, nextPage, previousPage, page } = useGetOrders(LIMIT);

	if (isLoading) {
		return <PageLoader variant='embed' />;
	}

	return (
		<>
			<Seo title={`Burger House | Your Orders`} crawl={false} />
			<div className='my-orders'>
				<h2 className='my-orders__heading heading-2'>My Orders</h2>
				{data && data?.orders.length > 0 ? (
					<OrderDataTable
						data={data}
						nextPage={nextPage}
						previousPage={previousPage}
						page={page}
						linkUrl='/dashboard/orders'
					/>
				) : (
					<div className='u-text-center '>
						<h3 className='heading-2 u-text-capitalize u-pt-8 u-text-primary u-mb-8'>
							You have no orders
						</h3>
						<Button isLink to='/menu' variant='tertiary-outline'>
							Menu
						</Button>
					</div>
				)}
			</div>
		</>
	);
};

export default MyOrdersPage;
