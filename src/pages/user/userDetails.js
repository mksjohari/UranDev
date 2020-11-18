import React, { useState } from "react";
import { connect } from "react-redux";

import Button from "../../shared/sandbox/Button";
import styles from "../../modules/profile.module.scss";
const mapStateToProps = (state) => {
    return { users: state.user };
};

const ProfileDetails = (props) => {
    const [shortlisted, setShortlisted] = useState(false);
    const user = props.user;
    const displayName = `${user.firstName} ${user.lastName}`;
    const toggleShortlisted = () =>
        setShortlisted((previousState) => !previousState);
    return (
        <div className={styles.profile_details}>
            <img className={styles.dp} src={user.photoUrl} alt="profile" />
            <div className={styles.detail}>
                <div className={styles.heading}>
                    <div className={styles.user_name}>{displayName}</div>
                    <div className={styles.user_buttons}>
                        <Button
                            className={styles.endorse_skill}
                            iconR={<i className="far fa-envelope"></i>}
                            text="Message"
                        />
                        <Button
                            className={
                                shortlisted
                                    ? styles.shortlisted_button
                                    : styles.shortlist_button
                            }
                            iconR={<i className="far fa-bookmark"></i>}
                            text={shortlisted ? "Shortlisted!" : "Shortlist"}
                            onClick={toggleShortlisted}
                        />
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.user_links}>
                        <i className="fas fa-map-marked-alt"></i>
                        <span className={styles.text_detail}>
                            Location: {user.location}
                        </span>
                    </div>
                    <div className={styles.user_links}>
                        <i className="fas fa-suitcase"></i>
                        <span className={styles.text_detail}>
                            Occupation: {user.occupation}
                        </span>
                    </div>
                    <div className={styles.user_links}>
                        <i className="fas fa-pen-nib"></i>
                        <span className={styles.text_detail}>
                            Expertise:{" "}
                            {user.expertise.map((expertise, index) => {
                                return <span key={index}>{expertise}, </span>;
                            })}
                        </span>
                    </div>
                </div>
                <div className={`${styles.user_bio} ${styles.section}`}>
                    {user.description}
                    {!user.description && (
                        <span>
                            Short description or qutoes of something idc. It is
                            a long established fact that a reader will be
                            distracted by the readable content of a page when
                            looking at its layout.
                            <br />
                            The point of using Lorem Ipsum is that it has a
                            more-or-less normal distribution of letters, as
                            opposed to using 'Content here.
                        </span>
                    )}
                </div>
                <div className={`${styles.user_socials} ${styles.section}`}>
                    {/* <a href={`${user.socials[4].url}`}>
                    <div className={styles.social_icon}>
                        <i className="fab fa-github fa-3x"></i>
                    </div>
                    </a>
                   <a href={`${user.socials[6].url}`}>
                    <div className={styles.social_icon}>
                        <i className="fab fa-slack fa-3x"></i>
                    </div>
                    </a>
                   <a href={`${user.socials[5].url}`}>
                    <div className={styles.social_icon}>
                        <i className="fab fa-linkedin-in fa-3x"></i>
                    </div>
                    </a>
                   <a href={`${user.socials[2].url}`}>
                    <div className={styles.social_icon}>
                        <i className="fab fa-dribbble fa-3x"></i>
                    </div>
                    </a>
                   <a href={`${user.socials[0].url}`}>
                    <div className={styles.social_icon}>
                        <i className="fab fa-behance fa-3x"></i>
                    </div>
                    </a>
                   <a href={`${user.socials[3].url}`}>
                    <div className={styles.social_icon}>
                        <i className="fab fa-figma fa-3x"></i>
                    </div>
                    </a> */}
                </div>
            </div>
        </div>
    );
};
export default connect(mapStateToProps)(ProfileDetails);
