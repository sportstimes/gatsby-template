import React from "react"
import { graphql } from "gatsby"
import EventRow from "../components/event-row"
import LocalTimezone from "../components/local-timezone"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({
  pageContext,
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const { tag } = pageContext
  const words = tag.split(" ");

  for (var i = 0, x = words.length; i < x; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  const tagFormatted = words.join(" ");

  const Events = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <EventRow key={edge.node.id} post={edge.node} />)
  const listHeader = `${tagFormatted} games`
  
  return (
    <Layout>
      <SEO title={listHeader} />
      <h1>{listHeader}</h1>

      <p>
        <span role="img" aria-label="Spiral calendar">🗓</span> 
        <a href="webcal://rugbyworldcuptimes.com/events.ics" className="ics">Subscribe to all match times in your iOS, MacOS and Office calendar</a> 
        <small
          style={{
            display: `block`,
          }}
        >
          or 
          {` `}
          <a href="https://support.google.com/calendar/answer/37100?hl=en"
            style={{
              textDecoration: `underline`,
              background: `none`,
              color: `rgba(255,255,255,0.8)`
            }}>Google Calendar</a>
        </small>
      </p>

      {LocalTimezone}

      <table>
        <thead>
          <tr>
            <th>Summary</th>
            <th>When</th>
            <th class="location">Where</th>
            <th class="description">What</th>
          </tr>
        </thead>
        <tbody>
          {Events}
        </tbody>
      </table>
      <p>
        <span role="img" aria-label="Download">⬇️</span>
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
  query($tag: String) {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date
            path
            title
            locationName
            matchNumber
            group
          }
        }
      }
    }
  }
` 
