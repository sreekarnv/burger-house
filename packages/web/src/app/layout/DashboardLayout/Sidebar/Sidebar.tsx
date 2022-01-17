import React from 'react';
import clsx from 'clsx';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useQueryClient } from 'react-query';
import { User } from '@burger-house/models';
import {
	HiOutlineDocument,
	HiOutlineUserCircle,
	HiOutlineDocumentDuplicate,
} from 'react-icons/hi';

import './sidebar.scss';
import SidebarNavLink from '../SidebarNavLink/SidebarNavLink';
import Divider from '../../../components/shared/ui/divider/Divider';
import { SERVER_URL } from '../../../config/constants';

interface SidebarProps {
	className?: string;
	onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className, onClose }) => {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user')!;

	return (
		<>
			<aside className={clsx('sidebar', className)}>
				<div className='sidebar__user u-p-5 u-mr-5'>
					<figure className='sidebar__user__media'>
						<LazyLoadImage
							className='sidebar__user__image'
							src={
								user?.photo?.url.startsWith('/uploads/')
									? `${SERVER_URL}${user.photo.url}`
									: user?.photo?.url ?? ''
							}
							alt={user?.name}
							effect='blur'
						/>
					</figure>

					<h5 className='sidebar__user__name u-text-secondary u-text-capitalize u-text-center'>
						{user?.name}
					</h5>
				</div>

				<ul>
					<SidebarNavLink
						icon={<HiOutlineDocument />}
						onClick={() => {
							onClose?.();
						}}
						to='/dashboard/orders'>
						My Orders
					</SidebarNavLink>

					<SidebarNavLink
						icon={<HiOutlineUserCircle />}
						onClick={() => {
							onClose?.();
						}}
						to='/dashboard/profile'>
						My Profile
					</SidebarNavLink>

					{user.role === 'admin' && (
						<>
							<Divider color='secondary' />
							<SidebarNavLink
								icon={<HiOutlineDocumentDuplicate />}
								onClick={() => {
									onClose?.();
								}}
								to='/dashboard/admin/orders'>
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
