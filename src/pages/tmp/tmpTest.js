import React from "react";
import DnD from "../../shared/DnD";
import DateSelect from "../../shared/DateSelect";
import Data from "../../shared/sampleData";
import Popup from "../../shared/sandbox/popup";
import AddActionForm from '../../shared/AddActionForm'

const TmpTest = () => {
  return (
    <div className="tmp">
      <Popup text='Popip' id='tmpBtn' content={<DateSelect/>} />
      <br/>
      <br/>
      <AddActionForm  />
      <DateSelect />
      <DnD
        actions={Data.actions}
        tasks={Data.tasks}
        taskOrder={Data.taskOrder}
        totalActions={Data.totalActions}
        totalTasks={Data.totalTasks}
      />
      <p>{Data.totalActions}</p>
    </div>
  );
};

export default TmpTest;
