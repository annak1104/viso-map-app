import {Marker, Popup} from "react-leaflet";
import React from "react";
import L, {Icon} from "leaflet";
import { Button } from "@mui/material";
import { newMarker } from "../../types/newMarker";

type Props = {
  marker: newMarker,
  setMarkers: React.Dispatch<React.SetStateAction<newMarker[]>>;
}

const markerIcon = new L.Icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/Map_marker.svg",
  iconSize: [20, 30],
})

export const MapMarker: React.FC<Props> = ({ marker, setMarkers }) => {  
  const {
    location,
    id,
    markerNumber
  } = marker;

  const handleDeleteMarker = (idMarker: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMarkers(prevState => prevState.filter(({ id }) => id !== idMarker));
  };

  const handleMarkerDragEnd = (idMarker: string, event: L.DragEndEvent) => {
    const newMarkerPosition: [number, number] = [event.target.getLatLng().lat, event.target.getLatLng().lng];
    setMarkers((prevState) => prevState.map(marker =>
      marker.id === idMarker ? { ...marker, geo: newMarkerPosition } : marker
    ));
  };

  return (
    <>
      <Marker
        key={id}
        icon={markerIcon}
        position={location}
        draggable={true}
        eventHandlers={{
          dragend: (event) => handleMarkerDragEnd(id, event),
        }}
      >
        <Popup>{`Marker ${markerNumber}`}
          <br/>
          <Button
            onClick={(event) => handleDeleteMarker(id, event)}>
            Delete
          </Button>
        </Popup>
      </Marker>
    </>
  )
}