import React, { useState } from "react";
import DnD from "../../shared/DnD";
import Data from "../../shared/sampleData"

const TmpTest = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [img, setImg] = useState("");
  function handleChange(event) {
    setImg(URL.createObjectURL(event.target.files[0]));
  }
  return (
    <div className="tmp">
      <DnD actions={Data.actions}
      tasks={Data.tasks}
      taskOrder={Data.taskOrder}/>
      <div className="">
      <p>hello</p>
      </div>
    </div>
  );
};

export default TmpTest;
