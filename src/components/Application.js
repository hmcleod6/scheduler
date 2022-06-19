import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import { useState } from "react";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";



export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const convertedAppointments = dailyAppointments.map((appointment) => {
   const interview = getInterview(state, appointment.interview);

   return (
     <Appointment
     key={appointment.id}
     id={appointment.id}
     time={appointment.time}
     interview={interview}
     />
   )
  });

  const setDay = day => setState({ ...state, day });
 
  Promise.all([
    axios.get("/api/days"),
    axios.get("/api/appointments"),
    axios.get("/api/interviewers")
  ]).then(response => {
    setState(prev => ({
      ...prev,
      days: response[0].data,
      appointments: response[1].data,
      interviewers: response[2].data
    }))
  })

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />

    <nav 
      className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          setDay={setDay}
        />
    </nav>
    <img
      className="sidebar__lhl sidebar--centered"
      src="images/lhl.png"
      alt="Lighthouse Labs"
    />

      </section>
      <section className="schedule">
        {convertedAppointments}
          <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
