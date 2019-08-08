module.exports = {
  siteMetadata: {
    title: `Competition Start Times`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@si`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#333333`,
        theme_color: `#FFCCFF`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: `gatsby-plugin-json-output`,
      options: {
        siteUrl: `https://example.com`,
        graphQLQuery: `
          {
            allMarkdownRemark(limit: 1000) {
              edges {
                node {
                  excerpt
                  html
                  fields { path }
                  frontmatter {
                    title
                    created
                    updated
                  }
                }
              }
            }
          }
        `,
        serialize: results => results.data.allMarkdownRemark.edges.map(({ node }) => ({
          path: node.fields.path, // MUST contain a path
          title: node.frontmatter.title,
          created: node.frontmatter.created,
          updated: node.frontmatter.updated,
          html: node.html,
        })),
        // feedMeta: {
        //   author: {
        //     name: author,
        //   },
        //   description: siteDescription,
        //   favicon: `${siteUrl}/icons/icon-48x48.png`,
        //   title: siteTitle,
        // },
        serializeFeed: results => results.data.allMarkdownRemark.edges.map(({ node }) => ({
          id: nodes.field.path,
          page_url: siteUrl + node.fields.path,
          title: node.frontmatter.title,
          date_published: new Date(node.frontmatter.created).toISOString(),
          date_modified: new Date(node.frontmatter.updated).toISOString(),
          excerpt: node.excerpt,
        })),
        nodesPerFeedFile: 100,
      }
    }    
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
