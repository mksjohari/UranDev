import React from "react";
import styles from "../../modules/DnD.module.scss";
import projects from "../../modules/projects.module.scss";

const ActionCard = (props) => {
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
                    <div className={styles.action_files}>
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
                    <div className={styles.action_files}>
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
                <div>
                    <div className={styles.action_files}>
                        Files:
                        <div className={styles.col_right}>
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
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.task_footer}>
                
                {/* <Button
                    className={`${styles.delete_button}`}
                    iconL={<i className="far fa-trash-alt"></i>}
                    text="Delete action"
                /> */}
                <div></div>
                <a className={styles.edit_button} href="##">
                    <i className="fas fa-edit"></i>
                    Edit
                </a>
            </div>
            {/* <button type="button" onClick={() => deleteAction(props.index)}>
                delete
            </button> */}
        </div>
    );
};
export default ActionCard;