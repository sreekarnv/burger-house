import clsx from 'clsx';
import { useRouter } from 'next/router';
import React from 'react';
import { HiMenu } from 'react-icons/hi';
import Backdrop from '../../components/shared/backdrop';
import PageLoader from '../../components/shared/loaders/page-loader/PageLoader';
import useDisclosure from '../../hooks/use-disclosure';
import { trpc } from '../../utils/trpc';
import Navbar from '../shared/navbar';

import classes from './dashboard-layout.module.scss';
import Sidebar from './sidebar';

const DashboardLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, data } = trpc.auth.user.useQuery();

  React.useEffect(() => {
    if (!isLoading && !data) {
      router.replace('/auth/login?redirect=/dashboard');
    }
  }, [router, isLoading, data]);

  return (
    <>
      <Navbar />
      <Backdrop show={isOpen} onClose={onClose} />
      <Sidebar
        onClose={onClose}
        className={clsx([
          classes['dashboard__sidebar__mobile'],
          isOpen && classes['dashboard__sidebar__mobile--show'],
        ])}
      />

      <div className={classes['dashboard']}>
        <button
          onClick={() => onOpen()}
          className={classes['dashboard__sidebar__toggler']}
        >
          <HiMenu size={24} />
        </button>
        <div className={classes['dashboard__sidebar']}>
          <Sidebar />
        </div>
        <main className={classes['dashboard__content']}>
          {isLoading && <PageLoader variant="embed" />}
          {!isLoading && children}
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
