import dynamic from 'next/dynamic';
import {  useEffect, useRef } from 'react';
const DynamicMap = dynamic(() => import('./DynamicMap'), {
  ssr: false
});

// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shift

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;

const Map = (props) => {
  const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT,  } = props;
  const mapRef = useRef(null);
  return (
    <div style={{ aspectRatio: width / height }}>
      <DynamicMap {...props} ref={mapRef} />
    </div>
  )
}

export default Map;