import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, useField, withFormik } from "formik";

import Button from "../../shared/sandbox/Button";
import Dropdown from "../../shared/sandbox/Dropdown";
import Timeline from "../../shared/sandbox/Timeline";
import { withContext } from "../../shared/react-dims";
import styles from "../../modules/createProject.module.scss";

function Situation(props) {
    console.log(props);
    return (
        <Formik
            initialValues={{
                situation: props.form.situation,
                role: props.form.role,
                teamSize: props.form.teamSize,
                budget: props.form.budget,
                currency: props.form.currency,
            }}
            // onSubmit={async (values) => {
            //     await new Promise((r) => setTimeout(r, 500));
            //     alert(JSON.stringify(values, null, 2));
            //     props.setProject(values);
            //     props.nextStep();
            // }}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    props.setProject(values);
                    props.nextStep();
                    actions.setSubmitting(false);
                }, 1000);
            }}
        >
            {(props) => (
                <form onSubmit={props.handleSubmit}>
                    <div className={styles.section_input}>
                        <label
                            htmlFor="situation"
                            className={styles.section_question}
                        >
                            What is the problem space/goal of your project?
                            {` `}
                            What inspired you to start this project?
                            {` `}
                            Give a brief summary of your project's background.
                        </label>
                        <Field
                            as="textarea"
                            className={`inp-field ${styles.input_situation}`}
                            name="situation"
                            placeholder="Type here"
                        />
                    </div>
                    <div className={styles.section_input}>
                        <label
                            htmlFor="role"
                            className={styles.section_question}
                        >
                            What was your role in the project?{" "}
                        </label>
                        <Field
                            as="input"
                            className={`inp-field`}
                            name="role"
                            placeholder="Your role"
                        />
                    </div>
                    <div className={styles.section_input}>
                        <label
                            htmlFor="teamSize"
                            className={styles.section_question}
                        >
                            How many people were involved in your project?
                        </label>
                        <Field as={TeamSize} name="teamSize" />
                        {/* <Field name="TeamSize" type="select">
                            {({
                                field: { value },
                                form: { setFieldValue },
                            }) => (
                                <div>
                                    <TeamSelect
                                        value={value}
                                        handleClick={(v) =>
                                            setFieldValue("TeamSize", v)
                                        }
                                    />
                                </div>
                            )}
                        </Field> */}
                    </div>
                    <div className={styles.section_input}>
                        <label
                            htmlFor="budget"
                            className={styles.section_question}
                        >
                            Was there a budget set for your project?{` `}(leave
                            blank if there were none){" "}
                        </label>
                        <div className={styles.budget_input}>
                            <Field as={Currency} name="currency" />
                            <Field
                                as="input"
                                className={`inp-field`}
                                name="budget"
                                placeholder="No budget"
                            />
                            {/* <Field
                                as="select"
                                className={`inp-field`}
                                name="currency"
                            >
                                <option value="red">Red</option>
                                <option value="red">yellow</option>
                                <option value="red">blue</option>
                            </Field> */}
                        </div>
                    </div>
                    <Button
                        type="submit"
                        className={styles.save_draft}
                        iconR={<i className="fas fa-arrow-right" />}
                        text="Next"
                        onClick={props.submitForm}
                    />
                </form>
            )}
        </Formik>
    );
}
export default withContext(Situation);

const CurrencyOptions = [
    { value: "aud", label: "AUD" },
    { value: "cad", label: "CAD" },
    { value: "gbp", label: "GBP" },
    { value: "usd", label: "USD" },
];

function Currency(props) {
    const [field, meta, helpers] = useField(props.name);

    const { value } = meta;
    const { setValue } = helpers;

    return (
        <div className={styles.dropdown_currency}>
            <Dropdown
                colour="white"
                width="150px"
                text="Currency"
                value={value}
                onChange={(e) => setValue(e, false)}
                options={CurrencyOptions}
            />
        </div>
    );
}

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

// could use for endorse skill tag ?? https://hceris.com/custom-components-in-formik/
const TeamSelect = (props) => {
    const isSelected = (v) =>
        `${styles.teamsize_button} ${
            v === props.value ? styles.teamsize_selected : ""
        }`;

    return (
        <div className={styles.input_teamsize}>
            <button
                onClick={() => props.handleClick("1")}
                className={isSelected("1")}
            >
                1
            </button>
            <button
                onClick={() => props.handleClick("2-5")}
                className={isSelected("2-5")}
            >
                2-5
            </button>
            <button
                onClick={() => props.handleClick("6-10")}
                className={isSelected("6-10")}
            >
                6-10
            </button>
            <button
                onClick={() => props.handleClick("11-20")}
                className={isSelected("11-20")}
            >
                11-20
            </button>
            <button
                onClick={() => props.handleClick("21+")}
                className={isSelected("21+")}
            >
                21+
            </button>
        </div>
    );
};