import React from "react";
import Button from "../../shared/Button";
import "./profile.scss";

const ProfileDetails = (props) => {
    return (
        <div className="profile-details">
            <img
                className="dp"
                src={require("../../images/logo.png")}
                alt="profile"
            />
            <div className="detail">
                <h1 className="user-name">Amirahha Doe</h1>
                <div className="user-buttons">
                    <Button
                        colour="yellow"
                        iconR={<i className="fas fa-check" />}
                        text="Accept"
                    />
                </div>
                <div className="user-links" style={{ backgroundColor: "red" }}>
                    <Button
                        colour="blue"
                        iconR={<i className="fas fa-check" />}
                        text="Accept"
                    />
                </div>
                <div
                    className="user-bio"
                    style={{ backgroundColor: "yellow" }}
                >
                    <Button
                        colour="blue"
                        iconR={<i className="fas fa-check" />}
                        text="Accept"
                    />
                </div>
                <div
                    className="user-socials"
                    style={{ backgroundColor: "blue" }}
                >
                    <Button
                        colour="blue"
                        iconR={<i className="fas fa-check" />}
                        text="Accept"
                    />
                </div>
            </div>
        </div>
    );
};
export default ProfileDetails;
