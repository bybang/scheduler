import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // save
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    });
  }

  function deleting() {
    transition(DELETE);
    props.cancelInterview(props.id).then(() => {
      transition(EMPTY);
    });
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={back} />
      )}
      {mode === SAVING && <Status message={"Please wait! ...SAVING"} />}
      {mode === DELETE && <Status message={"Please wait! ...DELETING"} />}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={() => {
            deleting(props.id);
          }}
          onCancel={back}
          message={"Are you sure you'd like to delete?"}
        />
      )}
      {mode === EDIT && (
        <Form
          value={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
    </article>
  );
}
