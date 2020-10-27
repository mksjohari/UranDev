import React from "react";
import { Formik, Field, useField } from "formik";
import styles from "../../modules/createProject.module.scss";

function Links(props) {
    const [field, meta, helpers] = useField(props.name);

    const { value } = meta;
    const { setValue } = helpers;

    return (
        <div className={styles.input_teamsize}>
            <Formik
                initialValues={{
                    url: value.url,
                    linkName: value.linkName,
                }}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
                    setValue(values, false);
                }}
            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <div className={styles.section_input}>
                            <Field
                                as="input"
                                className={`inp-field`}
                                name="url"
                                placeholder="URL"
                            />
                            <Field
                                as="linkName"
                                className={`inp-field`}
                                name="url"
                                placeholder="linke name (optional)"
                            />
                        </div>
                        <button type="submit" disabled={props.isSubmitting}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
}
export default Links;
