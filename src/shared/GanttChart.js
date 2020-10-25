import React from 'react';
import * as moment from 'moment';
import { Chart } from 'react-google-charts';
import styles from '../modules/ganttChart.module.scss';

/*
takes in props:

    ^data (the object/framework of the ENTIRE project, cause we need the start/end dates)

    ganttBGColour (bg colour of the gantt tracks, defaults to white)
    barColour (colour of the bars on the chart, defaults to reddo)
    fontColour (colour of the lables etc, defaults to darkpink)
    NOTselected (colour when the bar is NOT selected, defaults to pink)
    seperatorColour (totally optional. I put it as a prop just in case :) 
      basically the line that separates each task)
    
    ^chartEvent (functions to do on the chart: "getSelection" is usually the one we use, 
      see https://developers.google.com/chart/interactive/docs/ for all of em.)
      
      ***for chartEvent, we take in the ID of the selected item as
        one of our arguments, just a heads up while writing your own 
        select functions :D ***You can find the code in line 58-ish***
    
        ^ : compusory. otherwise it's all optional :)
*/



function GanttChart(props)  {
  const keyList = [
    // Google chart fixed this, so this is uncahangable :(
    { type: 'string', label: 'Task ID' },
    { type: 'string', label: 'Task Name' },
    { type: 'string', label: 'Resource' },
    { type: 'date', label: 'Start Date' },
    { type: 'date', label: 'End Date' },
    { type: 'number', label: 'Duration' },
    { type: 'number', label: 'Percent Complete' },
    { type: 'string', label: 'Dependencies' },
  ];

  const ganttChartData = [keyList];
  
  props.data.taskData.forEach(task => {
    const values = [
      task.taskId,
      task.title,
      null,
      (task.startDate ? task.startDate.toDate() : props.startDate.toDate() ),
      (task.endDate ? task.endDate.toDate() : props.endDate.toDate() ),
      null,
      100,
      null,
    ];
    ganttChartData.push(values);
  });

  const chartEvents = [
    {
      eventName: 'select',
      callback: ({ chartWrapper }) => {
        const chart = chartWrapper.getChart();
        const selection = chart.getSelection();
        if (selection.length === 1) {
          const [selectedItem] = selection;
          const dataTable = chartWrapper.getDataTable();
          const { row } = selectedItem;

          const value = dataTable.getValue(row, 0);
          console.log(selection);

          props.chartEvent(value);
        }
        
      },
    },
    
  ];

  const options = {
    gantt: {
      criticalPathEnabled: false,
      sortTasks: false,
      innerGridHorizLine: {
        stroke: props.seperatorColour ? props.seperatorColour : '#ededed',
        strokeWidth: 1,
      },

      innerGridTrack: { fill: props.ganttBGColour ? props.ganttBGColour : 'white' },
      innerGridDarkTrack: { fill: props.ganttBGColour ? props.ganttBGColour : 'white' },
      trackHeight: 35,
      
      barCornerRadius: 5,
      barHeight: 24,
      
      labelStyle: {
        fontName: "poppins",
        fontSize: 14,
      },
      palette: [
        {
          "color": props.fontColour ? props.fontColour : "#906a64",
          "dark": props.barColour ? props.barColour : "#FF8585",
          "light": props.NOTselected ? props.NOTselected : "#ffded9",
        }
      ]
    },
  };

  // a note: theres literally no simple way to get rid of the pop up when you hover on the bars ;-;
  // its called a tooltip but google-charts does not support the customisation of it in Gantt Charts.
  // if we REALLY don't want it then I'll get rid of it, otherwise I've beautified it to match our style atm.

  return (
    <>
      <div className={styles.chartContainer} >
        <Chart 
          chartType='Gantt'
          loader={<center><p>Loading Chart...</p></center>}
          data={ganttChartData}
          width={'100%'}
          className={styles.ganttChart}
          options={options}
          chartEvents={chartEvents}
        />
      </div>
    </>
  )

}

export default GanttChart;
