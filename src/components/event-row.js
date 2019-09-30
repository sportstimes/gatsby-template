import React from "react"
import { Link } from "gatsby"
import moment from "moment"

import "./event-row.css"

const EventRow = ({ post }) => (
  <tr id={'Match' + post.matchNumber} className={ "vevent" + (moment(post.frontmatter.date).isBefore() ? " past" : "") }>
      <td className="summary">
        <Link className="url" to={post.frontmatter.path}>{post.frontmatter.title}</Link>
      </td>
      <td>
        {moment(post.frontmatter.date).format("ddd DD MMM HH:mm")}
        <time className="dtstart">
          {moment(post.frontmatter.date).format("YYYY-MM-DDTHH:mm:ssZ")}
        </time>
        <time className="dtend">
          {moment(post.frontmatter.date).add(1, 'hour').format("YYYY-MM-DDTHH:mm:ssZ")}
        </time>
      </td>
      <td className="location">
        {post.frontmatter.locationName}
      </td>
      <td className="description">
        <span>Match {post.frontmatter.matchNumber}</span>
        <span> ({post.frontmatter.group})</span>
      </td>
  </tr>
)

export default EventRow
