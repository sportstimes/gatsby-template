import React from "react"
import { Link } from "gatsby"
import moment from "moment"

const EventRow = ({ post }) => (
  <tr className="vevent" id={post.id}>
      <td className="summary">
        <Link className="url" to={post.frontmatter.path}>{post.frontmatter.title}</Link>
      </td>
      <td className="dtstart" title={moment(post.frontmatter.date).format("YYYY-MM-DDTHH:mm:ssZ")}>
        🗓 {moment(post.frontmatter.date).format("DD MMM 'YY HH:mm")}
      </td>
  </tr>
)

export default EventRow
