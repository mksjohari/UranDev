import React from "react";
import { Link } from "react-router-dom";
import styles from "../../modules/projects.module.scss";

function CardSmall(props) {
    return (
        <Link to="/">
            <div className={styles.card_small}>
                <div className={styles.row_section}>
                    <div className={styles.row_top}>
                        <img
                            className={styles.cover_photo}
                            src={require("../../images/jobsearch.png")}
                            alt="project"
                        />
                    </div>
                    <div className={styles.row_bottom}>
                        <div className={styles.card_title}>
                            Reacto development with friends
                        </div>
                        <div className={styles.card_detail}>
                            <div className={styles.card_text}>
                                <i className="far fa-calendar"></i>
                                <span className={styles.card_text}>
                                    01/01/2011 - 20/03/2020
                                </span>
                            </div>
                            <div className={styles.card_text}>
                                <i className="fas fa-suitcase"></i>
                                <span className={styles.card_text}>
                                    Full-stack developer
                                </span>
                            </div>
                        </div>
                        <div className={styles.card_tags}>
                            <span
                                className={`${styles.tag_type} ${
                                    props.view === "profile"
                                        ? styles.Skill
                                        : styles.Edit
                                }`}
                            >
                                Web development
                            </span>
                            <span
                                className={`${styles.tag_type} ${
                                    props.view === "profile"
                                        ? styles.Tool
                                        : styles.Edit
                                }`}
                            >
                                SQL
                            </span>
                            <span
                                className={`${styles.tag_type} ${
                                    props.view === "profile"
                                        ? styles.Tool
                                        : styles.Edit
                                }`}
                            >
                                React
                            </span>
                            <span
                                className={`${styles.tag_type} ${
                                    props.view === "profile"
                                        ? styles.Tool
                                        : styles.Edit
                                }`}
                            >
                                React
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
export default CardSmall;
