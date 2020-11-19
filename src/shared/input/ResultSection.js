import React, { useState } from "react";
import { Field, useField } from "formik";

import Button from "../sandbox/Button";
import { close, lockBg } from "../sandbox/Popup";
import Droparea from "../sandbox/Droparea";
import Alert from "../sandbox/Alert";
import PDFPreview from "../../shared/sandbox/PDFPreview";
import {
    SectionGrid,
    SectionGridless,
} from "../../pages/projects/previewProject";

import styles from "../../modules/createProject.module.scss";
import popup from "../../modules/popup.module.scss";
import tab from "../../modules/tab.module.scss";
import buttonStyle from "../../modules/_button.module.scss";

function ResultSection(props) {
    const [meta] = useField(props.name);
    const { form, push, remove } = props;
    const { value } = meta;
    const [type, setType] = useState("Image");

    const isSelected = (v) =>
        `${tab.role} ${v === type ? tab.role_active : ""}`;

    function SectionPopup(index) {
        return (
            <div
                className={`${popup.form_container}`}
                style={{ width: window.innerWidth * 0.6 }}
            >
                <h3>Edit Result Section</h3>
                <label htmlFor="description" className={popup.subtitle}>
                    Describe your section in detail.
                </label>
                <Field
                    as="textarea"
                    name={`sections[${index}].description`}
                    className={`inp-field ${popup.descEdit}`}
                    placeholder="Write what this section is about ..."
                />
                {form.errors.sections &&
                form.errors.sections === "description" ? (
                    <div className={styles.error}>
                        Please enter a section description.
                    </div>
                ) : null}
                <br />
                <label htmlFor="sectionLink" className={popup.subtitle}>
                    Add a link to external sources.
                </label>
                <div className={styles.input_teamsize}>
                    <Field
                        as="input"
                        className={`inp-field ${styles.input_link_left}`}
                        name={`sections[${index}].sectionLink.url`}
                        placeholder="URL"
                    />
                    <Field
                        as="input"
                        className={`inp-field ${styles.input_link_left}`}
                        name={`sections[${index}].sectionLink.linkName`}
                        placeholder="link name (optional)"
                    />
                </div>
                {form.errors.sections && form.errors.sections === "url" ? (
                    <div className={styles.error}>
                        Please change invalid link.
                    </div>
                ) : null}
                <br />
                <label className={popup.subtitle}>
                    What are you uploading?
                </label>
                {/* resets files to no value */}
                <Field name={`sections[${index}].files`}>
                    {({ field: { value }, form: { setFieldValue } }) => (
                        <div className={tab.segmented_tab}>
                            <button
                                type="button"
                                className={isSelected("Image")}
                                onClick={() => {
                                    setType("Image");
                                    setFieldValue(
                                        `sections[${index}].files`,
                                        ""
                                    );
                                }}
                            >
                                Images
                            </button>
                            <button
                                type="button"
                                className={isSelected("PDF")}
                                onClick={() => {
                                    setType("PDF");
                                    setFieldValue(
                                        `sections[${index}].files`,
                                        ""
                                    );
                                }}
                            >
                                PDF File
                            </button>
                        </div>
                    )}
                </Field>
                <br />
                {type === "Image" ? (
                    <div>
                        <label htmlFor="files" className={popup.subtitle}>
                            Upload at most 10 images to showcase your work
                            (.png, .jpeg)
                        </label>
                        <Field
                            as={Droparea}
                            name={`sections[${index}].files`}
                        />
                    </div>
                ) : (
                    <div>
                        <Field name={`sections[${index}].files`}>
                            {({
                                field: { value },
                                form: { setFieldValue },
                            }) => (
                                <div className={styles.pdf_display}>
                                    <label
                                        className={`${buttonStyle.upload_pdf_btn} ${buttonStyle.button}`}
                                    >
                                        <input
                                            type="file"
                                            accept="pdf"
                                            onChange={(event) => {
                                                const file = [
                                                    event.target.files[0],
                                                ];
                                                Object.assign(file[0], {
                                                    preview:
                                                        file.type ===
                                                        "application/pdf"
                                                            ? URL.createObjectURL(
                                                                  file
                                                              )
                                                            : "",
                                                });
                                                setFieldValue(
                                                    `sections[${index}].files`,
                                                    file
                                                );
                                            }}
                                        />
                                        <i
                                            className="fas fa-file"
                                            style={{ marginRight: 5 }}
                                        />
                                        Upload a PDF
                                    </label>
                                    {value ? (
                                        <PDFPreview file={value[0]} />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            )}
                        </Field>
                    </div>
                )}
                <br />
                <div className={popup.btnsRow}>
                    <Button
                        text="Confirm"
                        id={index + "_confirm"}
                        colour="reddo"
                        iconR={<i className="fas fa-check"></i>}
                        onClick={(e) => {
                            close(e, "_confirm");
                        }}
                    />
                    {/* <Button
                                        id={section.sectionId + "_close"}
                                        text="Cancel"
                                        // iconR={<i className="fas fa-times"></i>}
                                        onClick={(e) => {
                                            // reset(index);
                                            close(e, "_close");
                                        }}
                                    /> */}
                </div>
            </div>
        );
    }
    return (
        <div className={styles.section_input}>
            {value.map((section, index) => {
                return (
                    <div className={styles.section_card} key={index}>
                        {section.files.length &&
                        section.files[0].type.match(/image/g) ? (
                            <SectionGrid section={section} />
                        ) : (
                            <SectionGridless section={section} />
                        )}
                        <div className={styles.section_footer}>
                            <Button
                                colour="reddo"
                                id={index + "delSection"}
                                iconL={<i className="fas fa-trash-alt"></i>}
                                text="Delete section"
                                onClick={lockBg}
                            />
                            <Button
                                id={index}
                                iconL={<i className="fas fa-edit"></i>}
                                text="Edit section"
                                onClick={lockBg}
                            />
                        </div>
                        <div
                            className={popup.popupContainer}
                            id={index + "delSection_popContent"}
                        >
                            <Alert
                                id={index + "delSection"}
                                type="result section"
                                hasConfirm
                                confirmBtnLabel="Yes, delete"
                                closeBtnLabel="No, go back"
                                onConfirm={() => remove(index)}
                            />
                        </div>
                        <div
                            className={`${popup.popupContainer}`}
                            id={index + "_popContent"}
                        >
                            {SectionPopup(index)}
                        </div>
                    </div>
                );
            })}
            <Button
                // id={"newSection"}
                colour="pink"
                type="button"
                onClick={() => push(newSection)}
                className={`${styles.save_draft} ${styles.center}`}
                iconR={<i className="fas fa-plus"></i>}
                text="Add result section"
            />
        </div>
    );
}

export default ResultSection;

const newSection = {
    sectionId: `section-${new Date().getTime()}`,
    description: "Add your description here...",
    files: [],
    sectionLink: {
        url: "",
        linkName: "",
    },
};
