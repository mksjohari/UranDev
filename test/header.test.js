import React from "react";
import { BrowserRouter } from "react-router-dom";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Header } from "../src/shared/header";
const renderer = require("react-test-renderer");
configure({ adapter: new Adapter() });

describe("<Header /> component runs without errors", () => {
    it("Header component renders without crashing", () => {
        shallow(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );
    });
    it("Header component (not logged in) matches previous snapshots", () => {
        const tree = renderer
            .create(
                <BrowserRouter>
                    <Header user={{logged: false}} />
                </BrowserRouter>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
