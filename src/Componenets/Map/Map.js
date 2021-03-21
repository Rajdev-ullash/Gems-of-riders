import React from 'react';
import GoogleMapReact from 'google-map-react'
const Map = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDj29SJs7A95ja8tUyquK7osKDXzT41Zp8' }}
        defaultCenter={{ lat: 23.8103, lng: 90.4125 }}
        defaultZoom={12}
      >
        
      </GoogleMapReact>
    </div>
  );
};

export default Map;
