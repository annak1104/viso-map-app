import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LeafletMouseEvent } from 'leaflet';
import './index.css'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { db } from './firebase';
import { Button } from '@mui/material';
import { collection, setDoc, doc, getDocs } from "firebase/firestore";
import { newMarker } from "./types/newMarker";
import { MarkersList } from "./components/MarkerList/MarkerList";

export const App: React.FC = () => {
  const [markers, setMarkers] = useState<newMarker[]>([]);

useEffect(() => {
  const updateFirebaseData = async () => {
    const firebaseData = markers.map(({ markerNumber, location }) => ({
      Location: { Lat: location[0], Long: location[1] },
      Timestamp: new Date(),
      Next: markers.length + 1,
    }));

    console.log(firebaseData);

    const questCollectionRef = collection(db, 'quests');

    await Promise.all(firebaseData.map(async (data, index) => {
      await setDoc(doc(questCollectionRef, `Quest ${index + 1}`), data);
    }));

    return 'marker added';
  };

  updateFirebaseData().then(result => console.log(result));
}, [markers]);

  const handleMapClick = (event: LeafletMouseEvent) => {
    const newMarkerPosition: [number, number] = [event.latlng.lat, event.latlng.lng];

    const newMarker = {
      markerNumber: markers.length + 1,
      location: newMarkerPosition,
      id: uuidv4(),
    };

    setMarkers((prevState) => [...prevState, newMarker]);
  };

  const MapEvents = () => {
    useMapEvent('click', handleMapClick);
    return null;
  };

  const handleDeleteAllMarkers = () => {
    setMarkers([]);
  };

  return (
    <MapContainer
      center={[50.733436, 25.309950]}
      zoom={6}
      style={{ width: '100%', height: '100vh' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents />
      <MarkersList
        markers={markers}
        setMarkers={setMarkers}
      />

      {!!markers.length && (
       <Button
       variant="contained"
       sx={{
         position: 'absolute',
         top: '10px',
         left: '45%',
         zIndex: 700,
       }}
       onClick={() => handleDeleteAllMarkers()}
     >
       Delete All Markers
     </Button>
      )}

    </MapContainer>
  );
};
