import React from "react";
import { useField } from "formik";
import styles from "../../modules/createProject.module.scss";
import Dropdown from "../sandbox/Dropdown";

const CurrencyOptions = [
    { value: "aud", label: "AUD" },
    { value: "cad", label: "CAD" },
    { value: "gbp", label: "GBP" },
    { value: "usd", label: "USD" },
];

function Currency(props) {
    const [meta, helpers] = useField(props.name);

    const { value } = meta;
    const { setValue } = helpers;

    return (
        <div className={styles.dropdown_currency}>
            <Dropdown
                colour="white"
                width="150px"
                text="Currency"
                value={value}
                onChange={(e) => setValue(e, false)}
                options={CurrencyOptions}
            />
        </div>
    );
}
export default Currency;