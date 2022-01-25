import axios from "axios";
import { useState, useEffect } from "react";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = [...updateSpots(state.day, state.days, appointments)];

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState({
          ...state,
          appointments,
          days,
        });
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = [...updateSpots(state.day, state.days, appointments)];

    return axios.delete(`/api/appointments/${id}`).then((response) => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  function getSpots(dayObj, appointments) {
    let availableSpots = 0;
    for (const id of dayObj.appointments) {
      appointment = appointments[id];
      if (!appointment.interview) {
        availableSpots++;
      }
    }
    return availableSpots;
  }

  function updateSpots(today, days, appointments) {
    const thisDay = days.find((day) => days.name === today);
    const spots = getSpots(thisday, appointments);

    const updateThisDay = { ...thisDay, spots };

    const newDays = days.map((day) =>
      day.name === today ? updateThisDay : day
    );
    return newDays;
    // day.appointment = [1,2,3,4,5]
    // map through the appointment array?
    // if (interview === null) {
    // it is not availableSpot
    // } else {availableSpots.push(rest of the component)}
    // return availableSpots?
  }

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

  return { state, setDay, bookInterview, cancelInterview };
}
