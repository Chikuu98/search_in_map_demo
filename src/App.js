import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';

function LeafletMap() {
  const map = useMap();

  useEffect(() => {
    // Add the Geocoder control to the map
    const geocoder = L.Control.geocoder().addTo(map);

    // Optionally listen for the result event if you want to handle search results
    geocoder.on('markgeocode', function(e) {
      const bbox = e.geocode.bbox;
      const poly = L.polygon([
        [bbox.getSouthEast().lat, bbox.getSouthEast().lng],
        [bbox.getNorthEast().lat, bbox.getNorthEast().lng],
        [bbox.getNorthWest().lat, bbox.getNorthWest().lng],
        [bbox.getSouthWest().lat, bbox.getSouthWest().lng]
      ]);
      map.fitBounds(poly.getBounds());
    });

  }, [map]);

  return null;
}

function App() {
  return (
    <div style={{ height: '100vh' }}>
      <MapContainer center={[7.8731, 80.7718]} zoom={8} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <LeafletMap />
      </MapContainer>
    </div>
  );
}

export default App;
