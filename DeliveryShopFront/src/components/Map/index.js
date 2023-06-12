import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";

const Map = ({ packages, handlePackageClick }) => {
  const mapboxToken = "YOUR_MAPBOX_TOKEN"; // Postavite svoj Mapbox token ovde

  const handleMarkerClick = (packageId) => {
    // Prosledite kliknutoj markici ID paketa na funkciju za prihvatanje paketa
    handlePackageClick(packageId);
  };

  return (
    <ReactMapGL
      width="100%"
      height="500px"
      latitude={YOUR_DEFAULT_LATITUDE}
      longitude={YOUR_DEFAULT_LONGITUDE}
      zoom={10}
      mapboxApiAccessToken={mapboxToken}
    >
      {packages.map((package) => (
        <Marker
          key={package.id}
          latitude={package.latitude}
          longitude={package.longitude}
        >
          <div className="marker" onClick={() => handleMarkerClick(package.id)}>
            {/* Prikaz ikonice paketa */}
          </div>
        </Marker>
      ))}
    </ReactMapGL>
  );
};

export default Map;
