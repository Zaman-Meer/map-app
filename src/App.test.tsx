import { render } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("renders all components", () => {
    const { container } = render(<App />);

    expect(container).toBeInTheDocument();
  });
});
