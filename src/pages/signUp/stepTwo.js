import React, { useState } from "react";
import Checkbox from "../../shared/Checkbox";

const StepTwo = () => {
  const [disable, setDisable] = useState(true);
  const handleClick = () => {
    setDisable(!disable);
  };
  return (
    <div className="step">
      <h6>Expertise:</h6>
      <div className="row">
        <div className="column">
          <Checkbox id="1" label="Business & Management" />
          <Checkbox id="2" label="Creative Arts" />
          <Checkbox id="3" label="Engineering & Mathematics" />
          <Checkbox id="4" label="Humanities, Arts & Social Sciences" />
          <Checkbox id="5" label="IT & Computer Science" />
        </div>
        <div className="column">
          <Checkbox id="6" label="Law, Legal Studies & Justice" />
          <Checkbox id="7" label="Medical & Health Sciences" />
          <Checkbox id="8" label="Property & Built Environment" />
          <Checkbox id="9" label="Sciences" />
          <Checkbox id="10" label="Teaching & Education" />
        </div>
      </div>
      <span className="span-others">
        <Checkbox
          id="11"
          label="Others (please specify):"
          onChange={handleClick}
        />
        {disable ? (
          <input
            className="inp-text disabled"
            style={{ height: "30px", width: "350px"  }}
            disabled
          />
        ) : (
          <input className="inp-text" style={{ height: "30px", width: "350px" }} />
        )}
      </span>
      <div className="background-info">
        <h6>Background Information:</h6>
        <input className="inp-text" placeholder="City" required />
        <input className="inp-text" placeholder="Country" required />
        <textarea
          className="inp-text textarea"
          placeholder="Personal Description"
        />
      </div>
    </div>
  );
};

export default StepTwo;