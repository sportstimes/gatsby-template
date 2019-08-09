import React from "react"
import { Link } from "gatsby"

const EventRow = ({ post }) => (
  <tr className="vevent">
      <td className="summary">
        <Link className="url" to={post.frontmatter.path}>{post.frontmatter.title}</Link>
      </td>
      <td className="dtstart dtstamp" title="">{post.frontmatter.date}</td>
  </tr>
)

export default EventRow