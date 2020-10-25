import React from "react";
import { useField } from "formik";
import styles from "../../modules/createProject.module.scss";

function TeamSize(props) {
    // This isn't an input, so instead of using the values in 'field' directly,
    // we'll use 'meta' and 'helpers'.
    const [field, meta, helpers] = useField(props.name);

    const { value } = meta;
    const { setValue } = helpers;

    const isSelected = (v) =>
        `${styles.teamsize_button} ${
            v === value ? styles.teamsize_selected : ""
        }`;

    return (
        <div className={styles.input_teamsize}>
            <button
                type="button"
                onClick={() => setValue("1", false)}
                className={isSelected("1")}
            >
                1
            </button>
            <button
                type="button"
                onClick={() => setValue("2-5", false)}
                className={isSelected("2-5")}
            >
                2-5
            </button>
            <button
                type="button"
                onClick={() => setValue("6-10", false)}
                className={isSelected("6-10")}
            >
                6-10
            </button>
            <button
                type="button"
                onClick={() => setValue("11-20", false)}
                className={isSelected("11-20")}
            >
                11-20
            </button>
            <button
                type="button"
                onClick={() => setValue("21+", false)}
                className={isSelected("21+")}
            >
                21+
            </button>
        </div>
    );
}
export default TeamSize;