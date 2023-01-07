import React from 'react';
import clsx from 'clsx';
import {
  HiOutlineDocument,
  HiOutlineUserCircle,
  HiOutlineDocumentDuplicate,
} from 'react-icons/hi';

import classes from './sidebar.module.scss';
import SidebarNavLink from '../sidebar-nav-link/SidebarNavLink';
import Image from 'next/image';
import { trpc } from '../../../utils/trpc';
import Divider from '../../../components/shared/divider';

interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className, onClose }) => {
  const { data: user } = trpc.auth.user.useQuery();

  return (
    <>
      <aside className={clsx(classes.root, className)}>
        <div className={clsx(classes['user'], 'u-p-5 u-mr-5')}>
          <figure className={classes['user__media']}>
            <Image
              className={classes['user__image']}
              src={user?.photo?.url || ''}
              alt={user?.name || ''}
              loading="lazy"
              height={50}
              width={50}
            />
          </figure>

          <h5
            className={clsx(
              classes['user__name'],
              'u-text-secondary u-text-capitalize'
            )}
          >
            {user?.name}
          </h5>
        </div>

        <ul>
          <SidebarNavLink
            icon={<HiOutlineDocument />}
            onClick={() => {
              onClose?.();
            }}
            href="/dashboard/orders"
          >
            My Orders
          </SidebarNavLink>

          <SidebarNavLink
            icon={<HiOutlineUserCircle />}
            onClick={() => {
              onClose?.();
            }}
            exact
            href="/dashboard/profile"
          >
            My Profile
          </SidebarNavLink>
          {user?.role === 'admin' && (
            <>
              <li>
                <Divider color="secondary" />
              </li>
              <SidebarNavLink
                icon={<HiOutlineDocumentDuplicate />}
                onClick={() => {
                  onClose?.();
                }}
                href="/dashboard/admin/orders"
              >
                Manage Orders
              </SidebarNavLink>
            </>
          )}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
