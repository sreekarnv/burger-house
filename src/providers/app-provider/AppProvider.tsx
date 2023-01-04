import { useAppDispatch, useAppSelector } from '../../store/hooks';
import React from 'react';
import { initCart } from '../../store/modules/cart';
import { togglePageIsReady } from '../../store/modules/app';
import PageFirstLoadOverlay from '../../animations/page-first-load-overlay';
import PageLoader from '../../components/shared/loaders/page-loader';
import { trpc } from '../../utils/trpc';

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isLoading, isFetched } = trpc.auth.user.useQuery();
  const dispatch = useAppDispatch();
  const pageIsReady = useAppSelector((state) => state.app.pageIsReady);

  React.useEffect(() => {
    if (isFetched && !pageIsReady) {
      const timer = setTimeout(() => {
        dispatch(togglePageIsReady());
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isFetched, pageIsReady, dispatch]);

  React.useEffect(() => {
    dispatch(initCart());
  }, [dispatch]);

  if (isLoading) return <PageLoader variant="full" />;

  return (
    <>
      <PageFirstLoadOverlay>{children}</PageFirstLoadOverlay>
    </>
  );
};

export default AppProvider;
