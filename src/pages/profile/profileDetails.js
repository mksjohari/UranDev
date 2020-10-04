import React, {useState} from 'react';
import Button from '../../shared/sandbox/Button';
import styles from '../../modules/profile.module.scss';

const ProfileDetails = (props) => {
    const [shortlisted, setShortlisted] = useState(false);
    const toggleShortlisted = () => setShortlisted(previousState => !previousState);
    return (
        <div className={styles.profile_details}>
            <img
                className={styles.dp}
                src={require("../../images/Lost-amico.png")}
                alt="profile"
            />
            <div className={styles.detail}>
                <div className={styles.heading}>
                    <div className={styles.user_name}>Amirahha Doe</div>
                    <div className={styles.user_buttons}>
                        <Button
                            className={styles.endorse_skill}
                            iconR={<i className="far fa-envelope"></i>}
                            text="Message"
                        />
                        <Button
                            className={shortlisted ? styles.shortlisted_button : styles.shortlist_button}
                            iconR={<i className="far fa-bookmark"></i>}
                            text={ shortlisted ? "Shortlisted!" : "Shortlist"}
                            onClick={toggleShortlisted}
                        />
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.user_links}>
                        <i className="fas fa-map-marked-alt"></i>
                        <text className={styles.text_detail}>
                            Location: Melbourne, VIC, Australia
                        </text>
                    </div>
                    <div className={styles.user_links}>
                        <i className="fas fa-suitcase"></i>
                        <text className={styles.text_detail}>
                            Occupation: Mathematics Professor at University of
                            Not Prestige
                        </text>
                    </div>
                    <div className={styles.user_links}>
                        <i className="fas fa-pen-nib"></i>
                        <text className={styles.text_detail}>
                            Expertise: Engineering and Mathematics
                        </text>
                    </div>
                </div>
                <div className={`${styles.user_bio} ${styles.section}`}>
                    <text>
                        Short description or qutoes of something idc. It is a
                        long established fact that a reader will be distracted
                        by the readable content of a page when looking at its
                        layout.
                        <br />
                        The point of using Lorem Ipsum is that it has a
                        more-or-less normal distribution of letters, as opposed
                        to using 'Content here.
                    </text>
                </div>
                <div className={`${styles.user_socials} ${styles.section}`}>
                    <div className={styles.social_icon}><i className="fab fa-github fa-3x"></i></div>
                    <div className={styles.social_icon}><i className="fab fa-slack fa-3x"></i></div>
                    <div className={styles.social_icon}><i className="fab fa-stack-overflow fa-3x"></i></div>
                    <div className={styles.social_icon}><i className="fab fa-linkedin-in fa-3x"></i></div>
                    <div className={styles.social_icon}><i className="fab fa-dribbble fa-3x"></i></div>
                    <div className={styles.social_icon}><i className="fab fa-behance fa-3x"></i></div>
                    <div className={styles.social_icon}><i className="fab fa-figma fa-3x"></i></div>
                </div>
            </div>
        </div>
    );
};
export default ProfileDetails;
