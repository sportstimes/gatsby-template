import React from "react"
import { Link } from "gatsby"
import moment from "moment"

import "./event-row.css"

const EventRow = ({ post }) => (
  <tr className="vevent" id={post.id}>
      <td className="summary">
        <Link className="url" to={post.frontmatter.path}>{post.frontmatter.title}</Link>
      </td>
      <td>
        {moment(post.frontmatter.date).format("DD MMM 'YY HH:mm")}
        <time className="dtstart">{moment(post.frontmatter.date).format("YYYY-MM-DDTHH:mm:ssZ")}</time>
      </td>
      <td className="location">
        {post.frontmatter.locationName}
      </td>
  </tr>
)

export default EventRow
