import React from "react";
import { NavLink } from "react-router-dom";
import { Formik, Field } from "formik";

import Popup, { lockBg } from "../sandbox/Popup";
import AddActionForm from "../../shared/input/AddActionForm";
import Alert from "../sandbox/Alert";
import Button from "../sandbox/Button";
import Thumbs from "../sandbox/Thumbs";

import styles from "../../modules/DnD.module.scss";
import projects from "../../modules/projects.module.scss";
import popup from "../../modules/popup.module.scss";

const ActionCard = (props) => {
    const actionId = props.action.actionId;
    const deleteAction = () => props.deleteAction(props.index);
    // console.log(props.action.files)
    return (
        <div className={styles.action_card}>
            <div className={styles.title}>
                Action {props.index + 1}: {props.action.title}
            </div>
            <div className={styles.description_action}>
                {props.action.description}
            </div>
            <div className={styles.action_tags}>
                {props.action.skills.length ? (
                    <div className={styles.action_subtitle}>
                        Skills:
                        <div className={styles.col_right}>
                            <div className={styles.project_tags}>
                                {props.action.skills.map((skill, index) => (
                                    <span
                                        className={`${projects.tag_type} ${projects.Skill}`}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
                {props.action.tools.length ? (
                    <div className={styles.action_subtitle}>
                        Tools:
                        <div className={styles.col_right}>
                            <div className={styles.project_tags}>
                                {props.action.tools.map((tool, index) => (
                                    <span
                                        className={`${projects.tag_type} ${projects.Tool}`}
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
                
                    <div className={styles.action_subtitle}>
                        Files:
                        <Thumbs files={props.action.files}/>
                        {/* <div className={styles.col_right}>
                            <div className={styles.project_tags}>
                                <a className={styles.file_link} href="##">
                                    somepicture.jpg
                                </a>
                                <a className={styles.file_link} href="##">
                                    anotherfile.pdf
                                </a>
                                <a className={styles.file_link} href="##">
                                    anotherfile.pdf
                                </a>
                                <a className={styles.file_link} href="##">
                                    anotherfile.pdf
                                </a>
                                <a className={styles.file_link} href="##">
                                    anotherfile.pdf
                                </a>
                            </div>
                        </div> */}
                    </div>
               
            </div>
            <div className={styles.task_footer}>
                <Popup
                    BtnText="Delete Action"
                    BtnColour="reddo"
                    BtnId="delAction"
                    BtnIconR={<i className="fas fa-trash-alt"></i>}
                    contentBGColour={"white"}
                    closeBtnLabel="No, go back"
                    hasConfirm
                    confirmBtnLabel="Yes, delete"
                    onConfirm={deleteAction}
                    width={500}
                    content={<Alert id="delAction" type="action" />}
                />
                <Button
                    id={actionId}
                    iconL={<i className="fas fa-edit"></i>}
                    text="Edit action"
                    onClick={lockBg}
                />
                <div
                    className={popup.popupContainer}
                    id={actionId + "_popContent"}
                >
                    <AddActionForm
                        id={actionId}
                        index={props.index}
                        action={props.action}
                        editAction={props.editAction}
                    />
                </div>
            </div>
        </div>
    );
};
export default ActionCard;
