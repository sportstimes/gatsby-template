import React from "react"
import { Link } from "gatsby"

const PostLink = ({ post }) => (
  <div>
    <Link to={post.frontmatter.path}>
      <span className="title">{post.frontmatter.title}</span>
      <span className="date">{post.frontmatter.date}</span>
    </Link>
  </div>
)

export default PostLink