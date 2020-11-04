import React from "react";

import Popup, { lockBg } from "../sandbox/Popup";
import AddActionForm from "../../shared/input/AddActionForm";
import Alert from "../sandbox/Alert";
import Button from "../sandbox/Button";
import Carousel from "../sandbox/Carousel";

import styles from "../../modules/DnD.module.scss";
import projects from "../../modules/projects.module.scss";
import popup from "../../modules/popup.module.scss";

const ActionCard = (props) => {
    const actionId = props.action.actionId;
    const deleteAction = () => props.deleteAction(props.index);
    // console.log(props.action.files)
    return (
        <div className={styles.action_card}>
            <div className={styles.title}>{props.action.title}</div>

            <div className={styles.action_tags}>
                {props.action.skills.length ? (
                    <div className={styles.project_tags}>
                        <div
                            className={`${styles.action_subtitle} ${styles.tags_subtitle}`}
                        >
                            Skills:
                        </div>
                        {props.action.skills.map((skill, index) => (
                            <span
                                key={skill}
                                className={`${projects.tag_type} ${projects.Skill}`}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                ) : (
                    ""
                )}
                {props.action.tools.length ? (
                    <div className={styles.project_tags}>
                        <div
                            className={`${styles.action_subtitle} ${styles.tags_subtitle}`}
                        >
                            Tools:
                        </div>
                        {props.action.tools.map((tool, index) => (
                            <span
                                key={tool}
                                className={`${projects.tag_type} ${projects.Tool}`}
                            >
                                {tool}
                            </span>
                        ))}
                    </div>
                ) : (
                    ""
                )}
                <div
                    className={`${styles.description_action}`}
                >
                    {props.action.description}
                </div>
                <div>
                    {props.action.files.length ? (
                        <div className={styles.action_subtitle}>
                            Files:
                            <div className={styles.carousel_display}>
                                <Carousel files={props.action.files} />
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
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
