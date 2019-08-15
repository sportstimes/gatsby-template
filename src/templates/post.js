import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Template({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date} (until {(frontmatter.endDate || "TBC")})</h2>
        <h3>{frontmatter.locationName}</h3>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "dddd DD MMMM YYYY HH:mm Z")
        endDate(formatString: "HH:mm")
        path
        title
        locationName
      }
    }
  }
`
