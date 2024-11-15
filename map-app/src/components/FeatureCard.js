import React from "react";

const FeatureCard = ({ feature }) => {
  return (
    <div className="card">
      <h3>Feature Details</h3>
      <p><strong>Type:</strong> {feature.type}</p>
      {feature.type === "Point" && (
        <>
          <p><strong>Latitude:</strong> {feature.coordinates[1]}</p>
          <p><strong>Longitude:</strong> {feature.coordinates[0]}</p>
        </>
      )}
      {feature.type === "Polygon" && (
        <>
          <p><strong>Coordinates:</strong> {JSON.stringify(feature.coordinates)}</p>
        </>
      )}
    </div>
  );
};

export default FeatureCard;
