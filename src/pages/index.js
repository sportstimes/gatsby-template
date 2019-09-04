import React from "react"
import { graphql } from "gatsby"
import EventRow from "../components/event-row"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Events = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <EventRow key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <SEO title="All Events" />
      <table>
        <thead>
          <tr>
            <th>Summary</th>
            <th>When</th>
            <th>Where</th>
            <th>What</th>
          </tr>
        </thead>
        <tbody>
          {Events}
        </tbody>
      </table>
      <p>
        Export as 
        {` `}
        <a href="/events.ics" className="ics" download="download">ICS</a>,
        {` `}
        <a href="/feed.xml" className="rss">RSS feed</a>
        {` and `}
        <a href="/events.csv" className="csv" download="download">CSV file</a>
      </p>
      <div id="about">
      </div>
     </Layout>
  )
}

export default IndexPage
export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date
            path
            title
            locationName
          }
        }
      }
    }
  }
` 
