// Test away

import React from "react";
import { render } from "@testing-library/react";

import Dashboard from "../dashboard/Dashboard";

test("Dashboard renders without crashing", () => {
  render(<Dashboard />);
});

test("shows controls and displays", () => {
  const { getByText } = render(<Dashboard />);
  const display = getByText(/open/i);
  const controls = getByText(/close gate/i);

  expect(display).toBeDefined();
  expect(controls).toBeDefined();
});
