// Test away!

import React from "react";
import { render } from "@testing-library/react";

import Display from "../display/Display";

test("Display renders without crashing", () => {
  render(<Display />);
});

test("Displays gate open or closed and displays if it is locked", () => {
  const { getByText } = render(<Display />);
  const open = getByText(/open/i);
  const locked = getByText(/unlocked/i);

  expect(open).toBeDefined();
  expect(locked).toBeDefined();
});

test("displays Closed if the closed prop is true and open if otherwise", () => {
  var toggled = true;
  const toggler = () => {
    toggled = false;
  };
  const { getByText, findByText } = render(<Display closed={toggled} />);

  const closed = getByText(/closed/i);

  expect(closed).toBeDefined();

  toggler();

  const open = findByText(/open/i);

  expect(open).toBeDefined();
});

test("displays locked if the locked prop is true and Unlocked if otherwise", () => {
  var toggled = true;
  const toggler = () => {
    toggled = false;
  };
  const { getByText, findByText } = render(<Display closed={toggled} />);

  const locked = getByText(/locked/i);

  expect(locked).toBeDefined();

  toggler();

  const unlocked = findByText(/unlocked/i);

  expect(unlocked).toBeDefined();
});

test("when locked or closed use the red-led class", () => {
  const { container } = render(<Display locked={true} closed={true} />);

  const redLeds = container.querySelectorAll(".red-led");
  expect(redLeds.length).toBe(2);
});

test("when unlocked or open use the green-led class", () => {
  const { container } = render(<Display locked={false} closed={false} />);

  const greenLeds = container.querySelectorAll(".green-led");
  expect(greenLeds.length).toBe(2);
});
