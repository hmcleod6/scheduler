import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm"
import useVisualMode from "hooks/useVisualMode"

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM"
  const DELETING = "DELETING"
  const EDIT = "EDIT"
  const ERROR_DELETE = "ERROR_DELETE"
  const ERROR_SAVE = "ERROR_SAVE"
  console.log('props=:', props)

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
        student: name,
        interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true))
  }

  // function deleteInterview (id) {
  //   if (mode === CONFIRM) {
  //     transition(DELETING);
  //     props.cancelInterview(props.id);
  //     transition(EMPTY);

  //   } else {
  //     transition(CONFIRM); 
  //   }
  function destroy (event) {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true))
  }
   
  

  return (
    <article className="appointment">
    <Header time={props.time} />

    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)} />}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save} />}
        {mode === SAVING && <Status message={"Saving"} />}
        {mode === DELETING && <Status message={"Deleting"} />}
        {mode === CONFIRM && <Confirm 
        onCancel={back} 
        onConfirm={destroy} 
        message="Are you sure you would like to delete?" 
        />}
        {mode === EDIT && <Form 
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save} />} 

        {mode === ERROR_SAVE && <Error 
        message={"Error! Could not save your appointment"}
        onClose={back} />}
        {mode === ERROR_DELETE && <Error 
        message={"Error! Could not delete your appointment"}
        onClose={back}/>}
    </article>
   );
 }
