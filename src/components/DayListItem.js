import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {

  let formatSpots = function(props) {

    let spotsLeft = props.spots;

    if (spotsLeft === 1) {
     return '1 spot remaining'
    }
    if (spotsLeft === 0) {
      return 'no spots remaining'
    }
    else {
      return `${spotsLeft} spots remaining`
    }
  }

const dayClass = classNames("day-list__item", 
{ "day-list__item--selected": props.selected},
{"day-list__item--full": props.spots === 0})

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}
