import React from "react";
import { newMarker} from "../../types/newMarker";
import { MapMarker } from "../MapMarker/MapMarker";

type Props = {
  markers: newMarker[],
  setMarkers: React.Dispatch<React.SetStateAction<newMarker[]>>;
}

export const MarkersList: React.FC<Props> = ({ markers, setMarkers }) => {
  return (
    <>
      {markers.map((marker) => (
      <React.Fragment key={marker.id}>
        <MapMarker marker={marker} setMarkers={setMarkers} />
      </React.Fragment>
      ))}
    </>
  )
}