import "mapbox-gl/dist/mapbox-gl.css";
import Grid from "@mui/material/Grid";
import GeojsonUpload from "./components/GeojsonUpload";
import Box from "@mui/material/Box";
import BuildingProperties from "./components/BuildingProperties";
import MapBox from "./components/MapBox";
import { useMapBoxContext } from "./context/MapBoxContext";
import Statistics from "./components/Statistics";
import "./App.css";

/**
 * Main component that renders the geojson upload form, building properties form,
 * map, and statistics section in a grid layout using material-ui's Grid component.
 */
function App() {
  /**
   * Hook to access the state and functions from MapBoxContext.
   */
  const { setPlotData } = useMapBoxContext();

  /**
   * Callback function that gets called when a file is selected in GeojsonUpload component.
   * It takes the file data, which is in the format of GeoJSON.MultiPolygon, and sets it as the plot data in MapBoxContext.
   *
   * @param fileData - Data of the selected file in GeoJSON.MultiPolygon format
   */
  const handleFileChoose = (fileData: GeoJSON.MultiPolygon) => {
    setPlotData(fileData);
  };

  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Grid
        container
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        {/* Left side of the grid that contains the geojson upload form and building properties form */}
        <Grid item xs={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#ffffff",
              height: "100%",
              p: "20px",
            }}
          >
            {/* Geojson upload form */}
            <GeojsonUpload onFileChoose={handleFileChoose} />
            {/* Building properties form */}
            <BuildingProperties />
          </Box>
        </Grid>
        {/* Middle of the grid that contains the map */}
        <Grid
          item
          xs={7}
          sx={{
            height: "100vh",
          }}
          data-testid="map-area"
        >
          <MapBox />
        </Grid>
        {/* Right side of the grid that contains the statistics section */}
        <Grid item xs={2}>
          <Statistics />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
