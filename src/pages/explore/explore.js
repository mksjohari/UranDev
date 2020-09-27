import React, { useState } from "react";
import Tab from "../../shared/Tab";
import Timeline from "../../shared/Timeline";
import Button from "../../shared/Button";
import StepOne from "../signUp/stepOne";
import StepTwo from "../signUp/stepTwo";
import StepThree from "../signUp/stepThree";
import StepFour from "../signUp/stepFour";
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
      <h2>Welcome to URAN,</h2>
      <p>Create your e-portfolio today!</p>
      <Tab />
      <div className="timeline">
        <Timeline
          label={[
            "ACCOUNT SETUP",
            "BACKGROUND INFORMATION",
            "SOCIAL ACCOUNTS",
            "CONFIRMATION",
          ]}
          percent={percent}
        />
      </div>
      <section className="sign-up-container">
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
      </section>
      <div className="btn-controls">
        {
          step === 0 ? (
            <p> </p>
          ) : (
            <Button
              iconL={<i className="fas fa-arrow-left" />}
              text="Back"
              onClick={prevStep}
            />
          )
        }
        <Button
          colour="blue"
          iconR={<i className="fas fa-arrow-right" />}
          text="Next"
          onClick={nextStep}
        />
      </div>
    </>
  );
};

export default Explore;
