import React, { useState } from "react";
import Tab from "../../shared/Tab";
import Timeline from "../../shared/Timeline";
import Button from "../../shared/Button";
import StepOne from "../signUp/stepOne";
import StepTwo from "../signUp/stepTwo";
import StepThree from "../signUp/stepThree";
import StepFour from "../signUp/stepFour";
import jobsearch from "../../images/jobsearch.png";
import typing from "../../images/typing.png";
import "../../shared/modules/signUp.scss";
import "react-step-progress-bar/styles.css";

const Explore = () => {
  const [percent, setPercent] = useState(0);
  const [step, setStep] = useState(0);

  function nextStep() {
    if (step < 3) {
      setPercent((step * 100 + 100) / 3);
      setStep(step + 1);
    }
  }
  function prevStep() {
    if (step > 0) {
      setPercent((step * 100 - 100) / 3);
      setStep(step - 1);
    }
  }
  return (
    <>
      <h1>Welcome to URAN,</h1>
      <p style={{ fontSize: "16px" }}>Create your e-portfolio today!</p>
      <img className="jobsearch-img" src={jobsearch} alt="jobsearch" />
      <Tab />
      <div className="sign-up-container">
        <div className="sign-up-side-panel">
          <h1>Create account</h1>
          <p>Sign up to create your e-portfolio</p>
          <img className="typing-img" src={typing} alt="typing" />
        </div>
        <section className="sign-up-form">
          <div className="timeline">
            <Timeline label={label} percent={percent} />
          </div>
          {step === 0 ? (
            <StepOne />
          ) : step === 1 ? (
            <StepTwo />
          ) : step === 2 ? (
            <StepThree />
          ) : step === 3 ? (
            <StepFour />
          ) : (
            ""
          )}
          <div className="btn-controls">
            {step === 0 ? (
              <p> </p>
            ) : (
              <Button
                iconL={<i className="fas fa-arrow-left" />}
                text="Back"
                onClick={prevStep}
              />
            )}
            {step === 2 ? <a>Skip</a> : ""}
            <Button
              colour="blue"
              iconR={<i className="fas fa-arrow-right" />}
              text="Next"
              onClick={nextStep}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Explore;

const label = [
  "ACCOUNT SETUP",
  "BACKGROUND INFORMATION",
  "SOCIAL ACCOUNTS",
  "CONFIRMATION",
];
