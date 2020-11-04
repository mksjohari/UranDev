import React from "react";

function Button(props) {
    return (
        <>
            <button
                type="button"
                className={props.colour + " " + props.className}
                style={{ display: `${props.iconB ? "grid" : "inline"}` }}
                id={props.id}
                onClick={props.onClick}
            >
                {props.iconL ? props.iconL : ""}
                <span>{props.text}</span>
                {props.iconR ? props.iconR : ""}
                {props.iconB ? props.iconB : ""}
            </button>
        </>
    );
}

export default Button;
