import React, { useState } from "react";
import behance from "../../images/behance.png";
import codesandbox from "../../images/codesandbox.png";
import dribbble from "../../images/dribbble.png";
import figma from "../../images/figma.png";
import github from "../../images/github.png";
import linkedin from "../../images/linkedin.png";
import slack from "../../images/slack.png";

const StepThree = () => {
  return (
    <div className="step">
      <span className="social-icon-span">
        <img className="social-icon" src={linkedin} alt="Linkedin" />
        <caption>Linkedin</caption>
        <input className="inp-text" placeholder="URL to account" />
      </span>
      <span className="social-icon-span">
        <img className="social-icon" src={github} alt="Github" />
        <caption>Github</caption>
        <input className="inp-text" placeholder="URL to account" />
      </span>
      <span className="social-icon-span">
        <img className="social-icon" src={slack} alt="Slack" />
        <caption>Slack</caption>
        <input className="inp-text" placeholder="URL to account" />
      </span>
      <span className="social-icon-span">
        <img className="social-icon" src={codesandbox} alt="Codesandbox" />
        <caption>Codesandbox</caption>
        <input className="inp-text" placeholder="URL to account" />
      </span>
      <span className="social-icon-span">
        <img className="social-icon" src={behance} alt="Behance" />
        <caption>Behance</caption>
        <input className="inp-text" placeholder="URL to account" />
      </span>
      <span className="social-icon-span">
        <img className="social-icon" src={figma} alt="Figma" />
        <caption>Figma</caption>
        <input className="inp-text" placeholder="URL to account" />
      </span>
      <span className="social-icon-span">
        <img className="social-icon" src={dribbble} alt="Dribbble" />
        <caption>Dribbble</caption>
        <input className="inp-text" placeholder="URL to account" />
      </span>
    
    </div>
  );
};

export default StepThree;
