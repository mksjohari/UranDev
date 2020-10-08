import React, { useState, useEffect } from "react";
import SegmentedTab from "./SegmentedTab";
import styles from "../../modules/signUp.module.scss";
import Button from "../../shared/sandbox/Button";
import buttonStyle from "../../modules/_button.module.scss";

const StepOne = (props) => {
    const stepOne = props.stepOne;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    useEffect(() => {
        if (stepOne) {
            setFirstName(stepOne.firstName);
            setLastName(stepOne.lastName);
        }
    }, [stepOne]);
    function handleChange(event) {
        props.setStepOne({
            ...props.stepOne,
            imgSrc: event.target.files[0],
            img: URL.createObjectURL(event.target.files[0]),
        });
    }
    return (
        <div className={styles.step}>
            <h6>Personal Details:</h6>
            <div className={styles.personal_details}>
                <SegmentedTab
                    role={props.stepOne.role}
                    stepOne={props.stepOne}
                    setStepOne={props.setStepOne}
                />
                <input
                    className={`inp-text ${styles.step_one}`}
                    placeholder="First name"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                />
                <input
                    className={`inp-text ${styles.step_one}`}
                    placeholder="Last name"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                />
            </div>
            <h6>Profile Picture:</h6>

            <div className={styles.preview_container}>
                <img
                    className={styles.img_preview}
                    src={props.stepOne.img}
                    alt="Profile pic"
                />
                <div className={styles.preview_controls}>
                    <label
                        className={`${buttonStyle.upload_btn} ${buttonStyle.button}`}
                    >
                        <input type="file" onChange={handleChange} />
                        <i
                            className="fas fa-camera"
                            style={{ marginRight: 5 }}
                        />
                        Upload Photo
                    </label>
                    <p className={styles.tip}>
                        At least 256px x 256px PNG or JPG file
                    </p>
                </div>
            </div>
            <div className={styles.btn_controls}>
                <Button
                    colour="blue"
                    iconR={<i className="fas fa-arrow-right" />}
                    text="Next"
                    onClick={() => {
                        props.setStepOne({
                            ...props.stepOne,
                            firstName,
                            lastName,
                        });
                        props.nextStep();
                    }}
                />
            </div>
        </div>
    );
};

export default StepOne;
