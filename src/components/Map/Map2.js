import { useEffect, useRef } from 'react';
import useGeoLocation from 'src/hooks/useGeolocation';
// import and use components as usual
import { MapContainer, TileLayer, ZoomControl,  } from './MapComponents.js';
import styles from '@styles/Home.module.scss';
import Button from '@components/Button/Button.js';


const Map = ({ children, className, width, height, ref, ...rest }) => {
  const mapRef = useRef(null);
  const location = useGeoLocation();

  const showMyLocation = () => {
    if (location.loaded && !location.error) {
      mapRef.current.leafletElement.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        ZOOM_LEVEL,
        { animate: true }
      );
    } else {
      alert(location?.error?.message);
    }
  };
  return (
    <>
    <MapContainer
      ref={mapRef}
      touchZoom={false}
      zoomControl={false}
      style={{ height: '400px', zIndex: '0!important' }}
    >
    <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {/* <Marker position={center}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker> */}
              </>
            
    </MapContainer>
    <p className={styles.view}>
            <Button onClick={showMyLocation} >Start tracking</Button>
            
          </p>
    </>
  );
};

export default Map;