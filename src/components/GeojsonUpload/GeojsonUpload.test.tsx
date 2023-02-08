/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import GeojsonUpload from "./GeojsonUpload";

describe("GeojsonUpload component", () => {
  it("should call the onFileChoose function when a file is uploaded", async () => {
    const onFileChoose = jest.fn();
    const { getByText } = render(<GeojsonUpload onFileChoose={onFileChoose} />);
    const file = new File(
      ['{"type":"MultiPolygon","coordinates":[[[[0,0],[1,1],[0,1],[0,0]]]]}'],
      "test.geojson",
      { type: "application/geo+json" }
    );

    const selectInput = screen.getByTestId("upload-file");

    fireEvent.change(selectInput, { target: { files: [file] } });
  });

  it("should not call the onFileChoose function when an invalid file is uploaded", async () => {
    const onFileChoose = jest.fn();
    const { getByText } = render(<GeojsonUpload onFileChoose={onFileChoose} />);
    const file = new File(["invalid"], "test.geojson", {
      type: "application/geo+json",
    });
    const input = screen.getByTestId("upload-file");
    fireEvent.change(input, { target: { files: [file] } });

    expect(onFileChoose).not.toHaveBeenCalled();
  });
});
