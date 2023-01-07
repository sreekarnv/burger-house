import clsx from 'clsx';
import OrderDataTable from '../../../components/order-data-table';
import Button from '../../../components/shared/button';
import Heading from '../../../components/shared/heading';
import PageLoader from '../../../components/shared/loaders/page-loader';
import Seo from '../../../components/shared/seo';
import usePagination from '../../../hooks/use-pagination';
import DashboardLayout from '../../../layouts/dashboard-layout';
import { trpc } from '../../../utils/trpc';
import { NextPageWithLayout } from '../../_app';

import classes from './my-orders.module.scss';

const DashboardOrdersPage: NextPageWithLayout = () => {
  const { page, handleNextPage, handlePrevPage } = usePagination({});
  const { data, isLoading } = trpc.order.userAll.useQuery({
    limit: 10,
    cursor: page,
  });

  if (isLoading) return <PageLoader variant="embed" />;

  return (
    <>
      <Seo title="Dashboard | My Orders" />

      <div className={classes.root}>
        <Heading variant="h2" className={classes.heading}>
          My Orders
        </Heading>
        {data && data?.orders.length ? (
          <OrderDataTable
            data={data}
            nextPage={handleNextPage}
            previousPage={handlePrevPage}
            page={page}
            linkUrl={`/dashboard/orders`}
          />
        ) : (
          <div className={classes.empty}>
            <Heading
              color="primary"
              variant="h2"
              className={clsx(['u-text-capitalize'])}
            >
              You have no orders
            </Heading>
            <Button isLink href="/menu" variant="tertiary-outline">
              Menu
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

DashboardOrdersPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardOrdersPage;
