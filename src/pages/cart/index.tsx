import type { NextPage } from 'next';
import { SkeletonText } from '../../components/shared/skeleton';
import SkeletonImage from '../../components/shared/skeleton/SkeletonImage';

const CartPage: NextPage = ({}) => {
	return (
		<>
			<SkeletonText />
			<SkeletonText variant='title' />
			<h1>Cart Page</h1>

			<SkeletonImage height={200} width={'100%'} />
		</>
	);
};

export default CartPage;
