import React from "react";
import { Formik, Field } from "formik";

import Button from "../../shared/sandbox/Button";
import TeamSize from "../../shared/input/teamSize";
import Currency from "../../shared/input/Currency";
import DateSelect from "../../shared/input/DateSelect";

import { withContext } from "../../shared/react-dims";
import styles from "../../modules/createProject.module.scss";

function Situation(props) {
    // console.log(props);
    return (
        <Formik
            initialValues={{
                summary: props.situation.summary, //
                role: props.situation.role, //
                teamSize: props.situation.teamSize,
                budget: props.situation.budget,
                currency: props.situation.currency,
                projectDates: props.situation.projectDates, //
            }}
            validate={validateSituation}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                    props.editSituation(values);
                    props.nextStep();
                    actions.setSubmitting(false);
                }, 1000);
            }}
        >
            {(props) => (
                <form onSubmit={props.handleSubmit}>
                    <div className={styles.child_form}>
                        <div className={styles.section_input}>
                            <label
                                htmlFor="summary"
                                className={styles.section_question}
                            >
                                What is the problem space/goal of your project?
                                {` `}
                                What inspired you to start this project?
                                {` `}
                                Give a brief summary of your project's
                                background.
                            </label>
                            <Field
                                as="textarea"
                                className={`inp-field ${styles.input_situation}`}
                                name="summary"
                                placeholder="Type here"
                            />
                            {props.errors.summary && props.touched.summary ? (
                                <div className={styles.error}>
                                    {props.errors.summary}
                                </div>
                            ) : null}
                        </div>
                        <div className={styles.section_input}>
                            <label
                                htmlFor="{props.errors.summary && props.touched.summary ? (
									<div className={styles.error}>{props.errors.summary}</div>
								) : null}"
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
                            {props.errors.role && props.touched.role ? (
                                <div className={styles.error}>
                                    {props.errors.role}
                                </div>
                            ) : null}
                        </div>
                        <div className={styles.section_input}>
                            <label
                                htmlFor="teamSize"
                                className={styles.section_question}
                            >
                                How many people were involved in your project?
                            </label>
                            <Field as={TeamSize} name="teamSize" />
                        </div>
                        <div className={styles.section_input}>
                            <label
                                htmlFor="budget"
                                className={styles.section_question}
                            >
                                Was there a budget set for your project?{` `}
                                (leave blank if there were none){" "}
                            </label>
                            <div className={styles.budget_input}>
                                <Field
                                    as={Currency}
                                    initialValues="AUD"
                                    name="currency"
                                />
                                <Field
                                    as="input"
                                    className={`inp-field`}
                                    name="budget"
                                    placeholder="No budget"
                                />
                            </div>
                        </div>
                        <div className={styles.section_input}>
                            <label
                                htmlFor="projectDates"
                                className={styles.section_question}
                            >
                                When was the period of your project?
                            </label>
                            <div className={styles.budget_input}>
                                <Field name="projectDates">
                                    {({
                                        field: { value },
                                        form: { setFieldValue },
                                    }) => (
                                        <DateSelect
                                            value={value}
                                            handleClick={(v) =>
                                                setFieldValue("projectDates", v)
                                            }
                                        />
                                    )}
                                </Field>
                            </div>
                            {props.errors.projectDates &&
                            props.touched.projectDates ? (
                                <div className={styles.error}>
                                    {props.errors.projectDates}
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className={styles.button_footer}>
                        <Button
                            type="submit"
                            className={styles.save_draft}
                            iconR={<i className="fas fa-arrow-right" />}
                            text="Next"
                            onClick={props.submitForm}
                        />
                    </div>
                </form>
            )}
        </Formik>
    );
}
export default withContext(Situation);

const validateSituation = (values, props /* only available when using withFormik */) => {
    const errors = {};

    if (!values.summary) {
        errors.summary = "Please enter summary.";
    }
    if (!values.role) {
        errors.role = "Please enter role.";
    }
    if (
        (values.projectDates.startDate === null) |
        (values.projectDates.endDate === null)
    ) {
        errors.projectDates = "Please enter project dates.";
        console.log("error project dates");
    }

    return errors;
};
