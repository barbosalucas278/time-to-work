import { render, screen } from "@testing-library/react";
import Timer from "./Timer";

test("render a Timer component", () => {
  render(<Timer />);
  const title = screen.getByText(/Temporizador/i);
  expect(title).toBeInTheDocument();
});
