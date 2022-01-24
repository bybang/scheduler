import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import axios from "axios";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // put (/user, {email, pass}) => passing email, password
    // 200 - 299? > successful request
    // 200 ok > can send msg to the user
    // check status code
    // API/days .get(/api/days)

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState({
          ...state,
          appointments,
        });
        console.log(response);
      });
  }

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        {...appointment}
        key={appointment.id}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    );
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList day={state.day} days={state.days} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule} <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
