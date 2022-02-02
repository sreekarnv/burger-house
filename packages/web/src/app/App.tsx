import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import PageFirstLoadOverlay from './animations/PageFirstLoadOverlay';
import PageLoader from './components/shared/ui/loaders/PageLoader/PageLoader';
import useGetMeQuery from './hooks/api/queries/auth/useGetMeQuery';
import HomePage from './pages/home/Home';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { togglePageIsReady } from './store/modules/app';
import {
	updateLocationCoordinates,
	updateBrowserAllowLocation,
	updateError,
} from './store/modules/geoLocation';
import { initCart } from './store/modules/cart';
import MainLayout from './layout/MainLayout';
import DashboardLayout from './layout/DashboardLayout';
import RequireAuth from './components/shared/utils/RequireAuth';
import SuspenseLayout from './layout/SuspenseLayout';

const MenuPage = React.lazy(() => import('./pages/menu/Menu'));
const CartPage = React.lazy(() => import('./pages/cart/Cart'));

const LoginPage = React.lazy(() => import('./pages/auth/Login/Login'));
const RegisterPage = React.lazy(() => import('./pages/auth/Register/Register'));

const LogoutPage = React.lazy(() => import('./pages/auth/Logout/Logout'));

const DietChoicePage = React.lazy(
	() => import('./pages/menu/diet-choice/DietChoice')
);

const MakeBurgerPage = React.lazy(
	() => import('./pages/menu/make-burger/MakeBurger')
);

const MyOrdersPage = React.lazy(() => import('./pages/dashboard/MyOrders'));
const MyProfilePage = React.lazy(() => import('./pages/dashboard/MyProfile'));
const ManageOrdersPage = React.lazy(
	() => import('./pages/dashboard/ManageOrders')
);
const MyOrderDetailPage = React.lazy(
	() => import('./pages/dashboard/OrderDetail/MyOrderDetail')
);
const AdminOrderDetailPage = React.lazy(
	() => import('./pages/dashboard/OrderDetail/AdminOrderDetail')
);
const ErrorPage = React.lazy(() => import('./pages/error/Error'));

const App: React.FC = () => {
	const { isLoading, isFetched } = useGetMeQuery();
	const dispatch = useAppDispatch();
	const pageIsReady = useAppSelector((state) => state.app.pageIsReady);
	const allowLocation = useAppSelector(
		(state) => state.geolocation.allowLocation
	);

	React.useEffect(() => {
		if (allowLocation) {
			dispatch(updateError({ status: false }));
			navigator.geolocation.getCurrentPosition(
				(res: any) => {
					const longitude = res.coords.longitude as never;
					const latitude = res.coords.latitude as never;
					dispatch(
						updateLocationCoordinates({ coordinates: [longitude, latitude] })
					);
				},
				(err) => {
					if (err) {
						dispatch(updateBrowserAllowLocation({ status: false }));
						dispatch(updateError({ status: true }));
					}
				}
			);
		} else {
			dispatch(updateLocationCoordinates({ coordinates: [] }));
		}
	}, [allowLocation]);

	React.useEffect(() => {
		if (isFetched && !pageIsReady) {
			const timer = setTimeout(() => {
				dispatch(togglePageIsReady());
			}, 500);

			return () => clearTimeout(timer);
		}
	}, [isFetched, pageIsReady]);

	React.useEffect(() => {
		dispatch(initCart({}));
	}, [dispatch]);

	if (isLoading || !pageIsReady) {
		return <PageLoader />;
	}

	return (
		<PageFirstLoadOverlay>
			<Routes>
				<Route
					path='*'
					element={
						<React.Suspense fallback={<PageLoader />}>
							<ErrorPage />
						</React.Suspense>
					}
				/>

				<Route path='/' element={<MainLayout />}>
					<Route index element={<HomePage />} />
					<Route
						path='auth'
						element={<SuspenseLayout pageLoaderVariant='embed' />}>
						<Route index element={<Navigate to='login' />} />
						<Route path='login' element={<LoginPage />} />
						<Route path='register' element={<RegisterPage />} />
						<Route path='logout' element={<LogoutPage />} />
					</Route>

					<Route
						path='cart'
						element={<SuspenseLayout pageLoaderVariant='embed' />}>
						<Route index element={<CartPage />} />
					</Route>

					<Route
						path='menu'
						element={<SuspenseLayout pageLoaderVariant='embed' />}>
						<Route index element={<MenuPage />} />
						<Route path='make-burger' element={<DietChoicePage />} />
						<Route path='make-burger/:foodType' element={<MakeBurgerPage />} />
					</Route>
				</Route>

				<Route
					path='/dashboard'
					element={
						<RequireAuth>
							<DashboardLayout />
						</RequireAuth>
					}>
					<Route index element={<Navigate to='orders' />} />
					<Route path='profile' element={<MyProfilePage />} />
					<Route path='orders' element={<MyOrdersPage />} />
					<Route path='orders/:id' element={<MyOrderDetailPage />} />

					<Route path='admin'>
						<Route index element={<Navigate to='orders' />} />
						<Route
							path='orders'
							element={
								<RequireAuth isAdmin>
									<ManageOrdersPage />
								</RequireAuth>
							}
						/>
						<Route
							path='orders/:id'
							element={
								<RequireAuth isAdmin>
									<AdminOrderDetailPage />
								</RequireAuth>
							}
						/>
					</Route>
				</Route>
			</Routes>
		</PageFirstLoadOverlay>
	);
};

export default App;
