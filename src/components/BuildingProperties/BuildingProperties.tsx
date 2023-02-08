import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import { useMapBoxContext } from "../../context/MapBoxContext";

// Styled component to wrap the display of the slider value
const ValueBox = styled(Box)({
  padding: 5,
  border: "1px solid #ccd0df",
});

/**
 * BuildingProperties is a component that displays sliders to control the coverage, number of floors, and height per floor of a building.
 */
const BuildingProperties = () => {
  // Retrieve context values and functions to update the values
  const {
    buildingCoverage,
    onBuildingCoverageChange,
    numberOfFloors,
    setNumberOfFloors,
    floorHeight,
    setFloorHeight,
  } = useMapBoxContext();

  /**
   * handleFloorAreaChange is a function that updates the building coverage value when the slider value changes.
   * @param event - The change event from the slider.
   * @param value - The new value of the slider.
   */
  const handleFloorAreaChange = (event: Event, value: number | number[]) => {
    const newValue = value as number;
    onBuildingCoverageChange(parseFloat(newValue?.toFixed(2)));
  };

  /**
   * handleFloorsChange is a function that updates the building number of floors value when the slider value changes.
   * @param event - The change event from the slider.
   * @param value - The new value of the slider.
   */
  const handleNumFloorsChange = (event: Event, value: number | number[]) => {
    setNumberOfFloors(value as number);
  };

  /**
   * handleFloorHeightChange is a function that updates the floor height value when the slider value changes.
   * @param event - The change event from the slider.
   * @param value - The new value of the slider.
   */
  const handleHeightPerFloorChange = (
    event: Event,
    value: number | number[]
  ) => {
    setFloorHeight(value as number);
  };

  return (
    <>
      {/* Display the label for building coverage */}
      <Typography
        variant="body1"
        component="p"
        sx={{
          mt: "10px",
        }}
      >
        Plot Coverage %
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Slider
          value={buildingCoverage}
          onChange={handleFloorAreaChange}
          min={0}
          max={100}
          step={1}
          sx={{
            width: "75%",
            ml: "10px",
          }}
          data-testid="building-coverage-slider"
        />
        {/* Container to display the slider and the display box for the slider value */}
        <ValueBox>{buildingCoverage}</ValueBox>
      </Box>
      {/* Display the label for building  Number of Floors */}
      <Typography
        variant="body1"
        component="p"
        sx={{
          mt: "10px",
          mb: "10px",
        }}
      >
        Number of Floors
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Slider
          value={numberOfFloors}
          onChange={handleNumFloorsChange}
          min={0}
          max={100}
          step={1}
          sx={{
            width: "75%",
            ml: "10px",
            mb: "10px",
          }}
          data-testid="number-of-floors-slider"
        />
        {/* Container to display the slider and the display box for the slider value */}
        <ValueBox>{numberOfFloors}</ValueBox>
      </Box>

      {/* Display the label for building  Height per Floor  */}
      <Typography
        variant="body1"
        component="p"
        sx={{
          mt: "10px",
        }}
      >
        Height per Floor (in meters)
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Slider
          value={floorHeight}
          onChange={handleHeightPerFloorChange}
          min={0}
          max={100}
          step={1}
          sx={{
            width: "75%",
            ml: "10px",
          }}
          data-testid="floor-height-slider"
        />
        {/* Container to display the slider and the display box for the slider value */}
        <ValueBox>{floorHeight}</ValueBox>
      </Box>
    </>
  );
};

export default BuildingProperties;
