import React, { useState } from "react";
import Checkbox from "../../shared/Checkbox";

const StepTwo = () => {
  const [disable, setDisable] = useState(true);
  const handleClick = () => {
    setDisable(!disable);
  };
  return (
    <>
      <h6>Expertise:</h6>
      <Checkbox id="1" label="Business & Management" />
      <Checkbox id="2" label="Creative Arts" />
      <Checkbox id="3" label="Engineering & Mathematics" />
      <Checkbox id="4" label="Humanities, Arts & Social Sciences" />
      <Checkbox id="5" label="IT & Computer Science" />
      <Checkbox id="6" label="Law, Legal Studies & Justice" />
      <Checkbox id="7" label="Medical & Health Sciences" />
      <Checkbox id="8" label="Property & Built Environment" />
      <Checkbox id="9" label="Sciences" />
      <Checkbox id="10" label="Teaching & Education" />
      <span>
        <Checkbox
          id="11"
          label="Others: (Please specify)"
          onChange={handleClick}
        />
        {disable ? (
          <input className="inp-text disabled" style={{ height: "30px" }} disabled />
        ) : (
          <input className="inp-text" style={{ height: "30px" }} />
        )}
      </span>
      <h6>Background Information:</h6>
      <input className="inp-text" placeholder="City" required />
      <input className="inp-text" placeholder="Country" required />
      <textarea className="inp-text textarea" placeholder="Personal Description" />
    </>
  );
};

export default StepTwo;
