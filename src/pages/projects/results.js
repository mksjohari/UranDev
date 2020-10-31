import React, { useState } from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import { withContext } from "../../shared/react-dims";

import { lockBg } from "../../shared/sandbox/Popup";
import ResultSection from "../../shared/input/ResultSection";
import Button from "../../shared/sandbox/Button";

import popup from "../../modules/popup.module.scss";
import styles from "../../modules/createProject.module.scss";

function Results(props) {
    const [linksExpand, setLinksExpand] = useState(true);
    const [sectionExpand, setSectionExpand] = useState(true);
    const toggleLinksExpand = () =>
        setLinksExpand((previousState) => !previousState);
    const toggleSectionExpand = () =>
        setSectionExpand((previousState) => !previousState);
    return (
        <Formik
            initialValues={{
                conclusion: props.results.conclusion,
                links: props.results.links,
            }}
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
                <Form>
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
                    <br/>
                    <div>
                        <label
                            htmlFor="links"
                            className={` ${styles.section_header}`}
                        >
                            <div onClick={toggleLinksExpand}>
                                {linksExpand ? (
                                    <i className="fas fa-angle-up"></i>
                                ) : (
                                    <i className="fas fa-angle-down"></i>
                                )}
                            </div>
                            <div className={styles.header_style}>
                                Links to project (optional)
                            </div>
                        </label>
                        {linksExpand && (
                            <FieldArray
                                name="links"
                                render={(arrayHelpers) => (
                                    <div className={styles.section_input}>
                                        {props.values.links.map((link, index) => (
                                            <div
                                                key={index}
                                                className={
                                                    styles.section_input_row
                                                }
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

                                                <div
                                                    className={` ${styles.icon_trash}`}
                                                    type="button"
                                                    onClick={() =>
                                                        arrayHelpers.remove(
                                                            index
                                                        )
                                                    }
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                    <div
                                                        className={
                                                            styles.button_text
                                                        }
                                                    >
                                                        Remove
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <Button
                                            colour="pink"
                                            type="button"
                                            onClick={() =>
                                                arrayHelpers.push({
                                                    url: "",
                                                    linkName: "",
                                                })
                                            }
                                            className={`${styles.save_draft} ${styles.center}`}
                                            iconR={
                                                <i className="fas fa-plus"></i>
                                            }
                                            text="Add link to project"
                                        />
                                    </div>
                                )}
                            />
                        )}
                    </div>
                    <br/>
                    <div>
                        <label
                            htmlFor="sections"
                            className={` ${styles.section_header}`}
                        >
                            <div onClick={toggleSectionExpand}>
                                {sectionExpand ? (
                                    <i className="fas fa-angle-up"></i>
                                ) : (
                                    <i className="fas fa-angle-down"></i>
                                )}
                            </div>
                            <div className={styles.header_style}>
                                Sections (optional)
                            </div>
                        </label>
                        {sectionExpand && (
                            <div className={styles.section_input}>
                                <div className={`${styles.section_question}`}>
                                    Here's where you showcase your
                                    accomplishments! Share your final by videos,
                                    graphs, pictures, documents, or even the
                                    product itself (via a link).
                                </div>
                                <Button
                                    id={"newSection"}
                                    colour="pink"
                                    type="button"
                                    onClick={lockBg}
                                    className={`${styles.save_draft} ${styles.center}`}
                                    iconL={<i className="fas fa-plus"></i>}
                                    text="Add result section"
                                />
                                <div
                                    id={"newSection_popContent"}
                                    className={popup.popupContainer}
                                >
                                    <ResultSection
                                        id={"newSection"}
                                        newForm
                                        section={{
                                            sectionId: `section-${new Date().getTime()}`,
                                            description: "",
                                            files: [],
                                            sectionLink: {
                                                url: "",
                                                linkName: "",
                                            },
                                        }}
                                        onConfirm={props.addSection}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className={styles.save_draft}
                        iconR={<i className="fas fa-arrow-right" />}
                        text="Next"
                    />
                </Form>
            )}
        </Formik>
    );
}
export default withContext(Results);
