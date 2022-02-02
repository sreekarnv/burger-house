import React from 'react';
import OrderDataTable from '../../../components/order-data-table/OrderDataTable';
import OrderStatCard from '../../../components/order-stat-card/OrderStatCard';
import Seo from '../../../components/shared/meta/Seo';
import PageLoader from '../../../components/shared/ui/loaders/PageLoader/PageLoader';
import useGetAdminOrders from '../../../hooks/api/queries/orders/useGetAdminOrders';
import useGetAdminOrderStats from '../../../hooks/api/queries/orders/useGetAdminOrderStats';

import './manage-orders.scss';

interface ManageOrdersPageProps {}

const ManageOrdersPage: React.FC<ManageOrdersPageProps> = ({}) => {
	const { data, isLoading, page, nextPage, previousPage } =
		useGetAdminOrders(12);
	const { orderStats, isLoading: isOrderStatsLoading } =
		useGetAdminOrderStats();

	if (isOrderStatsLoading || isLoading) {
		return (
			<>
				<PageLoader variant='embed' />
			</>
		);
	}

	return (
		<>
			<Seo title={`Burger House | Admin | Manage Orders `} />

			<div className='manage-orders'>
				<div className='manage-orders__stats'>
					{orderStats?.map((stat: any) => {
						return (
							<OrderStatCard
								key={stat._id}
								title={stat._id}
								value={stat.count}
							/>
						);
					})}
				</div>
				<div>
					{data && (
						<OrderDataTable
							{...{ page, nextPage, previousPage }}
							glass
							linkUrl='/dashboard/admin/orders'
							data={data}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default ManageOrdersPage;
