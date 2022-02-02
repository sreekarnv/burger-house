import React from 'react';
import { useParams } from 'react-router-dom';
import OrderInfoCard from '../../../components/order-info-card/OrderInfoCard';
import OrderListItem from '../../../components/order-list-item/OrderListItem';
import Seo from '../../../components/shared/meta/Seo';
import Button from '../../../components/shared/ui/button/Button';
import PageLoader from '../../../components/shared/ui/loaders/PageLoader/PageLoader';
import TrackOrderMap from '../../../components/track-order-map/TrackOrderMap';
import useUpdateOrderMutation from '../../../hooks/api/mutations/orders/useUpdateOrderStatus';
import useGetOrder from '../../../hooks/api/queries/orders/useGetOrder';
import useDisclosure from '../../../hooks/helpers/useDisclosure';

import './order-detail.scss';

interface MyOrderDetailPageProps {}

const MyOrderDetailPage: React.FC<MyOrderDetailPageProps> = ({}) => {
	const params = useParams();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { data, isLoading } = useGetOrder(params?.id || '');
	const { isLoading: isUpdateOrderLoading, updateOrderStatus } =
		useUpdateOrderMutation();

	if (isLoading) {
		return <PageLoader variant='embed' />;
	}

	return (
		<>
			<Seo title={`Burger House | Order #${data?._id} `} />
			<TrackOrderMap show={isOpen} closeMap={onClose} order={data as any} />
			<div className='u-pt-8 u-pb-8 u-pr-8 u-pl-8'>
				<h1 className='order-detail__heading u-text-center u-mb-10 u-text-primary heading-3'>
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
								order={data}
								cta={
									<>
										<Button
											onClick={() => {
												if (data.status !== 'delivered') {
													updateOrderStatus({
														status: 'cancelled',
														id: data._id,
													});
												}
											}}
											disabled={
												data.status === 'delivered' ||
												data.status === 'cancelled'
											}
											variant='danger-outline'>
											{isUpdateOrderLoading ? 'Updating...' : 'Cancel Order'}
										</Button>
										<Button
											onClick={() => {
												if (data.status === 'pending') {
													onOpen();
												}
											}}
											disabled={
												data.status === 'delivered' ||
												data.status === 'cancelled'
											}
											variant='tertiary-outline'>
											Track Order
										</Button>
									</>
								}
							/>
						)}
					</div>
				</div>
				<div>{/* <OrderDataTable  /> */}</div>
			</div>
		</>
	);
};

export default MyOrderDetailPage;
