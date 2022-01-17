import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const usePagination = (initialPage = 1) => {
	const [searchParams] = useSearchParams();
	const [page, setPage] = React.useState(
		parseInt(searchParams.get('page') || '1', 10) || initialPage
	);
	const navigate = useNavigate();
	const location = useLocation();

	const nextPage = () => {
		setPage(page + 1);
		navigate(location.pathname + '?page=' + (page + 1));
	};

	const previousPage = () => {
		if (page > 1) {
			setPage(page - 1);
			navigate(location.pathname + '?page=' + (page - 1));
		}
	};

	return { page, nextPage, previousPage };
};

export default usePagination;
