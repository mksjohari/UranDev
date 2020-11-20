import React, { useState } from "react";
import { Field, useField } from "formik";

import Droparea from "../sandbox/Droparea";
import PDFPreview from "../../shared/sandbox/PDFPreview";

import styles from "../../modules/createProject.module.scss";
import popup from "../../modules/popup.module.scss";
import tab from "../../modules/tab.module.scss";
import buttonStyle from "../../modules/_button.module.scss";

const SectionFiles = (props) => {
    const [, meta, helpers] = useField(props.name);
    const { value } = meta;
    const { setValue } = helpers;

    const [type, setType] = useState("Image");

    const isSelected = (v) =>
        `${tab.role} ${v === type ? tab.role_active : ""}`;

    return (
        <>
            <div className={tab.segmented_tab}>
                <button
                    type="button"
                    className={isSelected("Image")}
                    onClick={() => {
                        setType("Image");
                        setValue("", false);
                    }}
                >
                    Images
                </button>
                <button
                    type="button"
                    className={isSelected("PDF")}
                    onClick={() => {
                        setType("PDF");
                        setValue("", false);
                    }}
                >
                    PDF File
                </button>
            </div>

            <br />
            {type === "Image" ? (
                <div>
                    <label htmlFor="files" className={popup.subtitle}>
                        Upload at most 10 images to showcase your work (.png,
                        .jpeg)
                    </label>
                    <Field as={Droparea} name={props.name} />
                </div>
            ) : (
                <div>
                    <div className={styles.pdf_display}>
                        <label
                            className={`${buttonStyle.upload_pdf_btn} ${buttonStyle.button}`}
                        >
                            <input
                                type="file"
                                accept="pdf"
                                onChange={(event) => {
                                    const file = [event.target.files[0]];
                                    Object.assign(file[0], {
                                        preview:
                                            file.type === "application/pdf"
                                                ? URL.createObjectURL(file)
                                                : "",
                                    });
                                    setValue(file, true);
                                }}
                            />
                            <i
                                className="fas fa-file"
                                style={{ marginRight: 5 }}
                            />
                            Upload a PDF
                        </label>
                        {value ? <PDFPreview file={value[0]} /> : ""}
                    </div>
                </div>
            )}
        </>
    );
};
export default SectionFiles;
