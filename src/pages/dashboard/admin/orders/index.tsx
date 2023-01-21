import React from 'react';
import OrderDataTable from '../../../../components/order-data-table';
import OrderStatCard from '../../../../components/order-stat-card';
import PageLoader from '../../../../components/shared/loaders/page-loader';
import Seo from '../../../../components/shared/seo';
import usePagination from '../../../../hooks/use-pagination';
import DashboardLayout from '../../../../layouts/dashboard-layout';
import AdminProvider from '../../../../providers/admin-provider';
import { trpc } from '../../../../utils/trpc';
import { NextPageWithLayout } from '../../../_app';
import classes from './manage-orders.module.scss';

const ManageOrdersPage: NextPageWithLayout = ({}) => {
  const { page, handleNextPage, handlePrevPage } = usePagination({
    initialPage: 1,
  });
  const { data, isLoading } = trpc.order.all.useQuery({ limit: 8, page });

  const { data: orderStats, isLoading: isOrderStatsLoading } =
    trpc.order.orderStats.useQuery();

  if (isOrderStatsLoading || isLoading) {
    return (
      <>
        <PageLoader variant="embed" />
      </>
    );
  }

  return (
    <>
      <Seo title="Dashboard | Orders" />

      <div className={classes.root}>
        <div className={classes.stats}>
          {orderStats?.map((stat: any) => {
            return (
              <OrderStatCard
                key={stat._id}
                title={stat._id}
                value={stat.count}
              />
            );
          })}
        </div>
        <div>
          {data && (
            <OrderDataTable
              nextPage={handleNextPage}
              previousPage={handlePrevPage}
              {...{ page }}
              glass
              linkUrl="/dashboard/admin/orders"
              data={data}
            />
          )}
        </div>
      </div>
    </>
  );
};

ManageOrdersPage.getLayout = (page) => {
  return (
    <DashboardLayout>
      <AdminProvider>{page}</AdminProvider>
    </DashboardLayout>
  );
};

export default ManageOrdersPage;
