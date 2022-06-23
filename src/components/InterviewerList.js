import React from "react";
import InterviewListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from "prop-types";

export default function InterviewList(props) {
  const interviewerObj = props.interviewers.map((interviewer) => {
    return (
      <InterviewListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerObj}</ul>
    </section>
  );
}

InterviewList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
