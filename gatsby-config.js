/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const path = require(`path`)
module.exports = {
    /* Your site config here */
    plugins: [
        "gatsby-plugin-sass",
        "gatsby-plugin-material-ui",
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `images`,
              path: path.join(__dirname, `src`, `images`),
            },
          },
    ],
};
