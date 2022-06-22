import React from "react";
import InterviewListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from "prop-types";


export default function InterviewList(props) {

  console.log('props:', props)

  const interviewer = props.interviewers.map(interviewer => {
    return (
      <InterviewListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={(event) => props.onChange(interviewer.id)}
    />)
  });
   
  return(
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{interviewer}</ul>
  </section>
  );
}

InterviewList.propTypes = {
  interviewers: PropTypes.array.isRequired
}

