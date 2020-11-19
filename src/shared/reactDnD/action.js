import React from "react";

import { lockBg } from "../sandbox/Popup";
import AddActionForm from "../../shared/input/AddActionForm";
import ActionForm from "../../shared/input/ActionForm";
import Alert from "../sandbox/Alert";
import Button from "../sandbox/Button";
import Carousel from "../sandbox/Carousel";

import styles from "../../modules/DnD.module.scss";
import projects from "../../modules/projects.module.scss";
import popup from "../../modules/popup.module.scss";

const ActionCard = (props) => {
    const actionId = props.action.actionId;

    return (
        <div className={styles.action_card}>
            <div className={styles.title}>{props.action.title}</div>

            <div className={styles.action_tags}>
                {props.action.tools.length ? (
                    <div className={styles.project_tags}>
                        <div
                            className={`${styles.action_subtitle} ${styles.tags_subtitle}`}
                        >
                            Tools:
                        </div>
                        {console.log(props.action.tools)}
                        {props.action.tools.map((tool, index) => (
                            <div
                                key={`${index}-${Math.random() * 100000000}`}
                                className={`${projects.tag_type} ${projects.Tool}`}
                            >
                                {`${tool}`}
                            </div>
                        ))}
                    </div>
                ) : (
                    ""
                )}
                {props.action.skills.length ? (
                    <div className={styles.project_tags}>
                        <div
                            className={`${styles.action_subtitle} ${styles.tags_subtitle}`}
                        >
                            Skills:
                        </div>
                        {props.action.skills.map((skill, index) => (
                            <span
                                key={`${index}-${Math.random() * 100000000}`}
                                className={`${projects.tag_type} ${projects.Skill}`}
                            >
                                {`${skill}`}
                            </span>
                        ))}
                    </div>
                ) : (
                    ""
                )}
                <div className={`${styles.description_action}`}>
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
            {props.readOnly ? (
                ""
            ) : (
                <div className={styles.task_footer}>
                    <Button
                        colour="reddo"
                        id={"delAction"}
                        iconL={<i className="fas fa-trash-alt"></i>}
                        text="Delete action"
                        onClick={lockBg}
                    />
                    <div
                        className={popup.popupContainer}
                        id={"delAction_popContent"}
                    >
                        <Alert
                            id={"delAction"}
                            type="action"
                            hasConfirm
                            confirmBtnLabel="Yes, delete"
                            closeBtnLabel="No, go back"
                            onConfirm={props.deleteAction}
                        />
                    </div>
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
                        <ActionForm
                            id={actionId}
                            action={props.action}
                            currentTask={props.currentTask}
                            index={props.index}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
export default ActionCard;
