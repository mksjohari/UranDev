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
        BtnText='Basic delete btn' 
        BtnColour='reddo' 
        BtnId='delTut' 
        BtnIconR={<i className='fas fa-trash-alt'></i>}
        contentBGColour={'white'}
        closeBtnLabel="cancel"
        hasConfirm
        confirmBtnLabel='yee'
        onConfirm={() => console.log('your own confirm func')}
        width={500}
        content={<Alert id='delTut' type='(type of thing you want to delete)' />} 
      />
      <Popup 
        BtnText='Delete Action' 
        BtnColour='reddo' 
        BtnId='delAction' 
        BtnIconR={<i className='fas fa-trash-alt'></i>}
        contentBGColour={'white'}
        closeBtnLabel="No, go back"
        hasConfirm
        confirmBtnLabel='Yes, delete'
        onConfirm={() => console.log('your own confirm func')}
        width={500}
        content={<Alert id='delAction' type='action' />} 
      />
      <Popup 
        BtnText='Delete Project' 
        BtnColour='reddo' 
        BtnId='delProject' 
        BtnIconR={<i className='fas fa-trash-alt'></i>}
        contentBGColour={'white'}
        closeBtnLabel="No, go back"
        hasConfirm
        confirmBtnLabel='Yes, delete'
        onConfirm={() => console.log('your own confirm func')}
        width={500}
        content={<Alert id='delProject' type='project' />} 
      />
      <Popup 
        BtnText='Endorse a skill' 
        BtnColour='yellow' 
        BtnId='endorseSkill' 
        BtnIconR={<i className='fas fa-medal'></i>}
        contentBGColour={'#faf6f1'}
        closeBtnLabel="Close"
        closeColour='yellow'
        width={600}
        content={<EndorseList id='endorseSkill' isSkill={true} data={skills} setItem={setSkills}/>} 
      />
      <Popup 
        BtnText='Endorse a tool' 
        BtnColour='blue' 
        BtnId='endorseTool' 
        BtnIconR={<i className='fas fa-medal'></i>}
        contentBGColour={'#faf6f1'}
        closeBtnLabel="Close"
        closeColour='blue'
        width={600}
        content={<EndorseList id='endorseTool' isSkill={false} data={tools} setItem={setTools}/>}
      />
      <Popup 
        BtnText='Add Action' 
        BtnColour='pink' 
        BtnId='addAction' 
        contentBGColour={'#faf6f1'}
        closeBtnLabel="Cancel"
        closeColour='reddo'
        hasConfirm
        confirmBtnLabel='Confirm'
        confirmColour='pink'
        onConfirm={() => console.log('your own confirm func')}
        width={700}
        content={<AddActionForm id='addAction' />}
      />
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
