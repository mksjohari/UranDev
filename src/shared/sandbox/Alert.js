import React from "react";
import { close } from "../sandbox/Popup";
import Button from "../sandbox/Button";
import styles from "../../modules/alert.module.scss";

function Alert(props) {
    return (
        <div>
            <div className={styles.title}>
                <i
                    className={styles.alert + " fas fa-exclamation-triangle"}
                ></i>
                <h3>Are you sure you want to delete this {props.type}?</h3>
            </div>
            <p className={styles.msg}>This action can not be undone.</p>
        </div>
    );
}

export default Alert;
