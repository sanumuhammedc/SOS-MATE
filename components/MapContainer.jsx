
import { Map, Marker } from 'google-maps-react';

const MapContainer = ({ lat, lng }) => {
  const mapStyles = {
    width: '100%',
    height: '400px',
  };

  return (
    <Map
      google={window.google}
      zoom={14}
      style={mapStyles}
      initialCenter={{ lat, lng }}
    >
      <Marker position={{ lat, lng }} />
    </Map>
  );
};

export default MapContainer;
