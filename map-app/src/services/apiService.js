import axios from "axios";

const EARTHQUAKE_API_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

export const fetchSpatialData = async () => {
  try {
    const response = await axios.get(EARTHQUAKE_API_URL);
    const features = response.data.features.map((feature) => ({
      type: "Point",
      coordinates: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]],
      name: feature.properties.title || "Earthquake Point",
    }));
    return features;
  } catch (error) {
    console.error("Error fetching spatial data", error);
    return [];
  }
};
