import React from "react";
import DnD from "../../shared/DnD";
import Data from "../../shared/sampleData"

const TmpTest = () => {
  return (
    <div className="tmp">
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
