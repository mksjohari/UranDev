import React from "react";
import { Formik, Field } from "formik";
import { withContext } from "../../shared/react-dims";

import Links from "../../shared/input/Links";
import Button from "../../shared/sandbox/Button";
import styles from "../../modules/createProject.module.scss";

function Results(props) {
    return (
        <Formik
            initialValues={{
                conclusion: props.results.conclusion,
                links: props.results.links,
                sections: props.results.sections,
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
                    props.editResults(values);
                    props.nextStep();
                    actions.setSubmitting(false);
                }, 1000);
            }}
        >
            {(props) => (
                <form onSubmit={props.handleSubmit}>
                    <div className={styles.section_input}>
                        <label
                            htmlFor="conclusion"
                            className={styles.section_question}
                        >
                            What are the results of your project? What did your
                            project achieve? What did you learn?Please briefly
                            reflect and conclude your project.
                        </label>
                        <Field
                            as="textarea"
                            className={`inp-field ${styles.input_situation}`}
                            name="conclusion"
                            placeholder="Type here"
                        />
                    </div>
                    <div className={styles.section_input}>
                        <label
                            htmlFor="links"
                            className={styles.section_question}
                        >
                            1)
                        </label>
                        <Field as={Links} name="links" />
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
export default withContext(Results);
