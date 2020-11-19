import React from "react";
import { shallow, mount } from "enzyme";
import Basic from "./basic";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  shallow(<Basic />);
});

// it("renders correctly", () => {
//   const wrapper = mount(<Basic />);
//   expect(wrapper.state("error")).toEqual(null);
// });