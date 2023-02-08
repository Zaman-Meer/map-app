/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render } from "@testing-library/react";
import BuildingProperties from "./BuildingProperties";
import { useMapBoxContext } from "../../context/MapBoxContext";

jest.mock("../../context/MapBoxContext", () => ({
  useMapBoxContext: jest.fn(),
}));

describe("BuildingProperties", () => {
  it("should render the component with the correct values", () => {
    (useMapBoxContext as jest.Mock).mockReturnValue({
      buildingCoverage: 50,
      onBuildingCoverageChange: jest.fn(),
      numberOfFloors: 10,
      setNumberOfFloors: jest.fn(),
      floorHeight: 3,
      setFloorHeight: jest.fn(),
    });

    const { getByText } = render(<BuildingProperties />);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText("Plot Coverage %")).toBeInTheDocument();
    expect(getByText("50")).toBeInTheDocument();
    expect(getByText("Number of Floors")).toBeInTheDocument();
    expect(getByText("10")).toBeInTheDocument();
    expect(getByText("Height per Floor (in meters)")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
  });
});
