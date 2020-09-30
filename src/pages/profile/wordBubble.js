import React from "react";
// import BubbleChart from '@weknow/react-bubble-chart-d3';
import BubbleChart from "./bubbleChart";
// import Actions          from '../Actions';

function bubbleData(data) {
  const output = []
  data.forEach(element => {
    let label = element.label;
    let value = element.value;
    let color;
    (value > 10) ? color = "#fad47a" : color = "#faebb3";
    output.push({label, value, color})
  });
  return output;
}

function WordBubble(props) {
    const bubbleClick = (label) =>{
        console.log("Custom bubble click func")
      }
    const legendClick = (label) =>{
        console.log("Customer legend click func")
      }
    return (
          <BubbleChart
            graph= {{
              zoom: 1.0,
              offsetX: 0,
              offsetY: 0,
            }}
            width={window.innerWidth > 720 ? (window.innerWidth* 0.5) : (window.innerWidth* 1)}
            height={window.innerHeight * 1}
            overflow={true}
            padding={10} // optional value, number that set the padding between bubbles
            showLegend={false} // optional value, pass false to disable the legend.
            valueFont={{
                  family: 'Poppins',
                  size: 12,
                  color: '#3e4d74',
                  weight: 'bold',
                }}
            labelFont={{
                  family: 'Poppins',
                  size: 14,
                  color: '#3e4d74',
                  weight: '500',
                }}
            //Custom bubble/legend click functions such as searching using the label, redirecting to other page
            bubbleClickFunc={bubbleClick}
            legendClickFun={legendClick}
            data={bubbleData(props.data)}
          />
    );
}

export default WordBubble;

