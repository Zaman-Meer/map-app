import { Polygon } from "@turf/turf";
import React, { createContext, useContext, useState, useEffect } from "react";
import * as turf from "@turf/turf";

// interface for values of MapboxContext
interface MapboxContextValue {
  plotData: GeoJSON.MultiPolygon | null; // MultiPolygon data for plot
  setPlotData: (plotData: GeoJSON.MultiPolygon) => void; // Function to set plotData
  buildingData: GeoJSON.MultiPolygon | null; // MultiPolygon data for building
  setBuildingData: (data: GeoJSON.MultiPolygon | null) => void; // Function to set buildingData
  buildingCoverage: number; // Building coverage percentage
  onBuildingCoverageChange: (coverage: number) => void; // Function to set building coverage
  numberOfFloors: number; // Number of floors of building
  setNumberOfFloors: (numberOfFloors: number) => void; // Function to set number of floors
  floorHeight: number; // Height of each floor of building
  setFloorHeight: (floorHeight: number) => void; // Function to set floor height
  landArea: number; // Area of plot
  buildingArea: number; // Area of building
  floorArea: number; // Area of each floor
  buildingVolume: number; // Volume of building
  buildingHeight: number; // Height of building
}

// create context for MapboxContext
export const MapboxContext = createContext<MapboxContextValue>({
  plotData: null,
  setPlotData: () => {},
  buildingData: null,
  setBuildingData: () => {},
  buildingCoverage: 0,
  onBuildingCoverageChange: () => {},
  numberOfFloors: 0,
  setNumberOfFloors: () => {},
  floorHeight: 0,
  setFloorHeight: () => {},
  landArea: 0,
  buildingArea: 0,
  floorArea: 0,
  buildingVolume: 0,
  buildingHeight: 0,
});

// Hook to get MapboxContext values
export const useMapBoxContext = () => useContext(MapboxContext);

// Mapbox Provider component to provide context values
interface MapboxProviderProps {
  children: React.ReactNode;
}

// Mapbox Provider component to hold the state values and provide access to the children components
export const MapboxProvider = ({ children }: MapboxProviderProps) => {
  // State variables for the plotData, buildingData, buildingCoverage, numberOfFloors, floorHeight, landArea, buildingArea, floorArea, buildingVolume, and buildingHeight
  const [plotData, setPlotData] = useState<GeoJSON.MultiPolygon | null>(null);
  const [buildingData, setBuildingData] = useState<GeoJSON.MultiPolygon | null>(
    null
  );
  const [buildingCoverage, setBuildingCoverage] = useState<number>(0);
  const [numberOfFloors, setNumberOfFloors] = useState<number>(0);
  const [floorHeight, setFloorHeight] = useState<number>(0);
  const [landArea, setLandArea] = useState<number>(0);
  const [buildingArea, setBuildingArea] = useState<number>(0);
  const [floorArea, setFloorArea] = useState<number>(0);
  const [buildingVolume, setBuildingVolume] = useState<number>(0);
  const [buildingHeight, setBuildingHeight] = useState<number>(0);

  // useEffect hook for when the plotData changes, it updates the building data, sets the default building coverage to 64, sets the default number of floors to 6, sets the default floor height to 5, and sets the land area
  useEffect(() => {
    if (plotData) {
      const newBuildingData = turf.transformScale(plotData, 0.64);
      setBuildingCoverage(64);
      setNumberOfFloors(6);
      setFloorHeight(5);
      setBuildingData(newBuildingData);
      const plotPolygon = turf.polygon(plotData?.coordinates[0] as any);
      setLandArea(turf.area(plotPolygon));
    }
  }, [plotData]);

  // useEffect hook for when either the plotData or buildingData or numberOfFloors or floorHeight changes, it updates the building area, floor area, building volume, and building height
  useEffect(() => {
    if (plotData && buildingData) {
      const buildingPolygon = turf.polygon(buildingData?.coordinates[0] as any);
      setBuildingArea(turf.area(buildingPolygon));
      setFloorArea(turf.area(buildingPolygon));
      setBuildingVolume(
        turf.area(buildingPolygon) * numberOfFloors * floorHeight
      );
      setBuildingHeight(numberOfFloors * floorHeight);
    }
  }, [plotData, buildingData, numberOfFloors, floorHeight]);

  // Function for handling changes in the building coverage
  const onBuildingCoverageChange = (coverage: number) => {
    setBuildingCoverage(coverage);

    if (plotData) {
      const newBuildingData = turf.transformScale(
        plotData,
        parseFloat((coverage / 100)?.toFixed(2))
      );
      setBuildingData(newBuildingData);
    }
  };

  return (
    <MapboxContext.Provider
      value={{
        plotData,
        buildingData,
        buildingCoverage,
        numberOfFloors,
        floorHeight,
        landArea,
        buildingArea,
        floorArea,
        buildingVolume,
        buildingHeight,
        setPlotData,
        setBuildingData,
        onBuildingCoverageChange,
        setNumberOfFloors,
        setFloorHeight,
      }}
    >
      {children}
    </MapboxContext.Provider>
  );
};
