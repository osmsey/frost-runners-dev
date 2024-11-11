import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: '/resources/images/marker.png', 
  iconSize: [30, 30],           
  iconAnchor: [15, 40],         
  popupAnchor: [0, -40],        
  className: 'custom-marker-icon'
});

const MapComponent = () => {
  const [location, setLocation] = useState({ lat: 51.505, lng: -0.09 }); // Default location (London)
  const [isWatching, setIsWatching] = useState(false); // Flag for manual tracking mode

  const geoOptions = {
    enableHighAccuracy: true,
    maximumAge: 0,      // No cached positions; always request fresh data
    timeout: 10000      // Wait up to 10 seconds for a response
  };
  // Function to update location when button is clicked
  const updateLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error retrieving location', error);
      }, { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    
    );
  };

  // Effect to automatically update location if isWatching is true
  useEffect(() => {
    if (!isWatching) return;

    const watcher = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error retrieving location', error);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, [isWatching]);

  return (
    <div>
      <MapContainer center={location} zoom={13} style={{ height: '80vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={location} icon={customIcon}>
          <Popup>Your current location</Popup>
        </Marker>
        <MoveMap center={location} />
      </MapContainer>
      
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <button onClick={updateLocation}>Get Current Location</button>
        <button onClick={() => setIsWatching(!isWatching)}>
          {isWatching ? 'Stop Auto Tracking' : 'Start Auto Tracking'}
        </button>
      </div>
    </div>
  );
};

// Helper component to move the map when location changes
const MoveMap = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

export default MapComponent;
