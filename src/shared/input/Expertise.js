import React from "react";
import { Field } from "formik";

import styles from "../../modules/signUp.module.scss";
import settings from "../../modules/settings.module.scss";

function Expertise(props) {
    return (
        <div id="checkbox-group">
            <div role="group">
                <div className={styles.row}>
                    <div className={styles.column}>
                        <label className={settings.center_row}>
                            <Field
                                type="checkbox"
                                name="expertise"
                                value="Business & Management"
                            />
                            <div className={settings.left_padding}>
                                Business & Management
                            </div>
                        </label>
                        <label className={settings.center_row}>
                            <Field
                                type="checkbox"
                                name="expertise"
                                value="Creative Arts"
                            />
                            <div className={settings.left_padding}>
                                Creative Arts
                            </div>
                        </label>
                        <label className={settings.center_row}>
                            <Field
                                type="checkbox"
                                name="expertise"
                                value="Engineering & Mathematics"
                            />
                            <div className={settings.left_padding}>
                                Engineering & Mathematics
                            </div>
                        </label>
                        <label className={settings.center_row}>
                            <Field
                                type="checkbox"
                                name="expertise"
                                value="Humanities, Arts & Social Sciences"
                            />
                            <div className={settings.left_padding}>
                                Humanities, Arts & Social Sciences
                            </div>
                        </label>
                        <label className={settings.center_row}>
                            <Field
                                type="checkbox"
                                name="expertise"
                                value="IT & Computer Science"
                            />
                            <div className={settings.left_padding}>
                                IT & Computer Science
                            </div>
                        </label>
                    </div>
                    <div className={styles.column}>
                        <label className={settings.center_row}>
                            <Field
                                type="checkbox"
                                name="expertise"
                                value="Law, Legal Studies & Justice"
                            />
                            <div className={settings.left_padding}>
                                Law, Legal Studies & Justice
                            </div>
                        </label>
                        <label className={settings.center_row}>
                            <Field
                                type="checkbox"
                                name="expertise"
                                value="Medical & Health Sciences"
                            />
                            <div className={settings.left_padding}>
                                Medical & Health Sciences
                            </div>
                        </label>
                        <label className={settings.center_row}>
                            <Field
                                type="checkbox"
                                name="expertise"
                                value="Property & Built Environment"
                            />
                            <div className={settings.left_padding}>
                                Property & Built Environment
                            </div>
                        </label>
                        <label className={settings.center_row}>
                            <Field
                                type="checkbox"
                                name="expertise"
                                value="Sciences"
                            />
                            <div className={settings.left_padding}>
                                Sciences
                            </div>
                        </label>
                        <label className={settings.center_row}>
                            <Field
                                type="checkbox"
                                name="expertise"
                                value="Teaching & Education"
                            />
                            <div className={settings.left_padding}>
                                Teaching & Education
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Expertise;
