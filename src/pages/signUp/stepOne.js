import React, { useState } from "react";
import SegmentedTab from "../../shared/SegmentedTab";

const StepOne = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [img, setImg] = useState("");
  function handleChange(event) {
    setImg(URL.createObjectURL(event.target.files[0]));
  }
  return (
    <>
      <h6>Personal details:</h6>
      <SegmentedTab />
      <input
        className="inp-text"
        placeholder="First name"
        onChange={(e) => setFname(e.target.value)}
        required
      />
      <input
        className="inp-text"
        placeholder="Last name"
        onChange={(e) => setLname(e.target.value)}
        required
      />
      <h6>Profile Picture:</h6>

      <div className="preview-container">
        {img ? (
          <img className="img-preview" src={img} />
        ) : (
          <div id="img-placeholder">
            <i className="fas fa-image" />
          </div>
        )}
        <div className="preview-controls">
          <label className="upload-btn button">
            <input type="file" onChange={handleChange} />
            <i className="fas fa-camera" /> Upload Photo
          </label>
          <p className="tip">At least 256px x 256px PNG or JPG file</p>
        </div>
      </div>
    </>
  );
};

export default StepOne;
