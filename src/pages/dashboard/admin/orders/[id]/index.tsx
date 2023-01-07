import { useRouter } from 'next/router';
import OrderInfoCard from '../../../../../components/order-info-card';
import OrderListItem from '../../../../../components/order-list-item';
import Button from '../../../../../components/shared/button';
import Heading from '../../../../../components/shared/heading';
import PageLoader from '../../../../../components/shared/loaders/page-loader';
import Seo from '../../../../../components/shared/seo';
import DashboardLayout from '../../../../../layouts/dashboard-layout';
import AdminProvider from '../../../../../providers/admin-provider';
import { trpc } from '../../../../../utils/trpc';
import { Status } from '../../../../../utils/types/orders';
import { NextPageWithLayout } from '../../../../_app';

import classes from './admin-order-detail.module.scss';

const AdminOrderDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const context = trpc.useContext();
  const { data, isLoading } = trpc.order.oneById.useQuery(
    { _id: router.query.id as string },
    { enabled: !!router.query.id }
  );
  const { isLoading: isUpdateOrderLoading, mutate: updateOrderStatus } =
    trpc.order.updateOrderStatus.useMutation({
      onSuccess: () => {
        context.order.oneById.invalidate({
          _id: router.query.id as string,
        });
      },
    });

  if (isLoading) {
    return <PageLoader variant="embed" />;
  }

  return (
    <>
      <Seo title="Dashboard | Orders" />

      <div className={classes.container}>
        <Heading variant="h3" color="primary" className={classes.heading}>
          Order &nbsp;#{data?._id}
        </Heading>
        <div className={classes.root}>
          <div className={classes.items}>
            {data?.items.map((item: any, i: any) => (
              <OrderListItem orderItem={item} key={i} />
            ))}
          </div>
          <div className={classes.info}>
            {data && (
              <OrderInfoCard
                showUser
                order={data}
                cta={
                  <>
                    <Button
                      disabled={data.status !== Status.Pending}
                      variant="success-outline"
                      onClick={async () => {
                        if (data.status === Status.Pending) {
                          await updateOrderStatus({
                            status: Status.Delivered,
                            _id: data._id,
                          });
                        }
                      }}
                    >
                      {isUpdateOrderLoading
                        ? 'Updating...'
                        : 'Mark as Delivered'}
                    </Button>
                    <Button
                      disabled={data.status !== Status.Pending}
                      variant="danger-outline"
                      onClick={async () => {
                        if (data.status === Status.Pending) {
                          await updateOrderStatus({
                            status: Status.Cancelled,
                            _id: data._id,
                          });
                        }
                      }}
                    >
                      {isUpdateOrderLoading
                        ? 'Updating...'
                        : 'Mark as Cancelled'}
                    </Button>
                  </>
                }
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

AdminOrderDetailPage.getLayout = (page) => {
  return (
    <DashboardLayout>
      <AdminProvider>{page}</AdminProvider>
    </DashboardLayout>
  );
};

export default AdminOrderDetailPage;
