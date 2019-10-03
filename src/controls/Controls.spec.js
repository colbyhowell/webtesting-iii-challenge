// Test away!

import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Controls from "../controls/Controls";

test("Controls renders without crashing", () => {
  render(<Controls />);
});

test("Provides buttons to toggle states", () => {
  const { getByText } = render(<Controls />);

  const closedGate = getByText(/close gate/i);
  const lockGate = getByText(/lock gate/i);

  expect(closedGate).toBeDefined();
  expect(lockGate).toBeDefined();
});

test("open button text changes to reflect state the door will in when clicked", () => {
  const locked = false;
  const closed = false;
  const toggleClosed = jest.fn();
  const { getByText } = render(
    <Controls locked={locked} closed={closed} toggleClosed={toggleClosed} />
  );

  const closeBtn = getByText(/close gate/i);

  fireEvent.click(closeBtn);

  expect(closeBtn).toBeDefined();
  expect(toggleClosed).toHaveBeenCalled();
});

test("closed toggle button is disabled if the gate is locked", () => {
  const locked = true;
  const closed = true;
  const toggleClosed = jest.fn();

  const { getByText } = render(
    <Controls locked={locked} closed={closed} toggleClosed={toggleClosed} />
  );

  const openBtn = getByText(/open gate/i);

  fireEvent.click(openBtn);
  expect(toggleClosed).not.toHaveBeenCalled();
});

test("the locked toggle button is disabled if gate is open", () => {
  const locked = false;
  const closed = false;
  const toggleLocked = jest.fn();

  const { getByText } = render(
    <Controls locked={locked} closed={closed} toggleLocked={toggleLocked} />
  );

  const lockBtn = getByText(/lock gate/i);

  fireEvent.click(lockBtn);

  expect(toggleLocked).not.toHaveBeenCalled();
});
