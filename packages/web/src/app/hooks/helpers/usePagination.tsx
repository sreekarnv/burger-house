import React from 'react';
import {
	createSearchParams,
	useLocation,
	useNavigate,
	useSearchParams,
} from 'react-router-dom';

const usePagination = (initialPage = 1) => {
	const [searchParams] = useSearchParams();
	const [page, setPage] = React.useState(
		parseInt(searchParams.get('page') || '1', 10) || initialPage
	);
	const navigate = useNavigate();
	const location = useLocation();

	const nextPage = () => {
		setPage(page + 1);
		navigate({
			pathname: location.pathname,
			search: `?${createSearchParams({
				page: `${page + 1}`,
				search: searchParams.get('search') || '',
			})}`,
		});
	};

	const previousPage = () => {
		if (page > 1) {
			setPage(page - 1);
			navigate({
				pathname: location.pathname,
				search: `?${createSearchParams({
					page: `${page - 1}`,
					search: searchParams.get('search') || '',
				})}`,
			});
		}
	};

	return { page, nextPage, previousPage };
};

export default usePagination;
