import type { NextPage } from 'next';
import Link from 'next/link';

const MenuPage: NextPage = ({}) => {
	return (
		<>
			<div>
				<h1>Menu Page</h1>
				<Link href='/auth/login?redirect=/cart'>Login</Link>
			</div>
		</>
	);
};

export default MenuPage;
