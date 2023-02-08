import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useMapBoxContext } from "../../context/MapBoxContext";

/**
 * Statistics component that displays the statistics of the building in MapBox.
 * @returns {JSX.Element} Statistics component.
 */
const Statistics = () => {
  // Destructuring the context data
  const { landArea, buildingArea, floorArea, buildingVolume, buildingHeight } =
    useMapBoxContext();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        height: "100%",
        p: "10px",
      }}
    >
      {/* Title of the component */}
      <Typography
        variant="h5"
        component="h5"
        sx={{
          my: "10px",
        }}
      >
        Statistics
      </Typography>
      {/* Land area */}
      <Typography
        variant="body1"
        sx={{
          my: "10px",
        }}
      >
        Land Area(m2): {landArea?.toFixed(0)}
      </Typography>
      {/* Building area */}
      <Typography
        variant="body1"
        sx={{
          my: "10px",
        }}
      >
        Building Area(m2): {buildingArea?.toFixed(0)}
      </Typography>
      {/* Building Floor area */}
      <Typography
        variant="body1"
        sx={{
          my: "10px",
        }}
      >
        Building Floor Area(m2): {floorArea?.toFixed(0)}
      </Typography>
      {/* Building Volume */}
      <Typography
        variant="body1"
        sx={{
          my: "10px",
        }}
      >
        Volume(m3): {buildingVolume?.toFixed(0)}
      </Typography>
      {/* Building Height */}
      <Typography
        variant="body1"
        sx={{
          my: "10px",
        }}
      >
        Building Height(m): {buildingHeight}
      </Typography>
    </Box>
  );
};

export default Statistics;
