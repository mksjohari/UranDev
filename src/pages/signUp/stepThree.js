import React from "react";
import styles from "../../modules/signUp.module.scss";
import Button from "../../shared/sandbox/Button";

const StepThree = (props) => {
    const onChange = (value, id) => {
        props.setStepThree({
            ...props.data,
            [id]: value,
        });
    };
    return (
        <div className={styles.step}>
            <span className={styles.social_icon_span}>
                <caption>Linkedin</caption>
                <input
                    className="inp-text"
                    type="url"
                    value={props.data.linkedin}
                    onChange={(e) => {
                        onChange(e.target.value, "linkedIn");
                    }}
                    placeholder="URL to account"
                />
            </span>
            <span className={styles.social_icon_span}>
                <caption>Github</caption>
                <input
                    className="inp-text"
                    type="url"
                    value={props.data.github}
                    onChange={(e) => {
                        onChange(e.target.value, "github");
                    }}
                    placeholder="URL to account"
                />
            </span>
            <span className={styles.social_icon_span}>
                <caption>Slack</caption>
                <input
                    className="inp-text"
                    type="url"
                    value={props.data.slack}
                    onChange={(e) => {
                        onChange(e.target.value, "slack");
                    }}
                    placeholder="URL to account"
                />
            </span>
            <span className={styles.social_icon_span}>
                <caption>Codesandbox</caption>
                <input
                    className="inp-text"
                    type="url"
                    value={props.data.codeSandBox}
                    onChange={(e) => {
                        onChange(e.target.value, "codeSandBox");
                    }}
                    placeholder="URL to account"
                />
            </span>
            <span className={styles.social_icon_span}>
                <caption>Behance</caption>
                <input
                    className="inp-text"
                    type="url"
                    value={props.data.behance}
                    onChange={(e) => {
                        onChange(e.target.value, "behance");
                    }}
                    placeholder="URL to account"
                />
            </span>
            <span className={styles.social_icon_span}>
                <caption>Figma</caption>
                <input
                    className="inp-text"
                    type="url"
                    value={props.data.figma}
                    onChange={(e) => {
                        onChange(e.target.value, "figma");
                    }}
                    placeholder="URL to account"
                />
            </span>
            <span className={styles.social_icon_span}>
                <caption>Dribbble</caption>
                <input
                    className="inp-text"
                    type="url"
                    value={props.data.dribble}
                    onChange={(e) => {
                        onChange(e.target.value, "dribble");
                    }}
                    placeholder="URL to account"
                />
            </span>
            <div className={styles.btn_controls}>
                <Button
                    iconL={<i className="fas fa-arrow-left" />}
                    text="Back"
                    onClick={() => {
                        // props.setStepTwo({});
                        props.prevStep();
                    }}
                />
                <Button
                    colour="blue"
                    iconR={<i className="fas fa-arrow-right" />}
                    text="Next"
                    onClick={() => {
                        // props.setStepTwo({});
                        props.nextStep();
                    }}
                />
            </div>
        </div>
    );
};

export default StepThree;
