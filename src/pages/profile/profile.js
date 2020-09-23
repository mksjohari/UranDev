import React, { useEffect } from "react";
import BubbleChart from "./bubbleChart";
import Button from "../../shared/Button";

const profile = () => {
    return (
        <div>
            <h1>Hello,</h1>
            <p>I'm profile</p>
            {/* <BubbleChart data={data} /> */}
            <Button
                colour="yellow"
                iconR={<i className="fas fa-check"/>}
                text="Accept"
            />
        </div>
    );
};

export default profile;

var data = [
    {
        _id: "bubble1", // unique id (required)
        value: 50, // used to determine relative size of bubbles (required)
        displayText: "Number Theory", // will use _id if undefined
        colorValue: 0, // used to determine color
        selected: true, // if true will use selectedColor/selectedTextColor for circle/text
    },
    {
        _id: "bubble2", // unique id (required)
        value: 5, // used to determine relative size of bubbles (required)
        displayText: "HTML", // will use _id if undefined
        colorValue: 3, // used to determine color
        selected: true, // if true will use selectedColor/selectedTextColor for circle/text
    },
];
