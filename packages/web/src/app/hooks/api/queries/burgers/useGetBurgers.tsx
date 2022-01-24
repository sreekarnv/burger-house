import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { axios } from '../../../../config/axios';
import usePagination from '../../../helpers/usePagination';
import { PaginatedBurgers } from '../../types';

const useGetBurgers = (limit = 4, initialPage = 1) => {
	const [searchParams] = useSearchParams();
	const { page, nextPage, previousPage } = usePagination(initialPage);
	const { data, error, isLoading, isFetched, isFetching, refetch } =
		useQuery<PaginatedBurgers>(
			['burgers', page],
			async () => {
				const res = await axios({
					url: '/api/v3/burgers',
					method: 'GET',
					params: {
						page,
						limit,
						search: searchParams.get('search') || '',
					},
				});

				return res.data.data;
			},
			{
				keepPreviousData: true,
			}
		);

	return {
		data,
		error,
		isLoading,
		isFetched,
		page,
		nextPage,
		previousPage,
		isFetching,
		refetch,
	};
};

export default useGetBurgers;
