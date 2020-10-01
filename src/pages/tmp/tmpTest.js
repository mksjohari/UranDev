import React, { useState } from "react";
import DnD from "../../shared/DnD";
import data from "../../shared/sampleData"

const TmpTest = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [img, setImg] = useState("");
  function handleChange(event) {
    setImg(URL.createObjectURL(event.target.files[0]));
  }
  return (
    <div className="tmp">
      <DnD tasks={data.tasks}
      col={data.cols}
      colOrder={data.colOrder}/>
      <div className="">
      <p>hello</p>
      </div>
    </div>
  );
};

export default TmpTest;
