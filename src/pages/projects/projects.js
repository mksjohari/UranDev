import React from "react";
import { connect } from "react-redux";
import MyProjects from "./myProjects";

const mapStateToProps = (state) => {
    return { user: state.user };
};

const Projects = (props) => {
    return (
        <div>
            <MyProjects user={props.user} view="edit" />
        </div>
    );
};

export default connect(mapStateToProps)(Projects);
