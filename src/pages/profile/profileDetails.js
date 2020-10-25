import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import { useHistory } from "react-router-dom";

import Button from '../../shared/sandbox/Button';
import styles from '../../modules/profile.module.scss';
import DevButton from '../../shared/sandbox/devButton'
const mapStateToProps = (state) => {
    return {user: state.user}
}


const ProfileDetails = (props) => {
    const [shortlisted, setShortlisted] = useState(false);
    const [expertise, setExpertise] = useState("")
    const user = props.user
    const history = useHistory()
    useEffect(() => {
        if (!user.logged){
            console.log('MOVE ME')
            console.log(props)
            history.push('/')
        }
        else{
            setExpertise(user.expertise[0].expertise)
        }
    }, [])
    const displayName = `${user.firstName} ${user.lastName}`
    const toggleShortlisted = () => setShortlisted(previousState => !previousState);
    return (
        <div className={styles.profile_details}>
            <DevButton onClick={()=>{console.log(user)}} />
            <img
                className={styles.dp}
                src={user.photoUrl}
                alt="profile"
            />
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
                            Location: {user.location}
                        </text>
                    </div>
                    <div className={styles.user_links}>
                        <i className="fas fa-suitcase"></i>
                        <text className={styles.text_detail}>
                            Occupation: {user.occupation}
                        </text>
                    </div>
                    <div className={styles.user_links}>
                        <i className="fas fa-pen-nib"></i>
                        <text className={styles.text_detail}>
                            Expertise: {expertise}
                        </text>
                    </div>
                </div>
                <div className={`${styles.user_bio} ${styles.section}`}>
                {user.description}
                {!user.description &&
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
                }
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
export default connect(mapStateToProps)(ProfileDetails);
