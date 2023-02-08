import Button from "@mui/material/Button";
import React from "react";

// Props interface for the component
interface GeojsonUploadProps {
  onFileChoose: (file: GeoJSON.MultiPolygon) => void;
}

// The component definition
const GeojsonUpload = ({ onFileChoose }: GeojsonUploadProps) => {
  // Event handler for file input
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Get the first file selected
    const file = event.target.files?.[0];
    if (!file) {
      // Return if no file is selected
      return;
    }

    // Create a new FileReader instance
    const reader = new FileReader();
    // Event handler for the file load event
    reader.onload = (e) => {
      if (e.target) {
        // Get the file contents
        const contents = e.target.result;
        if (typeof contents === "string") {
          // Parse the file contents as JSON
          const data = JSON.parse(contents) as GeoJSON.MultiPolygon;
          // Call the onFileChoose prop with the parsed data
          onFileChoose(data);
        }
      }
    };
    // Read the file contents as text
    reader.readAsText(file);
  };

  // Render the component
  return (
    <Button
      variant="contained"
      component="label"
      sx={{
        mb: "20px",
      }}
    >
      LOAD GEOJSON
      <input
        // A hidden file input
        hidden
        data-testid="upload-file"
        type="file"
        // Only accept .geojson files
        accept=".geojson"
        // Call the handleFileUpload event handler on change
        onChange={handleFileUpload}
      />
    </Button>
  );
};

export default GeojsonUpload;
