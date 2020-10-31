import React from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import styles from "../../modules/createProject.module.scss";

function Links(props) {

    return (
        <div className={styles.input_teamsize}>
            <Formik
                initialValues={{
                    links: props.links,
                }}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
                    props.handleClick(values);
                }}
                render={({ values }) => (
                    <Form>
                        <FieldArray
                            name="links"
                            render={(arrayHelpers) => (
                                <div>
                                    {values.links.map((link, index) => (
                                        <div
                                            key={index}
                                            className={styles.section_input_row}
                                        >
                                            <label
                                                htmlFor="url"
                                                className={
                                                    styles.section_question
                                                }
                                            >
                                                {index + 1})
                                            </label>
                                            <Field
                                                as="input"
                                                className={`inp-field ${styles.input_link}`}
                                                name={`links[${index}].url`}
                                                placeholder="URL"
                                            />
                                            <Field
                                                as="input"
                                                className={`inp-field ${styles.input_link}`}
                                                name={`links.${index}.linkName`}
                                                placeholder="link name (optional)"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    arrayHelpers.remove(index)
                                                }
                                            >
                                                -
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="submit"
                                        onClick={() =>
                                            arrayHelpers.push({
                                                url: "",
                                                linkName: "",
                                            })
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                        />
                    </Form>
                )}
            />
        </div>
    );
}
export default Links;
