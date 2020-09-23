import React from "react";

function Button(props) {
  return (
    <>
      <button
        type="button"
        className={props.colour}
        id={props.id}
        onClick={props.onClick}
      >
        {props.iconL ? props.iconL : ""}
        <span>{props.text}</span>
        {props.iconR ? props.iconR : ""}
      </button>
    </>
  );
}

export default Button;
