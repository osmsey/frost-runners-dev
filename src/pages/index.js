import dynamic from 'next/dynamic';

// Dynamically import the MapComponent to prevent server-side rendering issues
const MapComponent = dynamic(() => import('../components/Map'), {
  ssr: false
});

export default function Home() {
  return (
    <div>
      <h1>Location Tracker Map</h1>
      <MapComponent />
    </div>
  );
}
