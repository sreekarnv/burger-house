import { useRouter } from 'next/router';
import React from 'react';
import { trpc } from '../../utils/trpc';
import { Role } from '../../utils/types/user';

const AdminProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const context = trpc.useContext();
  const user = context.auth.user.getData();

  React.useEffect(() => {
    if (user && user.role !== Role.Admin) {
      router.replace('/dashboard');
    }
  }, [router, user]);

  return <>{children}</>;
};

export default AdminProvider;
