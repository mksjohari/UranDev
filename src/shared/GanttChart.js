import React from 'react';
import { Chart } from 'react-google-charts';
import styles from '../modules/ganttChart.module.scss';

function GanttChart(props)  {
  const keyList = [];
  Object.keys(props.data.taskData[0]).forEach(key => keyList.push({
    type: typeof(props.data.taskData[0][key]),
    label: key,
  }));

  return (
    <>
      <div className={styles.chartContainer} >
        {JSON.stringify(keyList)}
        <Chart 
          chartType='Gantt'
          data={[
            props.data
          ]}
        />
      </div>
    </>
  )

}

export default GanttChart;
