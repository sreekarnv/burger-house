import React from 'react';
import { useParams } from 'react-router-dom';
import OrderInfoCard from '../../../components/order-info-card/OrderInfoCard';
import OrderListItem from '../../../components/order-list-item/OrderListItem';
import Seo from '../../../components/shared/meta/Seo';
import Button from '../../../components/shared/ui/button/Button';
import PageLoader from '../../../components/shared/ui/loaders/PageLoader/PageLoader';
import useAdminUpdateOrderMutation from '../../../hooks/api/mutations/orders/useAdminUpdateOrderStatus';
import useGetAdminOrder from '../../../hooks/api/queries/orders/useGetAdminOrder';

import './order-detail.scss';

interface MyOrderDetailPageProps {}

const MyOrderDetailPage: React.FC<MyOrderDetailPageProps> = ({}) => {
	const params = useParams();
	const { data, isLoading } = useGetAdminOrder(params?.id || '');
	const { isLoading: isUpdateOrderLoading, updateOrderStatus } =
		useAdminUpdateOrderMutation();

	if (isLoading) {
		return <PageLoader variant='embed' />;
	}

	return (
		<>
			<Seo title={`Burger House | Admin | Order #${data?._id} `} />
			<div className='u-pt-8 u-pb-8 u-pr-8 u-pl-8'>
				<h1 className='u-text-center u-mb-10 u-text-primary heading-3'>
					Order &nbsp;#{data?._id}
				</h1>
				<div className='order-detail'>
					<div className='order-detail__items'>
						{data?.items.map((item, i) => (
							<OrderListItem orderItem={item} key={i} />
						))}
					</div>
					<div className='order-detail__info'>
						{data && (
							<OrderInfoCard
								showUser
								order={data}
								cta={
									<>
										<Button
											disabled={data.status !== 'pending'}
											variant='success-outline'
											onClick={async () => {
												if (data.status === 'pending') {
													await updateOrderStatus({
														status: 'delivered',
														id: data._id,
													});
												}
											}}>
											{isUpdateOrderLoading
												? 'Updating...'
												: 'Mark as Delivered'}
										</Button>
										<Button
											disabled={data.status !== 'pending'}
											variant='danger-outline'
											onClick={async () => {
												if (data.status === 'pending') {
													await updateOrderStatus({
														status: 'cancelled',
														id: data._id,
													});
												}
											}}>
											{isUpdateOrderLoading
												? 'Updating...'
												: 'Mark as Cancelled'}
										</Button>
									</>
								}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default MyOrderDetailPage;
