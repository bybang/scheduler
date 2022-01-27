// get appointments array for certain day
export function getAppointmentsForDay(state, day) {
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

// get nested interview object if interview exsist
export function getInterview(state, interview) {
  if (interview !== null) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer],
    };
  }
  return null;
}

// get available interviewers for that day
export function getInterviewersForDay(state, day) {
  // iterate through passed state
  const dayFound = state.days.find((x) => x.name === day);
  if (dayFound) {
    const todaysInterviewers = dayFound.interviewers.map(
      (interviewerID) => state.interviewers[interviewerID]
    );
    return todaysInterviewers;
  }
  return [];
}
