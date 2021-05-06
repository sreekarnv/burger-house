import 'mapbox-gl/dist/mapbox-gl.css';
import './track-order-map.scss';

import * as React from 'react';

import { AnimatePresence, Variants, motion } from 'framer-motion';

import Backdrop from '~app/components/shared/ui/backdrop/Backdrop';
import Button from '~app/components/shared/ui/button/Button';
import CrossIcon from '~app/components/shared/ui/icons/CrossIcon';
import IconButton from '~app/components/shared/ui/icon-button/IconButton';
import { Order } from '~@types/orders';
import { User } from '~@types/user';
import mapboxgl from 'mapbox-gl';
import useMapBox from '~app/hooks/api/queries/useMapBox';
import { useQueryClient } from 'react-query';
import useUpdateOrderMutation from '~app/hooks/api/mutations/useUpdateOrderMutation';

interface Props {
	order: Order;
	show: boolean;
	closeMap: () => void;
}

const CENTER_COORDINATES: mapboxgl.LngLatLike | undefined = [
	78.267961,
	17.4126274,
];

const variants: Variants = {
	hide: {
		opacity: 0,
		y: -1000,
		transition: {
			duration: 0.5,
			ease: 'easeOut',
			type: 'tween',
		},
	},
	show: {
		opacity: 1,
		y: 30,
		transition: {
			duration: 0.5,
			ease: 'easeOut',
			type: 'tween',
		},
	},
};

const MAP_STYLES = 'mapbox://styles/sreekarnv/ckg0ssj7j2ia919oflok173f1';

const TrackOrderMap: React.FC<Props> = ({ order, show, closeMap }) => {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user')!;
	const mapContainerRef = React.useRef<any>();
	const mapRef = React.useRef<mapboxgl.Map>();
	const { data } = useMapBox();
	const { updateOrderStatus } = useUpdateOrderMutation({});

	const loadMap = () => {
		mapRef.current = new mapboxgl.Map({
			accessToken: process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN!,
			container: mapContainerRef.current,
			style: MAP_STYLES,
			center: CENTER_COORDINATES,
			zoom: 11,
			scrollZoom: false,
		});
	};

	const loadMapData = () => {
		var counter: number = 0;
		let timeOrder = new Date(order.createdAt);
		let timeNow = new Date(Date.now());

		if (order.status === 'cancelled') {
			counter = 0;
		} else if (order.status === 'delivered') {
			counter = data.data.routes[0].geometry.coordinates.length - 1;
		} else {
			let x = timeOrder.getDate();
			let y = timeOrder.getMonth();
			let z = timeOrder.getFullYear();
			let a = timeNow.getDate();
			let b = timeNow.getMonth();
			let c = timeNow.getFullYear();

			if (x === a && y === b && z === c) {
				const timeNowHrs = parseInt(timeNow.getHours().toString(), 10);
				const timeNowMin = parseInt(timeNow.getMinutes().toString(), 10);
				const timeOrderHrs = parseInt(timeOrder.getHours().toString(), 10);
				const timeOrderMin = parseInt(timeOrder.getMinutes().toString(), 10);

				if (timeNowHrs === timeOrderHrs) {
					counter = timeNowMin - timeOrderMin;
				} else if (timeNowHrs > timeOrderHrs) {
					counter =
						timeNowHrs * 60 + timeNowMin - (timeOrderHrs * 60 + timeOrderMin);
				}
			} else {
				updateOrderStatus({ id: order._id, status: 'delivered' });
				closeMap();
			}

			if (counter! > data.data.routes[0].geometry.coordinates.length) {
				counter = data.data.routes[0].geometry.coordinates.length - 1;
				updateOrderStatus({ id: order._id, status: 'delivered' });
				closeMap();
			}
		}

		mapRef.current!.on('load', () => {
			mapRef.current?.resize();
			let route = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						geometry: {
							type: 'LineString',
							coordinates: [
								user.location.coordinates,
								data.data.routes[0].geometry.coordinates[0],
							],
						},
					},
				],
			};

			let point = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						properties: {},
						geometry: {
							type: 'Point',
							coordinates: user.location.coordinates,
						},
					},
				],
			};

			mapRef.current!.addSource('route', {
				type: 'geojson',
				data: {
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'LineString',
						coordinates: [...data.data.routes[0].geometry.coordinates],
					},
				},
			});

			mapRef.current!.addLayer({
				id: 'route',
				type: 'line',
				source: 'route',
				layout: {
					'line-join': 'round',
					'line-cap': 'round',
				},
				paint: {
					'line-color': '#0099CC',
					'line-width': 8,
				},
			});

			//////////////////
			mapRef.current!.addSource('route1', {
				type: 'geojson',
				// @ts-ignore
				data: route,
			});

			mapRef.current!.addSource('point', {
				type: 'geojson',
				// @ts-ignore
				data: point,
			});

			mapRef.current!.addLayer({
				id: 'route1',
				source: 'route',
				type: 'line',
				paint: {
					'line-width': 2,
					'line-color': 'transparent',
				},
			});

			mapRef.current!.addLayer({
				id: 'point',
				source: 'point',
				type: 'symbol',
				layout: {
					'icon-image': 'car-15',
					'icon-size': 2,
					'icon-rotate': ['get', 'bearing'],
					'icon-rotation-alignment': 'map',
					'icon-allow-overlap': true,
					'icon-ignore-placement': true,
				},
			});

			point.features[0].geometry.coordinates = [
				...data.data.routes[0].geometry.coordinates,
			].reverse()[counter];
			// @ts-ignore
			mapRef.current!.getSource('point').setData(point);
		});

		new mapboxgl.Marker()
			.setLngLat(user.location.coordinates)
			.addTo(mapRef.current!);

		new mapboxgl.Marker().setLngLat(CENTER_COORDINATES).addTo(mapRef.current!);

		new mapboxgl.Popup({
			offset: 30,
		})
			.setLngLat(CENTER_COORDINATES)
			.setHTML(`<p>Burger House</p>`)
			.addTo(mapRef.current!);

		new mapboxgl.Popup({
			offset: 30,
		})
			.setLngLat(user.location.coordinates)
			.setHTML(`<p>Your Location</p>`)
			.addTo(mapRef.current!);
	};

	const refreshMap = () => {
		mapRef.current?.remove();
		loadMap();
		loadMapData();
	};

	React.useEffect(() => {
		loadMap();

		return () => mapRef.current?.remove();
	}, []);

	React.useEffect(() => {
		if (data) {
			loadMapData();
		}
	}, [data]);

	return (
		<>
			<Backdrop show={show} onClose={closeMap} />
			<AnimatePresence>
				<motion.div
					variants={variants}
					initial={'hide'}
					animate={show ? 'show' : 'hide'}
					exit={'hide'}
					className='track-order'>
					<div className='track-order__cta u-mb-5'>
						<Button
							onClick={refreshMap}
							size='sm'
							color='tertiary'
							variant='outlined'>
							Refresh Map
						</Button>
						<IconButton onClick={closeMap}>
							<CrossIcon />
						</IconButton>
					</div>
					<div className='track-order__map' ref={mapContainerRef}></div>
				</motion.div>
			</AnimatePresence>
		</>
	);
};

export default TrackOrderMap;
