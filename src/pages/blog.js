import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from  '../components/layout'
import Seo from '../components/Seo'

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="My Blog Posts">
      {/* Container to stack the blog post cards with nice spacing */}
      <div className="space-y-6 max-w-2xl">
        {data.allMdx.nodes.map((node) => (
          <article 
            key={node.id} 
            className="card bg-base-100 shadow-sm border border-base-300/40 hover:border-primary/20 transition-all duration-200"
          >
            <div className="card-body">
              {/* Simple DaisyUI badge for the post date */}
              <div className="badge badge-outline text-xs mb-2">
                📅 {node.frontmatter.date}
              </div>

              {/* Card Title acting as a clickable Link */}
              <h2 className="card-title text-xl font-bold">
                <Link 
                  to={`/blog/${node.frontmatter.slug}`} 
                  className="hover:text-primary transition-colors duration-150"
                >
                  {node.frontmatter.title}
                </Link>
              </h2>

              {/* Short excerpt snippet from the MDX file */}
              <p className="text-sm text-base-content/70 mt-1 line-clamp-2">
                {node.excerpt}
              </p>

              {/* Card Action footer button */}
              <div className="card-actions justify-end mt-4">
                <Link 
                  to={`/blog/${node.frontmatter.slug}`} 
                  className="btn btn-primary btn-sm"
                >
                  Read Post ❯
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          slug
        }
        id
        excerpt(pruneLength: 160)
      }
    }
  }
`

export const Head = () => <Seo title="My Blog Posts" />

export default BlogPage