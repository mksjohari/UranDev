import React from 'react';
import Button from '../../shared/sandbox/Button';
import './profile.scss';

const ProfileDetails = (props) => {
    return (
        <div className="profile-details">
            <img
                className="dp"
                src={require("../../images/Lost-amico.png")}
                alt="profile"
            />
            <div className="detail">
                <div className="heading">
                    <h1 className="user-name">Amirahha Doe</h1>
                    <div className="user-buttons">
                        <Button
                            colour="yellow"
                            iconR={<i className="far fa-envelope"></i>}
                            text="Message"
                        />
                        <Button
                            colour="yellow"
                            iconR={<i className="far fa-bookmark"></i>}
                            text="Shortlist"
                        />
                    </div>
                </div>
                <div className="section">
                    <div className="user-links">
                        <i className="fas fa-map-marked-alt"></i>
                        <text className="text-detail">
                            Location: Melbourne, VIC, Australia
                        </text>
                    </div>
                    <div className="user-links">
                        <i className="fas fa-briefcase"></i>
                        <text className="text-detail">
                            Occupation: Mathematics Professor at University of
                            Not Prestige
                        </text>
                    </div>
                    <div className="user-links">
                        <i className="fas fa-pen-nib"></i>
                        <text className="text-detail">
                            Expertise: Engineering and Mathematics
                        </text>
                    </div>
                </div>
                <div className="user-bio section">
                    <text>
                        Short description or qutoes of something idc. It is a
                        long established fact that a reader will be distracted
                        by the readable content of a page when looking at its
                        layout.
                        <br />
                        The point of using Lorem Ipsum is that it has a
                        more-or-less normal distribution of letters, as opposed
                        to using 'Content here.
                    </text>
                </div>
                <div className="user-socials section">
                    <i className="fab fa-github social-icon fa-3x"></i>
                    <i className="fab fa-slack social-icon fa-3x"></i>
                    <i className="fab fa-stack-overflow social-icon fa-3x"></i>
                    <i className="fab fa-linkedin-in social-icon fa-3x"></i>
                    <i className="fab fa-dribbble social-icon fa-3x"></i>
                    <i className="fab fa-behance social-icon fa-3x"></i>
                    <i className="fab fa-figma social-icon fa-3x"></i>
                </div>
            </div>
        </div>
    );
};
export default ProfileDetails;
