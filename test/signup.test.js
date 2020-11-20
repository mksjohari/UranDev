import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
const renderer = require("react-test-renderer");
configure({ adapter: new Adapter() });
import { SignUp } from "../src/shared/signUpForm";

describe("<SignUp /> component runs", () => {
    it("SignUp component renders without crashing", () => {
        shallow(<SignUp />);
    });
    it("SignUp component matches previous snapshots", () => {
        const tree = renderer
            .create(
                <BrowserRouter>
                    <SignUp />
                </BrowserRouter>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("<SignUp /> component renders correctly", () => {
    let container = null;
    beforeAll(() => {
        // setup a DOM element as a render target
        container = document.createElement("div");
        document.body.appendChild(container);
        ReactDOM.render(
            <BrowserRouter>
                <SignUp />
            </BrowserRouter>,
            container
        );
    });

    afterAll(() => {
        // cleanup on exiting
        ReactDOM.unmountComponentAtNode(container);
        container.remove();
        container = null;
    });
    it("Renders <form>", () => {
        expect(document.querySelector("form").className).toBe("login-form");
        expect(document.querySelector("h2").innerHTML).toBe("Sign Up");
    });

    it("Renders 5 <input> fields", () => {
        expect(document.getElementsByClassName("inp-text")).toHaveLength(5);
    });
    it("Renders correct input types and placeholders", () => {
        expect(document.getElementsByClassName("inp-text")[0].placeholder).toBe(
            "First Name"
        );
        expect(document.getElementsByClassName("inp-text")[1].placeholder).toBe(
            "Last Name"
        );
        expect(document.getElementsByClassName("inp-text")[2].type).toBe(
            "text"
        );
        expect(document.getElementsByClassName("inp-text")[(3, 4)].type).toBe(
            "password"
        );
    });
    it("Renders 2 <button>s", () => {
        expect(document.getElementById("login").type).toBe("submit");
        expect(document.getElementById("google").type).toBe("button");
    });
});

describe("<SignUp /> component handles interactions", () => {
    const user = {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@gmail.com",
        password: "test1234",
        confirmPass: "test12345",
    };
    const handleSubmit = jest.fn();
    const wrapper = mount(
        <BrowserRouter>
            <SignUp onSubmit={handleSubmit} />
        </BrowserRouter>
    );
    it("Form handles input state changes when onChange functions are invoked", () => {
        const inputs = wrapper.find(".inp-text");
        inputs.at(0).simulate("change", {
            target: {
                value: user.firstName,
            },
        });
        inputs.at(1).simulate("change", {
            target: {
                value: user.lastName,
            },
        });
        inputs.at(2).simulate("change", {
            target: {
                value: user.email,
            },
        });
        inputs.at(3).simulate("change", {
            target: {
                value: user.password,
            },
        });
        inputs.at(4).simulate("change", {
            target: {
                value: user.confirmPass,
            },
        });
        expect(inputs.at(0).getDOMNode().value).toBe(user.firstName);
        expect(inputs.at(1).getDOMNode().value).toBe(user.lastName);
        expect(inputs.at(2).getDOMNode().value).toBe(user.email);
        expect(inputs.at(3).getDOMNode().value).toBe(user.password);
        expect(inputs.at(4).getDOMNode().value).toBe(user.confirmPass);
    });
    it("Form handles onSumbit prop", () => {
        // wrapper.instance().handleSubmit = handleSubmit;
        // const form = wrapper.find("form");
        // // console.log(form.props());
        // wrapper.find("form").simulate("submit", { preventDefault: () => {} });
        // expect(handleSubmit).toHaveBeenCalled();
    });
});

// const handleChange = jest.spyOn(React, "useState");
// handleChange.mockImplementation((errormsg) => [errormsg, setErrormsg]);
// expect(setErrormsg).toBe("The passwords don't match. Try again.");
// console.log(submit.debug());
