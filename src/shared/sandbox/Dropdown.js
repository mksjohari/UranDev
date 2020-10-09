import React from "react";
import Select from "react-select";

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    background: state.selectProps.colour ? "white" : "#faf6f1",
    borderRadius: 10,
    overflow: "hidden",
    width: state.selectProps.width
  }),
  menuList: (provided, state) => ({}),
  control: (provided, state) => ({
    ...provided,
    background: state.selectProps.colour ? "white" : "#faf6f1",
    width: state.selectProps.width,
    minHeight: 36,
    height: state.selectProps.isMulti ? null : 36,
    border: "1px solid #ededed",
    borderRadius: 10
  })
};

function Dropdown(props) {
  return (
    <>
      <Select
        placeholder={props.text}
        value={props.value ? props.value : null}
        onChange={props.onChange}
        options={props.options}
        styles={customStyles}
        colour={props.colour}
        width={props.width}
        isMulti={props.isMulti}
        components={{
          IndicatorSeparator: () => null
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            neutral50: "#aaaaaa",
            primary50: "hsla(47, 88%, 84%, 0.7)",
            primary25: "hsla(47, 88%, 84%, 0.4)",
            primary: "rgba(0, 0, 0, 0.2)"
          }
        })}
      />
    </>
  );
}

export default Dropdown;
