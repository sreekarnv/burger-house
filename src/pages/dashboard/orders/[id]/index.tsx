import { useRouter } from 'next/router';
import React from 'react';
import OrderInfoCard from '../../../../components/order-info-card';
import OrderListItem from '../../../../components/order-list-item';
import Button from '../../../../components/shared/button';
import Heading from '../../../../components/shared/heading';
import PageLoader from '../../../../components/shared/loaders/page-loader/PageLoader';
import Seo from '../../../../components/shared/seo';
import TrackOrderMap from '../../../../components/track-order-map';
import useDisclosure from '../../../../hooks/use-disclosure';
import DashboardLayout from '../../../../layouts/dashboard-layout';
import { trpc } from '../../../../utils/trpc';
import { Status } from '../../../../utils/types/orders';
import { NextPageWithLayout } from '../../../_app';
import classes from './order-detail.module.scss';

const MyOrderDetailPage: NextPageWithLayout = ({}) => {
  const router = useRouter();
  const context = trpc.useContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, data } = trpc.order.userOneById.useQuery({
    _id: router.query.id as string,
  });
  const { isLoading: isUpdateOrderLoading, mutate: updateOrderStatus } =
    trpc.order.userUpdateStatus.useMutation({
      onSuccess() {
        context.order.userOneById.invalidate({
          _id: router.query.id as string,
        });
      },
    });

  if (isLoading) {
    return <PageLoader variant="embed" />;
  }

  return (
    <>
      <Seo title="Dashboard | My Orders" />
      <TrackOrderMap show={isOpen} closeMap={onClose} order={data as any} />

      <div className={classes.container}>
        <Heading
          component="h3"
          variant="h3"
          color="primary"
          className={classes.heading}
        >
          Order &nbsp;#{data?._id}
        </Heading>
        <div className={classes.root}>
          <div className={classes.items}>
            {data?.items.map((item, i) => (
              <OrderListItem orderItem={item} key={i} />
            ))}
          </div>
          <div className={classes.info}>
            {data && (
              <OrderInfoCard
                order={data}
                cta={
                  <>
                    <Button
                      onClick={() => {
                        if (data.status !== 'delivered') {
                          updateOrderStatus({
                            status: Status.Cancelled,
                            _id: data._id,
                          });
                        }
                      }}
                      disabled={
                        data.status === 'delivered' ||
                        data.status === 'cancelled'
                      }
                      variant="danger-outline"
                    >
                      {isUpdateOrderLoading ? 'Updating...' : 'Cancel Order'}
                    </Button>
                    <Button
                      onClick={() => {
                        if (data.status === 'pending') {
                          onOpen();
                        }
                      }}
                      disabled={
                        data.status === 'delivered' ||
                        data.status === 'cancelled'
                      }
                      variant="tertiary-outline"
                    >
                      Track Order
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

MyOrderDetailPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default MyOrderDetailPage;
