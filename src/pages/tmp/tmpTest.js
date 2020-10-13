import React from "react";
import DnD from "../../shared/reactDnD/DnD";
import TaskDnD from "../../shared/reactDnD/taskDnD";
import ShortListDnD from "../../shared/reactDnD/shortlistDnD";
import Data from "../../shared/reactDnD/sampleData";

const TmpTest = () => {
    return (
        <div className="tmp">
            <TaskDnD data={taskData} />
            {/* <ShortListDnD /> */}
            {/* <DnD 
        actions={Data.actions}
        tasks={Data.tasks}
        taskOrder={Data.taskOrder}
        totalActions={Data.totalActions}
        totalTasks={Data.totalTasks}
      /> */}
            <p>{Data.totalActions}</p>
        </div>
    );
};

export default TmpTest;

export const taskData = [
    {
        taskId: "task-1",
        title: "yes",
        description: "yessir",
        actions: [
            {
                actionId: "action-1",
                title: "Source control",
                tools: ["git", "weh"],
                skills: [],
                description: "git and weh",
            },
            {
                actionId: "action-2",
                title: "Development",
                tools: [],
                skills: ["web dev", "app design", "number theory"],
                description: "happy days are aheard",
            },
            {
                actionId: "action-3",
                title: "More development",
                tools: ["MATLAB", "adobe XD", "Rhino3D", "react"],
                skills: ["web dev", "app design", "number theory"],
                description: "I did somethin",
            },
            {
                actionId: "action-4",
                title: "Something else",
                tools: [],
                skills: [],
                description: "yeh this that blah",
            },
        ],
    },
    {
        taskId: "task-2",
        title: "no",
        description: "no sir",
        actions: [
            {
                actionId: "action-4",
                tools: [],
                skills: [],
                description: "yeh this that blah",
            },
        ],
    },
];
