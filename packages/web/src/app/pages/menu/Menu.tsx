import React from 'react';
import { useQueryClient } from 'react-query';
import BurgerCard from '../../components/burger-card/BurgerCard';
import Seo from '../../components/shared/meta/Seo';
import Button from '../../components/shared/ui/button/Button';
import PageLoader from '../../components/shared/ui/loaders/PageLoader/PageLoader';
import useGetBurgers from '../../hooks/api/queries/burgers/useGetBurgers';
import { PaginatedBurgers } from '../../hooks/api/types';

import './menu.scss';

interface MenuPageProps {}

const MenuPage: React.FC<MenuPageProps> = ({}) => {
	const { isLoading, page, nextPage, previousPage } = useGetBurgers(4);

	const queryClient = useQueryClient();
	const data = queryClient.getQueryData<PaginatedBurgers>(['burgers', page]);

	if (isLoading) {
		return <PageLoader variant='embed' />;
	}

	return (
		<>
			<Seo title='Burger House | Menu' />
			<div className='menu'>
				<div className='menu__container'>
					<div className='u-mb-10'>
						<h1 className='u-fw-400 u-text-center u-text-primary heading-1 u-mb-8'>
							Menu
						</h1>
						<div className='u-text-right'>
							<Button size='sm' to='/menu/make-burger' isLink>
								Make Burger
							</Button>
						</div>
					</div>
					<div className='menu__items'>
						{data?.burgers?.map((burger) => {
							return <BurgerCard key={burger._id} size='sm' burger={burger} />;
						})}
					</div>
					<div className='u-mt-20 u-text-right'>
						<Button
							variant='tertiary-outline'
							size='sm'
							disabled={page === 1}
							onClick={() => {
								if (page !== 1) {
									previousPage();
								}
							}}>
							Prev Page
						</Button>
						<span className='u-mr-5 u-ml-5 u-fw-600 u-fs-18'>{page}</span>
						<Button
							disabled={!data?.hasMore}
							variant='tertiary-outline'
							size='sm'
							onClick={() => {
								if (data?.hasMore) {
									nextPage();
								}
							}}>
							Next Page
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default MenuPage;
