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
console.log('Generating ICS…')
const ics = require(`ics`)
const { writeFileSync } = require(`fs`)
let moment = require(`moment`)

let events = [
  {
    start: moment('2019-07-10T18:00Z').format('YYYY-M-D-H-m').split("-"),
    duration: { hours: 0, minutes: 30 },
    title: 'First ICS event',
    description: 'Getting ICS node package integrated with this repo',
    location: 'Virgin Train, West Coast Mainline',
    url: 'https://kickofftimestemplate.netlify.com/',
    categories: ['Code', 'Side Projects', 'Kick Off'],
    status: 'CONFIRMED',
    organizer: { name: 'Si Jobling', email: 'simon.jobling@gmail.com' },
  },
  {
    start: [2019, 8, 20, 8, 20],
    duration: { hours: 0, minutes: 30 },
    title: 'Second ICS event',
    description: 'Creating a second event',
    location: 'London Euston Train Station',
    url: 'https://kickofftimestemplate.netlify.com/',
    categories: ['Code', 'Side Projects', 'Kick Off'],
    status: 'CONFIRMED',
    organizer: { name: 'Si Jobling', email: 'simon.jobling@gmail.com' },
  },
]
 
ics.createEvents(events, (error, value) => {
  if (error) {
    console.log(error)
    return
  }
 
  console.log(value)  
  writeFileSync(`${__dirname}/event.ics`, value)

})