import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders title", () => {
  render(<App />);
  const pageTitle = screen.getByText(/Welcome to my blog site!/i);
  expect(pageTitle).toBeInTheDocument();
});
