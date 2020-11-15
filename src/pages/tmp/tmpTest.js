import React , { useState } from 'react';
// import DnD from "../../shared/DnD";
import * as moment from 'moment';
// import Data from "../../shared/reactDnD/sampleData";
import TaskDnD from '../../shared/reactDnD/taskDnD';
import GanttChart from '../../shared/GanttChart';
import PDFPreview from '../../shared/sandbox/PDFPreview';
import Button from '../../shared/sandbox/Button';


const TmpTest = (props) => {

	const [PDF, setPDF] = useState("");
	const [imageSection, setImageSection] = useState(false);
	const [PDFSection, setPDFSection] = useState(false);
	const handleClose = (str) => (str === 'pdf' ? setPDFSection(false) : setImageSection(false));
	const handleShow = (str) => (str === 'pdf' ? setPDFSection(true) : setImageSection(true));

	const showImages = () => {
		handleClose('pdf');
		handleShow('images');
	};
	const showPDFs = () => {
		handleClose('images');
		handleShow('pdf');
	};

	function handleChange(event) {
		setPDF(
			event.target.files[0]
			);
		console.log(PDF);
	}

	
	function sampleChartFunc(id) {
		console.log(id);
	}
	
	console.log('tmp props', props);


	return (
		<div className="tmp">
			<div>
				<p>What are you uploading?</p>
				<div>
					(for Michelle) this is just an example, I think that Segment tab you did would work well for this :)
				</div>
				<Button type='button' text='Images' onClick={showImages} />
				<Button type='button' text="PDF's" onClick={showPDFs} />
			</div>
			{imageSection ? 
				(
				<div>
					<p>
						Image result section
					</p>
				</div>
				)
				: ("") 
			}
			{PDFSection ? 
				(<>
				<p>Please select ONE pdf file</p>
					<div className={""} style={{width: '100px', border:'solid 1px', borderRadius: '15px' }} >
						<label>
							<input type="file" accept="pdf" onChange={handleChange} />
							<i
								className="fas fa-file"
								style={{ marginRight: 5 }}
							/>
							Upload PDF
						</label>
					</div>
					<PDFPreview setFile={setPDF} file={PDF} />
				</>)

			: ("")
			}
			<GanttChart data={projectData} chartEvent={sampleChartFunc} />
			{/* 
			<Popup
				BtnText="Basic delete btn"
				BtnColour="reddo"
				BtnId="delTut"
				BtnIconR={<i className="fas fa-trash-alt"></i>}
				contentBGColour={'white'}
				closeBtnLabel="cancel"
				hasConfirm
				confirmBtnLabel="yee"
				onConfirm={() => console.log('your own confirm func')}
				width={500}
				content={
					<Alert
						id="delTut"
						type="(type of thing you want to delete)"
					/>
				}
			/>
			<Popup
				BtnText="Delete Action"
				BtnColour="reddo"
				BtnId="delAction"
				BtnIconR={<i className="fas fa-trash-alt"></i>}
				contentBGColour={'white'}
				closeBtnLabel="No, go back"
				hasConfirm
				confirmBtnLabel="Yes, delete"
				onConfirm={() => console.log('your own confirm func')}
				width={500}
				content={<Alert id="delAction" type="action" />}
			/>
			<Popup
				BtnText="Delete Project"
				BtnColour="reddo"
				BtnId="delProject"
				BtnIconR={<i className="fas fa-trash-alt"></i>}
				contentBGColour={'white'}
				closeBtnLabel="No, go back"
				hasConfirm
				confirmBtnLabel="Yes, delete"
				onConfirm={() => console.log('your own confirm func')}
				width={500}
				content={<Alert id="delProject" type="project" />}
			/>
			<Popup
				BtnText="Endorse a skill"
				BtnColour="yellow"
				BtnId="endorseSkill"
				BtnIconR={<i className="fas fa-medal"></i>}
				contentBGColour={'#faf6f1'}
				closeBtnLabel="Close"
				closeColour="yellow"
				width={600}
				content={
					<EndorseList
						id="endorseSkill"
						isSkill={true}
						data={skills}
						setItem={setSkills}
					/>
				}
			/>
			<Popup
				BtnText="Endorse a tool"
				BtnColour="blue"
				BtnId="endorseTool"
				BtnIconR={<i className="fas fa-medal"></i>}
				contentBGColour={'#faf6f1'}
				closeBtnLabel="Close"
				closeColour="blue"
				width={600}
				content={
					<EndorseList
						id="endorseTool"
						isSkill={false}
						data={tools}
						setItem={setTools}
					/>
				}
			/>
			<Popup
				BtnText="Add Action"
				BtnColour="pink"
				BtnId="addAction"
				contentBGColour={'#faf6f1'}
				closeBtnLabel="Cancel"
				closeColour="reddo"
				hasConfirm
				confirmBtnLabel="Confirm"
				confirmColour="pink"
				onConfirm={() => console.log('your own confirm func')}
				width={700}
				content={<AddActionForm id="addAction" />}
			/> */}
			<br />
			<br />
			{/* <DateSelect /> */}
			<TaskDnD data={taskData} />
			{/* <DnD
        actions={Data.actions}
        tasks={Data.tasks}
        taskOrder={Data.taskOrder}
        totalActions={Data.totalActions}
        totalTasks={Data.totalTasks}
      />  */}
		</div>
	);
};
export default TmpTest;

export const taskData = [
	{
		taskId: 'task-1',
		title: 'yes',
		description: 'yessir',
		startDate: moment([2018, 0, 1]), // to moment
		endDate: moment([2019, 0, 1]),
		actions: [
			{
				actionId: 'action-1',
				title: 'Source control',
				tools: ['git', 'weh'],
				skills: [],
				description: 'git and weh',
				files: [],
			},
			{
				actionId: 'action-2',
				title: 'Development',
				tools: [],
				skills: ['web dev', 'app design', 'number theory'],
				description: 'happy days are aheard',
				files: [],
			},
			{
				actionId: 'action-3',
				title: 'More development',
				tools: ['MATLAB', 'adobe XD', 'Rhino3D', 'react'],
				skills: ['web dev', 'app design', 'number theory'],
				description: 'I did somethin',
				files: [],
			},
			{
				actionId: 'action-4',
				title: 'Something else',
				tools: [],
				skills: [],
				description: 'yeh this that blah',
				files: [],
			},
		],
	},
	{
		taskId: 'task-2',
		title: 'no',
		description: 'no sir',
		startDate: moment([2019, 0, 2]),
		endDate: moment([2019, 4, 9]),
		actions: [
			{
				actionId: 'action-4',
				tools: [],
				skills: [],
				description: 'yeh this that blah',
				files: [],
			},
		],
	},
	{
		taskId: 'task-3',
		title: 'no',
		description: 'no sir',
		startDate: moment([2019, 2, 19]),
		endDate: moment([2019, 4, 28]),
		actions: [
			{
				actionId: 'action-4',
				tools: [],
				skills: [],
				description: 'yeh this that blah',
				files: [],
			},
		],
	},
	{
		taskId: 'task-4',
		title: 'no',
		description: 'no sir',
		startDate: moment([2019, 0, 1]),
		endDate: moment([2020, 9, 9]),
		actions: [
			{
				actionId: 'action-4',
				tools: [],
				skills: [],
				description: 'yeh this that blah',
				files: [],
			},
		],
	},
];

export const projectData = {
	name: 'test project',
	situation: 'the world is in chaos',
	role: '',
	teamSize: '2-5',
	budget: '300000',
	currency: 'aud',
	startDate: moment([2020, 2, 1]), // change to moment.js
	endDate: moment([2020, 3, 3]),
	taskData: taskData,
};

export const skillsDefault = {
	'web dev': false,
	leech: false,
	wireframing: false,
	list: {
		'web dev': 10,
		leech: 0,
		wireframing: 5000000,
	},
};

export const toolsDefault = {
	git: false,
	weh: false,
	react: false,
	list: {
		git: 10,
		weh: 0,
		react: 5000000,
	},
};
