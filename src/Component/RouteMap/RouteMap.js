import React from 'react';
import 'react-bootstrap';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";

const Map = () => {
    return (
        <GoogleMap
            defaultZoom = {10}
            defaultCenter = {{ lat: 23.777176, lng: 90.399452 }}
        >
        </GoogleMap >
    );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

const RouteMap = () => {
    const REACT_APP_API_KEY = "AIzaSyDZ_5daH59YowWp1VbNbx8CppaWKgJ8iJQ";
    return (
        <div style={{height: "80%", width: "100%"}}>
            <WrappedMap 
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places=${process.env.REACT_APP_API_KEY}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                >

            </WrappedMap>
        </div>
    );
};

export default RouteMap;