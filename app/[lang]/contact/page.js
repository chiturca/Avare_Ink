"use client";
import React, { useCallback, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "70em",
  height: "25em",
};

const center = {
  lat: 39.93707,
  lng: 32.86386,
};

function Contact() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([
    {
      name: "Avare_Ink",
      address: "Pilavoğlu Han Çarşısı, Ankara, Türkiye",
      latitude: 39.93707,
      longitude: 32.86386,
    },
  ]);
  const [selectedPlace, setSelectedPlace] = useState("");

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const svgMarker = {
    path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "#a0f1e8",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    // anchor: new google.maps.Point(0, 20),
  };

  return isLoaded ? (
    <div className="border-red-700 border-4 min-w-max">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {places.map((place) => (
          <MarkerF
            key={`${place.address}-${place.name}-${place.latitude}-${place.longitude}`}
            position={{ lat: place.latitude, lng: place.longitude }}
            onClick={() => {
              place === selectedPlace
                ? setSelectedPlace(undefined)
                : setSelectedPlace(place);
            }}
            icon={svgMarker}
          />
        ))}
        {selectedPlace && (
          <InfoWindowF
            position={{
              lat: selectedPlace.latitude,
              lng: selectedPlace.longitude,
            }}
            onCloseClick={() => setSelectedPlace(undefined)}
            zIndex={1}
            options={{ pixelOffset: { width: 0, height: -40 } }}
          >
            <div className="p-2 text-sky-700">
              <h3 className="pb-2 font-bold">{selectedPlace.name}</h3>
              <p className="font-medium">{selectedPlace.address}</p>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(Contact);
