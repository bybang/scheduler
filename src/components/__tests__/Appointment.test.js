import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Appointment from "components/Appointment";

afterEach(cleanup);

describe("Appointment", () => {
  let fakeState;
  beforeEach(() => {
    fakeState = {
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {},
    };
  });

  it("renders without crashing", () => {
    render(<Appointment state={fakeState} />);
  });
});
