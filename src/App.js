import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Layout from "./shared/layout";
import Home from "./pages/home/home";
import explore from "./pages/explore/explore";
import projects from "./pages/projects/projects";
import profile from "./pages/profile/profile";
import tempUser from "./pages/profile/tempUser";
import "./styles/index.scss";
import signIn from "./shared/signIn";
require("typeface-poppins");

const Index = () => {
    let location = useLocation();
    return (
        <Layout page={location.pathname}>
            <Switch>
                <Route component={Home} exact path="/" />
                <Route component={explore} path="/explore" />
                <Route component={projects} path="/projects" />
                <Route component={profile} path="/profile" />
                <Route component={signIn} path="/signin" />
                <Route component={tempUser} path="/u/:id" />
            </Switch>
        </Layout>
    );
};

export default Index;
