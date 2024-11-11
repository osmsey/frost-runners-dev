import {
    MapContainer as LMapContainer,
  } from 'react-leaflet';
  
  export const MapContainer = ({ forwardedRef, ...props }) => (
    <LMapContainer {...props} ref={forwardedRef} />
  );