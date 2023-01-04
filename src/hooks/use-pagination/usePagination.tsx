import { useRouter } from 'next/router';
import React from 'react';

type PaginationOptions = {
  initialPage?: number;
  updateHref?: boolean;
  hrefQuery?: string;
};

const usePagination = (options: PaginationOptions | undefined) => {
  const router = useRouter();
  const { initialPage, updateHref = true, hrefQuery = 'page' } = options || {};

  const [page, setPage] = React.useState(initialPage || 1);

  const handleNextPage = () => {
    if (updateHref) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          [hrefQuery]: `${page + 1}`,
        },
      });
    }

    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = async () => {
    if (updateHref) {
      await router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          [hrefQuery]: `${page - 1}`,
        },
      });
    }

    setPage((prevPage) => prevPage - 1);
  };

  const handlePage = async (page: number) => {
    if (updateHref) {
      await router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          [hrefQuery]: `${page}`,
        },
      });
    }

    setPage(page);
  };

  const reset = async () => {
    if (updateHref) {
      await router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          [hrefQuery]: '1',
        },
      });
    }

    setPage(1);
  };

  return {
    handleNextPage,
    handlePrevPage,
    handlePage,
    page,
    reset,
  };
};

export default usePagination;
