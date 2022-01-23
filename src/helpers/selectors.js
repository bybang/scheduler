export default function getAppointmentsForDay(state, day) {
  let todaysAppointments = [];
  // iterate through passed state
  state.days.forEach((x) => {
    if (x.name === day) {
      const today = x;
      // if today.appo's id === appoID push the appoObj to the todaysAppoinment
      today.appointments.forEach((appoID) => {
        todaysAppointments.push(state.appointments[appoID]);
      });
    }
  });
  return todaysAppointments;
}
