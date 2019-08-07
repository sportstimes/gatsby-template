import React from "react"
import { Link } from "gatsby"

const PostLink = ({ post }) => (
  <tr>
      <td className="title">
        <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
      </td>
      <td className="date">{post.frontmatter.date}</td>
  </tr>
)

export default PostLink