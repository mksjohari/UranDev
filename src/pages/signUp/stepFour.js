import React from "react";
import styles from "../../modules/signUp.module.scss";
import Button from "../../shared/sandbox/Button";
import { finishUserSignUp, storage } from "../../shared/firebase/firebase";
import { getFirebase } from "../../shared/firebase/config";
import { useHistory } from "react-router-dom";
import { updateInfo } from "../../actions/userAction";

const finishSetup = async (firstStep, secondStep, thirdStep, history) => {
    const uid = getFirebase().auth().currentUser.uid;
    const photoRef = storage.ref(`users/${uid}/photo`);
    var photoURL;
    if (firstStep.imgSrc === "default") {
        photoURL = firstStep.img;
    }
    if (firstStep.imgSrc !== "default") {
        await photoRef.put(firstStep.imgSrc);
        photoURL = await photoRef.getDownloadURL();
    }

    await finishUserSignUp({
        uid: uid,
        photoURL,
        firstStep,
        secondStep,
        thirdStep,
    });
    history.push("/profile");
};

const StepFour = (props) => {
    const history = useHistory();
    return (
        <div className={styles.step}>
            <h2>
                Almost there, let's confirm
                <br />
                your account details.
            </h2>

            <div className={styles.btn_controls}>
                <Button
                    iconL={<i className="fas fa-arrow-left" />}
                    text="Back"
                    onClick={() => {
                        props.prevStep();
                    }}
                />
                <Button
                    onClick={() => {
                        finishSetup(
                            props.stepOne,
                            props.stepTwo,
                            props.stepThree,
                            history
                        );
                    }}
                    text="Finish Sign Up!"
                />
            </div>
        </div>
    );
};

export default StepFour;
