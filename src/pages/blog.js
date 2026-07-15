import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from  '../components/layout'
import Seo from '../components/Seo'

const BlogPage = ({ data }) => {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-10 text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          My Blog Posts
        </h1>

        <div className="space-y-5">
          {data.allMdx.nodes.map(node => (
            <article
              key={node.id}
              className="mx-auto rounded-lg border border-base-300 bg-base-100 p-6"
            >
              <p className="text-sm text-base-content/55">
                {node.frontmatter.date}
              </p>

              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                <Link
                  to={`/blog/${node.frontmatter.slug}`}
                  className="hover:text-primary"
                >
                  {node.frontmatter.title}
                </Link>
              </h2>

              <p className="mt-3 text-sm leading-6 text-base-content/65">
                {node.excerpt}
              </p>

              <Link
                to={`/blog/${node.frontmatter.slug}`}
                className="mt-5 inline-block text-sm font-semibold text-primary"
              >
                Read article →
              </Link>
            </article>
          ))}
        </div>
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