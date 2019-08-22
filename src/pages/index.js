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
        <h2>What is this?</h2>
        <p>The Sports Times is a boilerplate template for providing sports event calendars in open formats for easier consumption. It publishes dates, times &amp; locations using standards that most platforms understand.</p>
        <dl>
          <dt><span role="img" aria-label="Calendar">📆️</span> ICS</dt>
          <dd>Calendar feeds directly into macOS, iOS, Google Android and Microsoft Outlook</dd>
          <dt><span role="img" aria-label="Satellite">📡</span> RSS</dt>
          <dd>Really Simple Syndication for content aggregators, online and native apps</dd>
          <dt><span role="img" aria-label="Document">📄</span> CSV</dt>
          <dd>Comma-separated content for personal use in the likes of Excel</dd>
        </dl>
        <h3>How do you use it?</h3>
        <p>If you want to publish your own calendar of events for others to reference with ease, clone the repo, customise to your hearts content and host on your own website or domain.</p>
        <p>It's an <Link to="https://github.com/kickofftimes/gatsby-template">open-source project on Github</Link> for others to use and improve. Fork it, use it, raise a pull-request with your suggestions or simply <Link to="https://github.com/kickofftimes/gatsby-template/issues">raise an issue</Link> with ideas or problems.</p>
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
