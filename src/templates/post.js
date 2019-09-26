import React from "react"
import { Link, graphql } from "gatsby"
import Moment from "moment"

import Layout from "../components/layout"
import SEO from "../components/seo"
import LocalTimezone from "../components/local-timezone"

export default function Template({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <div className="event-post">
        <h1>{frontmatter.title}</h1>
        <h2>When?</h2>
          <p className="date">{Moment(frontmatter.date).format("dddd DD MMMM YYYY")}</p>
          <p className="time">
            {Moment(frontmatter.date).format("hh:mma")}
            {frontmatter.endDate ? "-" + Moment(frontmatter.endDate).format("hh:mma") : ""}
          </p>
          {LocalTimezone}
        <h2>Where?</h2>
        <p>{frontmatter.locationName}</p>
        <h2>What?</h2>
        <p>Match {frontmatter.matchNumber} - {frontmatter.group}</p>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <p><Link to="/">All events</Link></p>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date
        endDate
        path
        title
        locationName
        matchNumber
        group
        tags
      }
    }
  }
`
