import './order-stats-item.scss';

import * as React from 'react';

interface Props {
	field: string;
	value: string;
	fieldClassName?: string;
	valueClassName?: string;
}

const OrderStatsItem: React.FC<Props> = ({
	field,
	value,
	fieldClassName,
	valueClassName,
}) => {
	return (
		<div className='order-stats-item'>
			<span
				className={`order-stats-item__field ${
					fieldClassName ? fieldClassName : ''
				}`}>
				{field}
			</span>
			<span
				className={`order-stats-item__value  ${
					valueClassName ? valueClassName : ''
				}`}>
				{value}
			</span>
		</div>
	);
};

export default OrderStatsItem;
