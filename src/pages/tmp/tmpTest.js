import React from "react";
import DnD from "../../shared/DnD";
import DateSelect from "../../shared/DateSelect";
import Data from "../../shared/sampleData";
import Popup from "../../shared/sandbox/popup";
import AddActionForm from '../../shared/AddActionForm'
import EndorseList from '../../shared/EndorseList';

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
      <Popup 
        text='Endorse a skill' 
        colour='yellow' 
        id='endorseSkill' 
        iconR={<i className='fas fa-medal'></i>}
        content={<EndorseList id='endorseSkill' isSkill={true} />} 
      />
      <Popup 
        text='Endorse a tool' 
        colour='blue' 
        id='endorseTool' 
        iconR={<i className='fas fa-medal'></i>}
        content={<></>} 
      />
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
