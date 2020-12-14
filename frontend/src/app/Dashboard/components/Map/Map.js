import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import mapboxgl from "mapbox-gl";

class Map extends React.Component {
	async componentDidMount() {
		const accessToken =
			"pk.eyJ1Ijoic3JlZWthcm52IiwiYSI6ImNrY2Vsem4xZzA3MmYycG53NDR6eWJidWUifQ.tnWqUEjgrrsKkfuhDzOBJQ";
		//  process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN;
		mapboxgl.accessToken = accessToken;

		const res = await axios({
			method: "GET",
			url: `https://api.mapbox.com/directions/v5/mapbox/driving/${this.props.user.location.coordinates[0]},${this.props.user.location.coordinates[1]};78.267961,17.4126274?geometries=geojson&access_token=${accessToken}`,
		});
		this.res = res;
		this.getData();
	}

	getData = async () => {
		var counter;
		let timeOrder = new Date(this.props.order.createdAt);
		let timeNow = new Date(Date.now());

		const centerCoordinates = [78.267961, 17.4126274];

		const map = new mapboxgl.Map({
			container: this.mapContainer,
			style: "mapbox://styles/sreekarnv/ckg0ssj7j2ia919oflok173f1",
			center: centerCoordinates,
			zoom: 11,
			scrollZoom: false,
		});

		this.map = map;

		const res = this.res;

		if (this.props.order.status === "cancelled") {
			counter = 0;
		} else if (this.props.order.status === "delivered") {
			counter = res.data.routes[0].geometry.coordinates.length - 1;
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
				this.props.onChangeStatusHandler();
			}

			if (counter > res.data.routes[0].geometry.coordinates.length) {
				counter = res.data.routes[0].geometry.coordinates.length - 1;
				this.props.onChangeStatusHandler();
			}
		}

		// // Add the marker
		new mapboxgl.Marker()
			.setLngLat(this.props.user.location.coordinates)
			.addTo(map);

		new mapboxgl.Marker().setLngLat([78.267961, 17.4126274]).addTo(map);

		new mapboxgl.Popup({
			offset: 30,
		})
			.setLngLat([78.267961, 17.4126274])
			.setHTML(`<p>Burger House</p>`)
			.addTo(map);

		new mapboxgl.Popup({
			offset: 30,
		})
			.setLngLat(this.props.user.location.coordinates)
			.setHTML(`<p>Your Location</p>`)
			.addTo(map);

		let route = {
			type: "FeatureCollection",
			features: [
				{
					type: "Feature",
					geometry: {
						type: "LineString",
						coordinates: [
							this.props.user.location.coordinates,
							res.data.routes[0].geometry.coordinates[0],
						],
					},
				},
			],
		};

		this.route = route;

		let point = {
			type: "FeatureCollection",
			features: [
				{
					type: "Feature",
					properties: {},
					geometry: {
						type: "Point",
						coordinates: this.props.user.location.coordinates,
					},
				},
			],
		};

		this.point = point;

		map.on("load", function () {
			map.addSource("route", {
				type: "geojson",
				data: {
					type: "Feature",
					properties: {},
					geometry: {
						type: "LineString",
						coordinates: [...res.data.routes[0].geometry.coordinates],
					},
				},
			});

			map.addLayer({
				id: "route",
				type: "line",
				source: "route",
				layout: {
					"line-join": "round",
					"line-cap": "round",
				},
				paint: {
					"line-color": "#0099CC",
					"line-width": 8,
				},
			});

			//////////////////
			map.addSource("route1", {
				type: "geojson",
				data: route,
			});

			map.addSource("point", {
				type: "geojson",
				data: point,
			});

			map.addLayer({
				id: "route1",
				source: "route",
				type: "line",
				paint: {
					"line-width": 2,
					"line-color": "transparent",
				},
			});

			map.addLayer({
				id: "point",
				source: "point",
				type: "symbol",
				layout: {
					"icon-image": "car-15",
					"icon-size": 2,
					"icon-rotate": ["get", "bearing"],
					"icon-rotation-alignment": "map",
					"icon-allow-overlap": true,
					"icon-ignore-placement": true,
				},
			});
			point.features[0].geometry.coordinates = [
				...res.data.routes[0].geometry.coordinates,
			].reverse()[counter];
			map.getSource("point").setData(point);
		});
	};

	componentWillUnmount() {
		this.map.remove();
	}

	render() {
		return (
			<>
				<div className='mapContainer__heading'>
					<h2 className='heading-2 u-text-primary u-ftwt-400'>Track Order</h2>
					<button className='btn btn__tertiary btn__sm' onClick={this.getData}>
						Click Here To Update Map
					</button>
				</div>
				<div
					className='mapContainer'
					style={{ width: "100%", height: "100%" }}
					ref={(el) => (this.mapContainer = el)}
				/>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
	};
};

export default connect(mapStateToProps)(Map);
