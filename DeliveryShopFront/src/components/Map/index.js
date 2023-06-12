import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";

const Map = ({ packages, handlePackageClick }) => {
  const mapboxToken =
    "pk.eyJ1Ijoic2NvdGhpcyIsImEiOiJjaWp1Y2ltYmUwMDBicmJrdDQ4ZDBkaGN4In0.sbihZCZJ56-fsFNKHXF8YQ"; // Postavite svoj Mapbox token ovde

  const handleMarkerClick = (packageId) => {
    // Prosledite kliknutoj markici ID paketa na funkciju za prihvatanje paketa
    handlePackageClick(packageId);
  };

  return (
    <ReactMapGL
      width="100%"
      height="500px"
      latitude={41.1234}
      longitude={20.5678}
      zoom={10}
      mapboxApiAccessToken={mapboxToken}
    >
      {packages.map((packaged) => (
        <Marker
          key={packaged.id}
          latitude={packaged.latitude}
          longitude={packaged.longitude}
        >
          <div
            className="marker"
            onClick={() => handleMarkerClick(packaged.id)}
          >
            {/* Prikaz ikonice paketa */}
          </div>
        </Marker>
      ))}
    </ReactMapGL>
  );
};

export default Map;
