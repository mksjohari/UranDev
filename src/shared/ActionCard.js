import React from "react";
import styles from "./modules/tmp.module.scss";

class ActionCard extends React.Component {
    render() {
        return (
            this.props.task.content
        );
    }
}

export default ActionCard;
