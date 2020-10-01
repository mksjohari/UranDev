import React from "react";
import ActionCard from "./ActionCard";
import styles from "./modules/tmp.module.scss";

class TaskCol extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div>{this.props.col.title}</div>
                <div>{this.props.tasks.map(tasks => <ActionCard key={tasks.id} task={tasks} />)} </div>
            </div>
        );
    }
}

export default TaskCol;
