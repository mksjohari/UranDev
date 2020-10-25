import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Layout from "./shared/layout";
import explore from "./pages/explore/explore";
import projects from "./pages/projects/projects";
import profile from "./pages/profile/profile";
import signUp from "./pages/signUp/signUp";
import createProject from "./pages/projects/createProject";
import draftProjects from "./pages/projects/draftProjects";
import tmpTest from "./pages/tmp/tmpTest";
import Page404 from "./pages/404/404";

import "./styles/index.scss";
require("typeface-poppins");

const Index = () => {
    let location = useLocation();
    return (
        <Layout page={location.pathname}>
            <Switch>
                <Route component={explore} exact path="/" />
                <Route component={signUp} path="/signUp" />
                <Route component={projects} path="/projects" />
                <Route component={createProject} path="/create" />
                <Route component={draftProjects} path="/drafts" />
                <Route component={profile} path="/profile/:id" />
                <Route component={tmpTest} path="/tmp" />
                <Route component={Page404} path="/*" />
            </Switch>
        </Layout>
    );
};
export default Index;
