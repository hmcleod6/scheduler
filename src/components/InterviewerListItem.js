import classNames from "classnames";
import React, { useState } from "react";
import "components/InterviewerListItem.scss";


export default function InterviewListItem(props) {

  // const [interviewer, setInterviewer] = useState('');

const interviewerClass = 
classNames ("interviewers__item", {
  "interviewers__item--selected": props.selected})

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}
  </li>
  )
}