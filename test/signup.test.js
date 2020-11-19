import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
const renderer = require("react-test-renderer");
configure({ adapter: new Adapter() });
import { SignUp } from "../src/shared/signUpForm";

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

test("SignUp component renders without crashing", () => {
    shallow(<SignUp />);
});

test("SignUp component matches previous snapshots", () => {
    const tree = renderer
        .create(
            <BrowserRouter>
                <SignUp />
            </BrowserRouter>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});

test("SignUp component renders correctly", () => {
    ReactDOM.render(
        <BrowserRouter>
            <SignUp />
        </BrowserRouter>,
        container
    );
    expect(document.querySelector("form").className).toBe("login-form");
    expect(document.querySelector("h2").innerHTML).toBe("Sign Up");
    expect(document.getElementsByClassName("inp-text")).toHaveLength(5);
    expect(document.getElementsByClassName("inp-text")[0].placeholder).toBe(
        "First Name"
    );
    expect(document.getElementsByClassName("inp-text")[1].placeholder).toBe(
        "Last Name"
    );
    expect(document.getElementsByClassName("inp-text")[2].type).toBe("text");
    expect(document.getElementsByClassName("inp-text")[(3, 4)].type).toBe(
        "password"
    );
    expect(document.getElementById("login").type).toBe("submit");
    expect(document.getElementById("google").type).toBe("button");
});

// test("Error message is ", () => {
//     const wrapper = mount(<SignUp />);
//     expect(wrapper.state("errormsg")).toEqual("");
// });

// jest.mock('react-router-dom', () => ({
//   useLocation: jest.fn().mockReturnValue({
//     pathname: '/another-route',
//     search: '',
//     hash: '',
//     state: null,
//     key: '5nvxpbdafa',
//   })
