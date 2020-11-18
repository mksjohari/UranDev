import React from "react";
import { connect } from "react-redux";
import { Formik, Field } from "formik";
import { Link } from "react-router-dom";

import Button from "../../shared/sandbox/Button";
import { lockBg } from "../../shared/sandbox/Popup";
import Alert from "../../shared/sandbox/Alert";
import Expertise from "../../shared/input/Expertise";
import LocationAuto from "../../shared/input/LocationAuto";

import styles from "../../modules/profile.module.scss";
import popup from "../../modules/popup.module.scss";
import settings from "../../modules/settings.module.scss";
import buttonStyle from "../../modules/_button.module.scss";
import { getFirebase } from "../../shared/firebase/config";

function mapStateToProps(state) {
	return { user: state.user };
}
function Settings(props) {
    const user = props.user;
    console.log(user.expertise);

    return (
        <div className={`${settings.root} ${settings.settings_bg}`}>
            <Formik
                initialValues={{
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email ? user.email : "", // not provided
                    occupation: user.occupation ? user.occupation : "",
                    location: user.location,
                    photoUrl: user.photoUrl,
                    expertise: user.expertise ? user.expertise : [],
                    description: user.description ? user.description : "", // not provided
                    socials: user.socials,
                }}
                // validate={validateSituation}
                onSubmit={async (values, actions) => {
                    alert(JSON.stringify(values, 2));
                    actions.setSubmitting(false);
                    getFirebase()
                        .firestore()
                        .collection("users")
                        .doc(user.uid)
                        .update({
                            firstName: values.firstName,
                            lastName: values.lastName,
                            occupation: values.occupation,
                            location: values.location,
                            // photoUrl: values.photoUrl, // upload
                            expertise: values.expertise,
                            description: values.description, // not provided
                            socials: values.socials,
                        });
                }}
            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <div className={settings.btn_header}>
                            <Link
                                className={settings.back_link}
                                to={`/users/${user.uid}`}
                            >
                                <i className="fas fa-chevron-left"></i>
                                Back
                            </Link>
                            <Button
                                type="submit"
                                className={buttonStyle.upload_btn}
                                iconR={<i className="far fa-save"></i>}
                                text="Save changes"
                            />
                        </div>
                        <div className={settings.form}>
                            <div className={settings.title}>
                                Account Settings
                            </div>
                            <div className={settings.social_heading}>
                                Personal Details
                            </div>
                            <div className={settings.section}>
                                <label
                                    for="photoUrl"
                                    className={settings.heading}
                                >
                                    <i className="far fa-smile fa-2x"></i>
                                    <div className={settings.heading_text}>
                                        Profile Picture
                                    </div>
                                </label>
                                <Field name="photoUrl">
                                    {({
                                        field: { value },
                                        form: { setFieldValue },
                                    }) => (
                                        <div className={settings.center_row}>
                                            <img
                                                className={`${styles.dp} ${settings.photo}`}
                                                src={value}
                                                alt="profile"
                                            />
                                            <label
                                                className={`${buttonStyle.upload_pdf_btn} ${buttonStyle.button}`}
                                            >
                                                {console.log(value)}
                                                <input
                                                    type="file"
                                                    onChange={(event) =>
                                                        setFieldValue(
                                                            "photoUrl",
                                                            URL.createObjectURL(
                                                                event.target
                                                                    .files[0]
                                                            )
                                                        )
                                                    }
                                                />
                                                <i
                                                    className="fas fa-camera"
                                                    style={{ marginRight: 5 }}
                                                />
                                                Upload Cover
                                            </label>
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className={settings.section}>
                                <label
                                    for="firstName"
                                    className={settings.heading}
                                >
                                    <i className="far fa-user fa-2x"></i>
                                    <div className={settings.heading_text}>
                                        Fulll Name
                                    </div>
                                </label>
                                <div className={settings.input_row}>
                                    <Field
                                        as="input"
                                        className={`inp-field ${settings.multi_field}`}
                                        name="firstName"
                                        placeholder="First name"
                                    />
                                    <Field
                                        as="input"
                                        className={`inp-field ${settings.multi_field}`}
                                        name="lastName"
                                        placeholder="Last name"
                                    />
                                </div>
                            </div>
                            <div className={settings.section}>
                                <label for="email" className={settings.heading}>
                                    <i className="fas fa-at fa-2x"></i>
                                    <div className={settings.heading_text}>
                                        Contact Email
                                    </div>
                                </label>
                                <div className={settings.input_row}>
                                    <Field
                                        as="input"
                                        className={`inp-field ${settings.single_field}`}
                                        name="email"
                                        placeholder="Contact email"
                                    />
                                </div>
                            </div>
                            <div className={settings.section}>
                                <label
                                    for="occupation"
                                    className={settings.heading}
                                >
                                    <i className="fas fa-suitcase fa-2x"></i>
                                    <div className={settings.heading_text}>
                                        Occupation
                                    </div>
                                </label>
                                <div className={settings.input_row}>
                                    <Field
                                        as="input"
                                        className={`inp-field ${settings.single_field}`}
                                        name="occupation"
                                        placeholder="Occupation"
                                    />
                                </div>
                            </div>
                            <div className={settings.section}>
                                <label
                                    for="expertise"
                                    className={settings.heading}
                                >
                                    <i className="fas fa-pen-nib fa-2x"></i>
                                    <div className={settings.heading_text}>
                                        Field of Expertise
                                    </div>
                                </label>
                                <div className={settings.single_field}>
                                    <Field name="expertise" as={Expertise} />
                                </div>
                            </div>
                            <div className={settings.section}>
                                <label
                                    for="location"
                                    className={settings.heading}
                                >
                                    <i className="fas fa-map-marker-alt fa-2x"></i>
                                    <div className={settings.heading_text}>
                                        Location
                                    </div>
                                </label>
                                <div className={settings.location}>
                                    <Field name="location" as={LocationAuto} />
                                </div>
                            </div>
                            <div className={settings.section}>
                                <label
                                    for="description"
                                    className={settings.heading}
                                >
                                    <i className="fas fa-book-open fa-2x"></i>
                                    <div className={settings.heading_text}>
                                        Description
                                    </div>
                                </label>
                                <div className={settings.input_row}>
                                    <Field
                                        as="textarea"
                                        className={`inp-field ${settings.single_field}`}
                                        name="description"
                                        placeholder="Type here..."
                                    />
                                </div>
                            </div>
                            <div className={settings.social_heading}>
                                Social Contacts
                            </div>
                            {socials.map((social, index) => (
                                <div
                                    className={settings.social_section}
                                    key={index}
                                >
                                    <div className={settings.social_input}>
                                        {social.media}
                                    </div>
                                    <Field
                                        as="input"
                                        className={`inp-field ${settings.single_field}`}
                                        name={`socials.${social.media}`}
                                        placeholder="Type here..."
                                    />
                                </div>
                            ))}
                        </div>
                    </form>
                )}
            </Formik>
            <div className={settings.social_heading}>Danger zone</div>
            <Button
                id={"delAccount"}
                colour="yellow"
                iconR={<i className="far fa-trash-alt"></i>}
                text="Deactivate Account"
                onClick={lockBg}
            />
            <div className={popup.popupContainer} id={"delAccount_popContent"}>
                <Alert
                    id={"delAccount"}
                    type="account"
                    hasConfirm
                    confirmBtnLabel="Yes, delete"
                    closeBtnLabel="No, go back"
                    onConfirm={() => console.log("Khairi needs to do this")}
                />
            </div>
        </div>
    );
}
export default connect(mapStateToProps)(Settings);

const label = ['PERSONAL DETAILS', 'SOCIAL CONTACTS'];

const socials = [
	{ media: 'Behance', link: 'https://www.behance.net/' },
	{ media: 'CodeSandBox', link: 'https://codesandbox.io/u/' },
	{ media: 'Dribble', link: 'https://dribbble.com/' },
	{ media: 'Figma', link: 'https://figma.com/' },
	{ media: 'Github', link: 'https://www.github.com/' },
	{ media: 'LinkedIn', link: 'https://www.linkedin.com/in/' },
	{ media: 'Slack', link: 'https://www.slack.com//' },
];
