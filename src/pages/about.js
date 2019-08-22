import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <h2>What is this?</h2>
    <p>The Sports Times is a boilerplate template for providing sports event calendars in open formats for easier consumption. It publishes dates, times &amp; locations using standards that most platforms understand.</p>
    <dl>
      <dt><span role="img" aria-label="Calendar">📆️</span> ICS</dt>
      <dd>Calendar feeds directly into macOS, iOS, Google Android, Microsoft Windows &amp; Office</dd>
      <dt><span role="img" aria-label="Satellite">📡</span> RSS</dt>
      <dd>Really Simple Syndication for content aggregators, online and native apps</dd>
      <dt><span role="img" aria-label="Document">📄</span> CSV</dt>
      <dd>Comma-separated content for personal use in the likes of Excel</dd>
    </dl>
    <h3>How do you use it?</h3>
    <p>If you want to publish your own calendar of events for others to reference with ease, <a href="https://github.com/kickofftimes/gatsby-template">clone the repo</a>, customise to your hearts content and host on your own website or domain.</p>
    <p>It's an <a href="https://github.com/kickofftimes/gatsby-template">open-source project on Github</a> for others to use and improve. Fork it, use it, raise a pull-request with your suggestions or simply <a href="https://github.com/kickofftimes/gatsby-template/issues">raise an issue</a> with ideas or problems.</p>
  </Layout>
)

export default AboutPage