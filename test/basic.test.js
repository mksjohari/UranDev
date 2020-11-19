import React from "react";
import ReactDOM from "react-dom";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
const renderer = require("react-test-renderer");
configure({ adapter: new Adapter() });

import Basic from "./basic";
import SignUp from "../src/shared/signUpForm";
// import App from "../src/App";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test("example component renders without crashing", () => {
    shallow(<Basic />);
});

test("component matches previous snapshots", () => {
    expect(renderer.create(<Basic />)).toMatchSnapshot();
});

test("example component renders correctly", () => {
    ReactDOM.render(<Basic />, container);
    expect(document.querySelector("h1").innerHTML).toBe("Basic Test");
});

// const wrapper = mount(<Basic />);
// expect(wrapper.state("error")).toEqual(null);

// const wrapper = shallow(<SignUp />).dive();

// jest.mock('react-router-dom', () => ({
//   useLocation: jest.fn().mockReturnValue({
//     pathname: '/another-route',
//     search: '',
//     hash: '',
//     state: null,
//     key: '5nvxpbdafa',
//   }),
// }));
