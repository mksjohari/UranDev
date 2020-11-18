import React from "react";
import styles from "../../modules/signUp.module.scss";
import Button from "../../shared/sandbox/Button";
import {
    finishUserSignUp,
    storage,
    addUserDetails,
} from "../../shared/firebase/firebase";
import { getFirebase } from "../../shared/firebase/config";
import { useHistory } from "react-router-dom";
import { updateInfoFromCompleteSignUp } from "../../actions/userAction";
import { connect } from "react-redux";

const getExpertise = (expertiseIds) => {
    const result = [];
    for (const [key, value] of Object.entries(expertiseIds)) {
        if (value === true) {
            result.push(expertise[key]);
        }
    }
    return result;
};

const finishSetup = async (
    firstStep,
    secondStep,
    thirdStep,
    updateInfoFromCompleteSignUp,
    history
) => {
    const random = Math.floor(Math.random() * 100000000);
    const uuid = getFirebase().auth().currentUser.uid;
    const uid = `${firstStep.firstName.toLowerCase()}-${firstStep.lastName.toLowerCase()}-${random}`;
    const photoRef = storage.ref(`users/${uid}/photo`);
    var photoURL;
    if (firstStep.imgSrc === "default") {
        photoURL = firstStep.img;
    }
    if (firstStep.imgSrc !== "default") {
        await photoRef.put(firstStep.imgSrc);
        photoURL = await photoRef.getDownloadURL();
    }
    const allExpertise = getExpertise(secondStep.expertise);
    await addUserDetails(
        uid,
        photoURL,
        allExpertise,
        firstStep,
        secondStep,
        thirdStep
    );
    updateInfoFromCompleteSignUp(
        uuid,
        uid,
        photoURL,
        allExpertise,
        firstStep,
        secondStep,
        thirdStep
    );
    history.push(`/users/${uid}`);
    await finishUserSignUp({
        uuid,
        uid,
        photoURL,
        firstStep,
        secondStep,
    });
};

const StepFour = (props) => {
    const history = useHistory();
    console.log(props);
    console.log(props.stepOne.imgSrc);
    return (
        <div className={styles.step_four}>
            <h2>
                Almost there, let's confirm
                <br />
                your account details.
            </h2>
            <div className={styles.step_four_content}>
                <div className={styles.img_div}>
                    <img
                        src={props.stepOne.img}
                        className={styles.img_preview}
                        alt="profile"
                    />
                </div>
                <div className={styles.name_div}>
                    {props.stepOne.firstName} {props.stepOne.lastName}
                </div>
                <div className={styles.details_div}>
                    <i
                        className="fas fa-map-marker-alt"
                        style={{ marginRight: "15px" }}
                    />{" "}
                    {props.stepTwo.location}
                    <br />
                    <i
                        className="fas fa-suitcase"
                        style={{ marginRight: "15px" }}
                    />
                    {props.stepTwo.occupation}
                </div>
                <div className={styles.desc_div}>
                    {props.stepTwo.personalDesc}
                </div>
            </div>
            <div className={styles.btn_controls}>
                <Button
                    iconL={<i className="fas fa-arrow-left" />}
                    text="Back"
                    onClick={() => {
                        props.prevStep();
                    }}
                />
                <Button
                    className="blue"
                    onClick={() => {
                        finishSetup(
                            props.stepOne,
                            props.stepTwo,
                            props.stepThree,
                            props.updateInfoFromCompleteSignUp,
                            history
                        );
                    }}
                    text="Finish Sign Up!"
                />
            </div>
        </div>
    );
};
export default connect(null, { updateInfoFromCompleteSignUp })(StepFour);

export const expertise = {
	id1: 'Business & Management',
	id2: 'Creative Arts',
	id3: 'Engineering & Mathematics',
	id4: 'Humanities, Arts & Social Sciences',
	id5: 'IT & Computer Science',
	id6: 'Law, Legal Studies & Justice',
	id7: 'Medical & Health Sciences',
	id8: 'Property & Built Environment',
	id9: 'Sciences',
	id10: 'Teaching & Education',
};
