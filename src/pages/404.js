import React from "react";
import Layout from "../layout";
import Image from "gatsby-image";
import { graphql } from "gatsby";
import "../styles/index.scss";

export const query = graphql`
    query {
        file(relativePath: { eq: "Lost-amico.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 400, maxHeight: 250) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`;
export default ({ data }) => {
    return (
        <Layout>
            <Image
                fluid={data.file.childImageSharp.fluid}
                alt="Error"
            />
            <h1>404, Page Does not exist</h1>
        </Layout>
    );
};