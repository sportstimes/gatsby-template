import React from "react"
import { graphql } from "gatsby"
import EventRow from "../components/event-row"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

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
        <Link to="/events.ics" className="ics">ICS</Link>,
        {` `}
        <Link to="/feed.xml" className="rss">RSS feed</Link>
        {` and `}
        <Link to="/events.csv" className="csv">CSV file</Link>
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
