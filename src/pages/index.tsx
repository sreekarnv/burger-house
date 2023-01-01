import type { NextPage } from 'next';
import React from 'react';
import { trpc } from '../utils/trpc';
import { Status } from '../utils/types/orders';

const AuthTab = () => {
	const context = trpc.useContext();

	const { data: lData, mutate: loginMutate } = trpc.auth.login.useMutation({
		onSuccess: (d) => {
			context.auth.user.setData(undefined, d);
		},
	});
	const { data: rData, mutate: registerMutate } =
		trpc.auth.register.useMutation();
	const { mutate: logoutMutate } = trpc.auth.logout.useMutation({
		onSuccess: () => {
			context.auth.user.setData(undefined, null);
		},
	});
	return (
		<>
			<section>
				<div style={{ margin: '2rem' }}>
					<h1>Register</h1>
					<button
						onClick={() =>
							registerMutate({
								name: 'Shanmukh',
								email: 'shanmukh@gmail.com',
								password: 'Pass123#',
								passwordConfirm: 'Pass123#',
							})
						}>
						Register
					</button>
					<pre style={{ fontSize: '1.6rem' }}>
						{JSON.stringify(rData, null, 2)}
					</pre>
				</div>
				<div style={{ margin: '2rem' }}>
					<h1>Login</h1>
					<button
						onClick={() =>
							loginMutate({
								email: 'sreekarnv1@gmail.com',
								password: 'Pass123#',
							})
						}>
						Login Sreekar
					</button>

					<button
						onClick={() =>
							loginMutate({
								email: 'shanmukh@gmail.com',
								password: 'Pass123#',
							})
						}>
						Login Shanmukh
					</button>
					<pre style={{ fontSize: '1.6rem' }}>
						{JSON.stringify(lData, null, 2)}
					</pre>
				</div>
				<div style={{ margin: '2rem' }}>
					<h1>Logout</h1>
					<button onClick={() => logoutMutate()}>Logout</button>
				</div>
			</section>
		</>
	);
};

const IngredientsTab = () => {
	const { data: ingredients } = trpc.ingredient.all.useQuery();
	return (
		<>
			<section>
				<div style={{ margin: '2rem' }}>
					<h1>Ingredients</h1>
					<pre style={{ fontSize: '1.6rem' }}>
						{JSON.stringify(ingredients, null, 2)}
					</pre>
				</div>
			</section>
		</>
	);
};

const BurgersTab = () => {
	const { data: burgers } = trpc.burger.all.useQuery({});
	return (
		<>
			<section>
				<div style={{ margin: '2rem' }}>
					<h1>Burgers</h1>
					<pre style={{ fontSize: '1.6rem' }}>
						{JSON.stringify(burgers, null, 2)}
					</pre>
				</div>
			</section>
		</>
	);
};

const OrdersTab = () => {
	const { data: orders } = trpc.order.userAll.useQuery({});
	const { mutate } = trpc.order.create.useMutation({});
	const { mutate: userUpdateStatusMutate } =
		trpc.order.userUpdateStatus.useMutation({});

	return (
		<>
			<section>
				<div style={{ margin: '2rem' }}>
					<button
						onClick={() => {
							mutate({
								price: 1375,
								items: [
									{
										name: 'spicy chicken',
										isVegetarian: false,
										price: 370,
										itemsInCart: 1,
										photoUrl:
											'/uploads/burgers/burger-5fd4c289748de121cc1d7327-1607791958760.jpeg',
										ingredients: [],
									},
									{
										name: 'mexican aloo',
										isVegetarian: true,
										price: 335,
										itemsInCart: 3,
										photoUrl:
											'/uploads/burgers/burger-5fd4c289748de121cc1d7327-1607792059111.jpeg',
										ingredients: [],
									},
								],
							});
						}}>
						Create Order
					</button>

					<h1>Orders</h1>

					<button
						onClick={() => {
							return userUpdateStatusMutate({
								_id: '63b11788ca665357ee51751f',
								status: Status.Cancelled,
							});
						}}>
						Update Order Status [User]
					</button>

					<pre style={{ fontSize: '1.6rem' }}>
						{JSON.stringify(orders, null, 2)}
					</pre>
				</div>
			</section>
		</>
	);
};

const IndexPage: NextPage = ({}) => {
	const [tab, setTab] = React.useState<
		'auth' | 'ingredients' | 'burgers' | 'orders'
	>('auth');

	return (
		<>
			<section>
				<button onClick={() => setTab('auth')}>Show Auth</button>
				<button onClick={() => setTab('ingredients')}>Show Ingredients</button>
				<button onClick={() => setTab('burgers')}>Show Burgers</button>
				<button onClick={() => setTab('orders')}>Show Orders</button>
			</section>
			<div>
				{tab === 'auth' && <AuthTab />}
				{tab === 'ingredients' && <IngredientsTab />}
				{tab === 'burgers' && <BurgersTab />}
				{tab === 'orders' && <OrdersTab />}
			</div>
		</>
	);
};

export default IndexPage;
