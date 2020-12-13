import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import CustomBurgerRoutes from "../CustomBurger/CustomBurgerRoutes";
import DashboardRoutes from "../Dashboard/DashboardRoutes";
import Loader from "../shared/components/Loader/Loader";

const Home = React.lazy(() => import("./../Home/Home"));
const Menu = React.lazy(() => import("./../Menu/Menu"));
const Cart = React.lazy(() => import("./../Cart/Cart"));
const About = React.lazy(() => import("./../About/About"));

const Login = React.lazy(() => import("./../Auth/Login"));
const Logout = React.lazy(() => import("./../Auth/Logout"));
const Register = React.lazy(() => import("./../Auth/Register"));
const SendEmailConfirmation = React.lazy(() =>
	import("../Auth/SendEmailConfirmation")
);
const VerifyUserAccount = React.lazy(() => import("../Auth/VerifyUserAccount"));

const Body = (props) => {
	return (
		<Suspense fallback={<Loader fullScreen />}>
			<Switch>
				<Route path='/' exact>
					<Home />
				</Route>

				<Route path='/login' exact>
					<Login />
				</Route>

				<Route path='/register' exact>
					<Register />
				</Route>

				<Route path='/logout' exact>
					<Logout />
				</Route>

				<Route path='/menu' exact>
					<Menu />
				</Route>

				<Route path='/make-my-burger'>
					<CustomBurgerRoutes />
				</Route>

				<Route path='/cart' exact>
					<Cart />
				</Route>

				<Route path='/about' exact>
					<About />
				</Route>

				<Route path='/dashboard'>
					<DashboardRoutes />
				</Route>

				<Route path='/send-email-confirmation' exact>
					<SendEmailConfirmation />
				</Route>

				<Route path='/verify-user/:tokenId' exact>
					<VerifyUserAccount />
				</Route>
			</Switch>
		</Suspense>
	);
};

export default Body;
