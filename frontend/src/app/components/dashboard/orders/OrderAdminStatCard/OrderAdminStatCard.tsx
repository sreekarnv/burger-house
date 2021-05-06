import './order-admin-stat-card.scss';

import * as React from 'react';

interface Props {
	field: string;
	value: string;
	fieldClassName?: string;
	valueClassName?: string;
}

const OrderAdminStatCard: React.FC<Props> = ({
	field,
	value,
	fieldClassName,
	valueClassName,
}) => {
	return (
		<div className='order-admin-stat-card u-text-center u-p-8'>
			<p
				className={`order-admin-stat-card__field u-text-uppercase u-ftwt-700 ${
					fieldClassName ? fieldClassName : ''
				}`}>
				{field}
			</p>
			<p
				className={`order-admin-stat-card__value u-text-primary ${
					valueClassName ? valueClassName : ''
				}`}>
				{value}
			</p>
		</div>
	);
};

export default OrderAdminStatCard;
