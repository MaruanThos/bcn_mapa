import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import districtesGeoJSON from './json/districtes_geo.json'; 
import 'leaflet/dist/leaflet.css';
import './App.css';

const center = [41.390205, 2.154007];

function DistrictTitle(props) {
  return (
    <div className="district-title">
      <h3>{props.title}</h3>
    </div>
  );
}

function App() {
  const [districtName, setDistrictName] = useState('');

  const onEachDistrict = (district, layer) => {
    if (district.properties && district.properties.N_Distri) {
      layer.on({
        mouseover: () => {
          setDistrictName(district.properties.N_Distri);
        },
        mouseout: () => {
          setDistrictName('');
        }
      });
    }
  };

  return (
    <div className="App">
       <DistrictTitle title={districtName ? "Barcelona: "+districtName : "Barcelona"} />
      <MapContainer center={center} zoom={12} style={{ height: '600px', width: '100%', position: 'relative' }} className='mapa'>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON
          data={districtesGeoJSON}
          className="district"
          onEachFeature={onEachDistrict}
        />
       
      </MapContainer>
    </div>
  );
}

export default App;
