import React from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const customStyles = {
    menu: (provided, state) => ({
        ...provided,
        background: state.selectProps.colour ? "white" : "#faf6f1",
        borderRadius: 10,
        overflow: "hidden",
        width: state.selectProps.width,
    }),
    menuList: (provided, state) => ({}),
    multiValueLabel: (provided, state) => ({
        ...provided,
        background: state.selectProps.keyColour
            ? state.selectProps.keyColour
            : "#FAEBB3",
        color: "#3E4D74",
        minWidth: "50px",
        padding: "0px 10px",
    }),
    multiValueRemove: (provided, state) => ({
        ...provided,
        background: state.selectProps.keyColour
            ? state.selectProps.keyColour
            : "#FAEBB3",
        color: "#3E4D74",
    }),
    control: (provided, state) => ({
        ...provided,
        background: state.selectProps.colour ? "white" : "#faf6f1",
        width: state.selectProps.width,
        minHeight: 36,
        height: state.selectProps.isMulti ? null : 36,
        border: "1px solid #ededed",
        borderRadius: 10,
    }),
};

function Dropdown(props) {
    if (props.isCreatable) {
        return (
            <>
                <CreatableSelect
                    id={props.id}
                    placeholder={props.text}
                    // value={props.value ? props.value : null}
                    onChange={props.onChange}
                    options={props.options}
                    styles={customStyles}
                    colour={props.colour}
                    keyColour={props.keyColour}
                    width={props.width}
                    isMulti={props.isMulti}
                    defaultValue={props.defaultValue}
                    components={{
                        IndicatorSeparator: () => null,
                    }}
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            neutral50: "#aaaaaa",
                            primary50: "hsla(47, 88%, 84%, 0.7)",
                            primary25: "hsla(47, 88%, 84%, 0.4)",
                            primary: "rgba(0, 0, 0, 0.2)",
                        },
                    })}
                />
            </>
        );
    } else {
        return (
            <>
                <Select
                    id={props.id}
                    placeholder={props.text}
                    value={props.value ? props.value : null}
                    onChange={props.onChange}
                    options={props.options}
                    styles={customStyles}
                    colour={props.colour}
                    keyColour={props.keyColour}
                    width={props.width}
                    isMulti={props.isMulti}
                    defaultValue={props.defaultValue}
                    components={{
                        IndicatorSeparator: () => null,
                    }}
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            neutral50: "#aaaaaa",
                            primary50: "hsla(47, 88%, 84%, 0.7)",
                            primary25: "hsla(47, 88%, 84%, 0.4)",
                            primary: "rgba(0, 0, 0, 0.2)",
                        },
                    })}
                />
            </>
        );
    }
}

export default Dropdown;
