import React from "react";
import { useHistory } from "react-router-dom";

const RedirectProject = (props) => {
    const history = useHistory();
    history.push(`/users/${props.uid}`);
    return <div>Redirect</div>;
};

export default RedirectProject;
