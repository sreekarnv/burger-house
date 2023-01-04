import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Seo from '../../components/shared/seo';

const DashboardIndexPage: NextPage = ({}) => {
  const router = useRouter();

  React.useEffect(() => {
    router.replace('/dashboard/orders');
  }, [router]);

  return (
    <>
      <Seo title="Dashboard" />
    </>
  );
};

export default DashboardIndexPage;
