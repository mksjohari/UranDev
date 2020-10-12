import React, { useState } from "react";
import DnD from "../../shared/DnD";
import DateSelect from "../../shared/DateSelect";
import Data from "../../shared/sampleData";
import Popup from "../../shared/sandbox/popup";
import AddActionForm from '../../shared/AddActionForm'
import EndorseList from '../../shared/EndorseList';
import Alert from '../../shared/sandbox/Alert';

const TmpTest = () => {
  const skillsDefault = {
    'web dev': false,
    'leech': false,
    'wireframing': false,
    list: {
      'web dev': 10,
      'leech': 0,
      'wireframing': 5000000,
    },
  };
  
  const toolsDefault = {
    git: false,
    weh: false,
    react: false,
    list: {
      'git': 10,
      'weh': 0,
      'react': 5000000,
    },
  };

  const [skills, setSkills] = useState(skillsDefault);
  const [tools, setTools] = useState(toolsDefault);

  function close(e) {
    if (e.target.tagName == 'SPAN' || e.target.tagName == 'I') {
      e.target = e.target.parentNode;
    }

    console.log(e.target);

    const overlay = document.getElementById(e.target.id.replace(/_close/g , '_popContent'));
    const body = document.getElementsByTagName('body')[0];

    overlay.style.display = 'none';
    body.style.overflow = 'scroll';
    body.style.height = '100%';

  }

  return (
    <div className="tmp">
      <Popup 
        text='Basic delete btn' 
        colour='reddo' 
        id='delTut' 
        iconR={<i className='fas fa-trash-alt'></i>}
        content={<Alert id='delTut' type='(type of thing you want to delete)' close={close} onConfirm={() => console.log('your own confirm func')} />} 
      />
      <Popup 
        text='Delete Action' 
        colour='reddo' 
        id='delAction' 
        iconR={<i className='fas fa-trash-alt'></i>}
        content={<Alert id='delAction' type='action' close={close} onConfirm={() => console.log('your own confirm func')} />} 
      />
      <Popup 
        text='Delete Project' 
        colour='reddo' 
        id='delProject' 
        iconR={<i className='fas fa-trash-alt'></i>}
        content={<Alert id='delProject' type='project' close={close} onConfirm={() => console.log('your own confirm func')} />} 
      />
      <Popup 
        text='Endorse a skill' 
        colour='yellow' 
        id='endorseSkill' 
        iconR={<i className='fas fa-medal'></i>}
        content={<EndorseList id='endorseSkill' isSkill={true} data={skills} setItem={setSkills} close={close} />} 
      />
      <Popup 
        text='Endorse a tool' 
        colour='blue' 
        id='endorseTool' 
        iconR={<i className='fas fa-medal'></i>}
        content={<EndorseList id='endorseTool' isSkill={false} data={tools} setItem={setTools} close={close} />} 
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
