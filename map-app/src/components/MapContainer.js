import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polygon, useMapEvents } from "react-leaflet";
import { fetchSpatialData } from "../services/apiService";
import L from "leaflet";
import FeatureCard from "./FeatureCard";

const MapView = () => {
  const [spatialData, setSpatialData] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchSpatialData();
      setSpatialData(data || []);
    };
    getData();
  }, []);

  const handleClick = (feature) => {
    setSelectedFeature(feature);
  };

  const customMarkerIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [25, 41],
  });

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "75%", height: "600px" }}>
        <MapContainer center={[37.7749, -122.4194]} zoom={13} style={{ height: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {spatialData.map((feature, index) => {
            if (feature.type === "Point") {
              const [lng, lat] = feature.coordinates;
              return (
                <Marker
                  key={index}
                  position={[lat, lng]}
                  icon={customMarkerIcon}
                  eventHandlers={{ click: () => handleClick(feature) }}
                />
              );
            }

            if (feature.type === "Polygon" || feature.type === "Multipolygon") {
              return (
                <Polygon
                  key={index}
                  positions={feature.coordinates}
                  color="blue"
                  eventHandlers={{ click: () => handleClick(feature) }}
                />
              );
            }

            return null;
          })}
        </MapContainer>
      </div>
      <div style={{ width: "25%" }}>
        {selectedFeature && <FeatureCard feature={selectedFeature} />}
      </div>
    </div>
  );
};

export default MapView;
