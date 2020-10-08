import React from "react";

function DevButton(props) {
    return (
        <div style={{ position: "absolute", top: 28, right: 500 }}>
            <button type="button" onClick={props.onClick}>
                DEV BUTTON
            </button>
        </div>
    );
}

export default DevButton;
