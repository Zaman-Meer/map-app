import React, { useState, useRef, useEffect } from "react";
import DeckGL from "@deck.gl/react/typed";
import { Map } from "react-map-gl";
import {
  _CameraLight as CameraLight,
  LightingEffect,
} from "@deck.gl/core/typed";
import "mapbox-gl/dist/mapbox-gl.css";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import * as turf from "@turf/turf";
import { useMapBoxContext } from "../../context/MapBoxContext";
import { MAPBOX_API_KEY, MAP_INITIAL_VIEWSTATE } from "../../constants";

// Importing and creating lighting effect
const lightingEffect = new LightingEffect({
  cameraLight: new CameraLight({
    color: [255, 255, 255], // The color of the light, white in this case
    intensity: 2.0, // The intensity of the light
  }),
});

const MapBox = () => {
  // Getting the building and plot data from context
  const { buildingData, plotData, floorHeight, numberOfFloors } =
    useMapBoxContext();
  // Setting initial view state for map
  const [viewState, setViewState] = useState<any>(MAP_INITIAL_VIEWSTATE);
  // Setting the initial layer state to an empty array
  const [layers, setLayers] = useState<any>([]);
  // Referencing the map component
  const mapRef = useRef<any>(null);

  // Use effect hook to update the plot layer if plotData changes
  useEffect(() => {
    // If plotData is not present, return
    if (!plotData) return;
    if (plotData) {
      // Creating a polygon from the plot data coordinates
      let polygon = turf.polygon(plotData?.coordinates[0] as any);
      // Getting the center of mass of the polygon
      const centerOfMass = turf.centerOfMass(polygon);
      // Setting the viewState with the longitude and latitude of the center of mass
      setViewState((prev: any) => ({
        ...prev,
        longitude: centerOfMass.geometry.coordinates[0],
        latitude: centerOfMass.geometry.coordinates[1],
      }));

      // Creating the plot layer with GeoJsonLayer
      const plotLayer = new GeoJsonLayer({
        id: "plot", // Unique id for the layer
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                coordinates: plotData?.coordinates[0], // The coordinates of the plot data
                type: "Polygon", // The type of geometry, Polygon in this case
              },
            },
          ],
        } as any,
        opacity: 0.6, // The opacity of the layer
        stroked: true, // If the layer should be stroked or not
        filled: true, // If the layer should be filled or not
        extruded: false, // If the layer should be extruded or not
        wireframe: false, // If the layer should have
        fp64: true,
        getElevation: 0,
        getFillColor: [204, 240, 232],
        getLineColor: (f) => [255, 255, 255],
        pickable: true,
      });

      setLayers([plotLayer]);
    }
  }, [plotData]);

  // useEffect hook to set the building layer in the map
  useEffect(() => {
    if (!plotData) return;
    // Create the building layer using the GeoJsonLayer
    const buildingLayer = new GeoJsonLayer({
      id: "building",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              coordinates: buildingData?.coordinates[0],
              type: "Polygon",
            },
          },
        ],
      } as any,

      opacity: 1,
      stroked: false,
      filled: true,
      extruded: true,
      wireframe: false,
      fp64: true,
      getElevation: floorHeight * numberOfFloors,
      getFillColor: [224, 209, 72],
      getLineColor: (f) => [255, 255, 255],
      pickable: true,
    });

    setLayers([layers[0], buildingLayer]);
  }, [buildingData, floorHeight, numberOfFloors]);

  return (
    <DeckGL
      layers={[...layers]}
      initialViewState={viewState}
      effects={[lightingEffect]}
      controller={true}
    >
      <Map
        ref={mapRef}
        mapStyle={"mapbox://styles/mapbox/streets-v11"}
        reuseMaps
        initialViewState={viewState}
        mapboxAccessToken={MAPBOX_API_KEY}
      />
    </DeckGL>
  );
};

export default MapBox;
