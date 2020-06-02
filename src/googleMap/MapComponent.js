import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle,
} from "react-google-maps";
import { compose, withProps } from "recompose";

const color = {
  strokeWeight: 0,
  fillColor: "rgba(255,0,0, 0.7)",
};

const MapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyB7exZMUKU7pPZifDhZq1x3qplK1Cxk6AE&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh`, width: "100%" }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  return (
    <>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 27.717245, lng: 85.323959 }}
        onClick={props.handleClick}
      >
        <Marker position={{ lat: props.center.lat, lng: props.center.lng }} />
        <Circle
          center={{ lat: props.center.lat, lng: props.center.lng }}
          radius={1000}
          options={color}
        />
      </GoogleMap>
    </>
  );
});

export default MapComponent;
