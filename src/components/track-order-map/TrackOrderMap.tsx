import classes from './track-order-map.module.scss';

import * as React from 'react';

import { AnimatePresence, Variants, motion } from 'framer-motion';

import { HiX } from 'react-icons/hi';
import mapboxgl from 'mapbox-gl';
import { Order } from '../../server/models/order.model';
import { trpc } from '../../utils/trpc';
import useMapBox from '../../hooks/use-mapbox/useMapbox';
import { Status } from '../../utils/types/orders';
import Backdrop from '../shared/backdrop';
import Button from '../shared/button';
import IconButton from '../shared/icon-button';

interface Props {
  order: Order;
  show: boolean;
  closeMap: () => void;
}

const CENTER_COORDINATES: mapboxgl.LngLatLike | undefined = [
  78.267961, 17.4126274,
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
    y: 10,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      type: 'tween',
    },
  },
};

const MAP_STYLES = 'mapbox://styles/sreekarnv/ckg0ssj7j2ia919oflok173f1';

const TrackOrderMap: React.FC<Props> = ({ order, show, closeMap }) => {
  const context = trpc.useContext();
  const user = context.auth.user.getData();
  const mapContainerRef = React.useRef<any>();
  const mapRef = React.useRef<mapboxgl.Map | null>(null);
  const { data } = useMapBox();
  const { mutate: updateOrderStatus } =
    trpc.order.userUpdateStatus.useMutation();

  const loadMap = () => {
    mapRef.current = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN!,
      container: mapContainerRef.current,
      style: MAP_STYLES,
      center: CENTER_COORDINATES,
      zoom: 11,
      scrollZoom: false,
    });
  };

  const loadMapData = () => {
    let counter = 0;
    const timeOrder = new Date(order.createdAt);
    const timeNow = new Date(Date.now());

    if (order.status === 'cancelled') {
      counter = 0;
    } else if (order.status === 'delivered') {
      counter = data.data.routes[0].geometry.coordinates.length - 1;
    } else {
      const x = timeOrder.getDate();
      const y = timeOrder.getMonth();
      const z = timeOrder.getFullYear();
      const a = timeNow.getDate();
      const b = timeNow.getMonth();
      const c = timeNow.getFullYear();

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
        updateOrderStatus({ _id: order._id, status: Status.Delivered });
        closeMap();
      }

      if (counter! > data.data.routes[0].geometry.coordinates.length) {
        counter = data.data.routes[0].geometry.coordinates.length - 1;
        updateOrderStatus({ _id: order._id, status: Status.Delivered });
        closeMap();
      }
    }

    mapRef.current!.on('load', () => {
      mapRef.current?.resize();
      const route = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [
                user?.location.coordinates,
                data.data.routes[0].geometry.coordinates[0],
              ],
            },
          },
        ],
      };

      const point = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: user?.location.coordinates,
            },
          },
        ],
      };

      if (!mapRef.current?.getSource('route')) {
        mapRef.current?.addSource('route', {
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
      }

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
        data: route as any,
      });

      mapRef.current!.addSource('point', {
        type: 'geojson',
        data: point as any,
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

      if (point.features.length) {
        point.features[0]!.geometry!.coordinates = [
          ...data.data.routes[0].geometry.coordinates,
        ].reverse()[counter];
        (mapRef.current!.getSource('point') as any).setData(point);
      }
    });

    new mapboxgl.Marker()
      .setLngLat(user?.location.coordinates as any)
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
      .setLngLat(user?.location.coordinates as any)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          className={classes.root}
        >
          <div className={classes.cta}>
            <Button
              onClick={() => refreshMap()}
              size="sm"
              color="tertiary-outline"
            >
              Refresh Map
            </Button>
            <IconButton aria-label="close map" onClick={closeMap}>
              <HiX size={18} />
            </IconButton>
          </div>
          <div className={classes.map} ref={mapContainerRef}></div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default TrackOrderMap;
