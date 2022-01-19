import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  console.log(props.interviewer);
  const listInterviewers = props.interviewers.map((interviewer) => {
    console.log(interviewer);
  } return listInterviewers;
    return (
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">
          <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            seleted={interviewer.id === props.interviewer}
          />
        </ul>
      </section>
    );
  );
}
