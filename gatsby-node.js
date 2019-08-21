/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/post.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    console.log(result.errors)
    throw new Error("Things broke, see console output above")
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {}, // additional data can be passed via context
    })
  })
}

// RSS Feed generation
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

// ICS generation
const { writeFileSync } = require(`fs`)

exports.onPostBuild = async ({ graphql }) => {
  
  console.log('Generating ICS……');
  
  const ics = require(`ics`)
  let moment = require(`moment`)
  let events = []

  const result = await graphql(`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            locationName
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
  `)

  if (result.errors) {
    console.log(result.errors)
    throw new Error("GraphQL fail, see console output above")
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    events.push(
    {
      start: moment(node.frontmatter.date).format('YYYY-M-D-H-m').split("-"),
      duration: { hours: 1, minutes: 0 },
      title: node.frontmatter.title,
      description: node.excerpt,
      location: node.frontmatter.locationName,
      url: 'https://kickofftimestemplate.netlify.com' + node.fields.slug,
      status: 'CONFIRMED',
    })
  })
  
  ics.createEvents(events, (error, value) => {
    if (error) {
      console.log(error)
      throw new Error("ICS generation fail, see console output above")
    }
  
    console.log(value)  
    writeFileSync(`${__dirname}/public/events.ics`, value)

  })

}
