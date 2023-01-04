import { useAppDispatch, useAppSelector } from '../../store/hooks';
import React from 'react';
import { initCart } from '../../store/modules/cart';
import { togglePageIsReady } from '../../store/modules/app';

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const pageIsReady = useAppSelector((state) => state.app.pageIsReady);

  React.useEffect(() => {
    if (!pageIsReady) {
      dispatch(togglePageIsReady());
    }
  }, [pageIsReady, dispatch]);

  React.useEffect(() => {
    dispatch(initCart());
  }, [dispatch]);

  return <>{children}</>;
};

export default AppProvider;
