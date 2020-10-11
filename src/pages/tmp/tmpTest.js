import React from "react";
import DnD from "../../shared/DnD";
import DateSelect from "../../shared/DateSelect";
import Data from "../../shared/sampleData";
import Popup from "../../shared/sandbox/popup";
import AddActionForm from '../../shared/AddActionForm'

const TmpTest = () => {

  function close(e) {
    if (e.target.tagName == 'SPAN' || e.target.tagName == 'I') {
      e.target = e.target.parentNode;
    }

    console.log(e.target);

    const overlay = document.getElementById(e.target.id.replace(/_close/g , '_popContent'));

    overlay.style.display = 'none';

  }

  return (
    <div className="tmp">
      <Popup text='Popip' id='tmpBtn' content={<AddActionForm id='tmpBtn' actionId='test' close={close} />} />
      <br/>
      <br/>
      
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
