import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";

const About = () => {
    return (
        <Layout>
            <h1>Hello,</h1>
            <p>I'm About</p>
            <p>
                <Link to="/contact">Contact Me</Link>
            </p>
        </Layout>
    );
};

export default About;
